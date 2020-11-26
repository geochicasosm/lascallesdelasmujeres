/* eslint-disable no-console */
import { DictUnit } from '@activejs/core';
import Handlebars from 'handlebars';

import {
  wikidataAPIEndpointUrl,
  wikidataExpireCache,
  wikipediaSPARQLQuery,
  wikidataSPARQLQuery,
} from './Constants';

const wikipediaSPARQLQueryTemplate = Handlebars.compile(wikipediaSPARQLQuery);
const wikidataSPARQLQueryTemplate = Handlebars.compile(wikidataSPARQLQuery);

const wikidatDetailsCacheUnit = new DictUnit({
  id: 'wikidataDetails',
  immutable: true,
  persistent: true,
  cacheSize: 1,
  initialValue: {},
});

const wikipediaNamesCacheUnit = new DictUnit({
  id: 'wikipediaNames',
  immutable: true,
  persistent: true,
  cacheSize: 1,
  initialValue: {},
});

/*
Generic function to get info from Wikidata, it returs a Promise with
the contents of the "bindings" JSON property
*/
const queryWikidata = (query) => {
  const url = `${wikidataAPIEndpointUrl}${query}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then(({ results }) => {
        if (results?.bindings) {
          resolve(results?.bindings);
        } else {
          resolve(undefined);
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

/*
Returns a wikidata ID based on a wikipedia link.
It caches results
*/
const getWikidataId = (wikipediaLink) => {
  const { length } = wikipediaLink;
  const name = decodeURIComponent(
    wikipediaLink.substring(
      wikipediaLink.lastIndexOf('/') + 1, length,
    ).replace(/_/g, '%20'),
  );
  // Check the cache
  const unit = wikipediaNamesCacheUnit.get(name);
  if (unit && (new Date()) - (new Date(unit.timestamp)) < wikidataExpireCache) {
    console.log(`Getting ${unit.id} from local storage`);
    return new Promise((resolve) => resolve(unit.id));
  }

  // If not cached go to Wikidata
  const query = encodeURIComponent(wikipediaSPARQLQueryTemplate({ name }));
  return new Promise((resolve, reject) => {
    queryWikidata(query)
      .then((bindings) => {
        if (bindings.length === 0) {
          resolve(undefined);
        }
        const url = bindings[0].id.value;
        const ids = url.match(/Q[0-9]{1,}$/);
        if (ids && ids[0]) {
          const id = ids[0];
          console.log(`Saving ${id} into local storage`);
          wikipediaNamesCacheUnit.set(name, {
            timestamp: new Date(),
            id,
          });
          resolve(ids[0]);
        } else {
          resolve(undefined);
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

const getDetailsFromWikidataId = (wikidataId) => {
  // Check if the id is found in the cache
  const unit = wikidatDetailsCacheUnit.get(wikidataId);
  if (unit && (new Date()) - (new Date(unit.timestamp)) < wikidataExpireCache) {
    console.log(`Getting ${unit.wikidata.name} from local storage`);
    return new Promise((resolve) => resolve(unit.wikidata));
  }
  // Go for the info to Wikidata
  const query = encodeURIComponent(wikidataSPARQLQueryTemplate({ wikidataId }));
  return new Promise((resolve, reject) => {
    queryWikidata(query)
      .then((bindings) => {
        if (bindings.length > 0) {
          const binding = bindings[0];
          const result = {};
          Object.keys(binding).forEach((k) => {
            result[k] = binding[k].value;
          });
          console.log(`Saving ${result.name} into local storage`);
          wikidatDetailsCacheUnit.set(wikidataId, {
            timestamp: new Date(),
            wikidata: result,
          });
          resolve(result);
        } else {
          resolve(undefined);
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

export default function getWikidataDetails(wikipediaLinkOrWikidata) {
  if (!wikipediaLinkOrWikidata) {
    return new Promise((resolve) => resolve(undefined));
  }
  if (wikipediaLinkOrWikidata.startsWith('http')) {
    return getWikidataId(wikipediaLinkOrWikidata).then(getDetailsFromWikidataId);
  }
  return getDetailsFromWikidataId(wikipediaLinkOrWikidata);
}
