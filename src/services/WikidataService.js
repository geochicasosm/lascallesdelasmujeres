/* eslint-disable no-console */
import { DictUnit } from '@activejs/core';
import {
  wikidataAPIEndpointUrl,
  wikipediaSPARQLQueryTemplate,
  wikidataExpireCache,
} from './Constants';

const wikidataCacheUnit = new DictUnit({
  id: 'wikidata',
  immutable: true,
  persistent: true,
  cacheSize: 1,
  initialValue: {},
});

export default function getWikidataDetails(wikipediaLink) {
  // Get the text part
  const { length } = wikipediaLink;
  const nameLink = wikipediaLink.substring(wikipediaLink.lastIndexOf('/') + 1, length).replace(/_/g, '%20');
  const query = wikipediaSPARQLQueryTemplate.replace('##NAME##', nameLink);
  const unit = wikidataCacheUnit.get(nameLink);

  if (unit && (new Date()) - (new Date(unit.timestamp)) < wikidataExpireCache) {
    console.log(`Getting ${unit.wikidata.name} from local storage`);
    return new Promise((resolve) => resolve(unit.wikidata));
  }

  return new Promise((resolve, reject) => {
    const url = `${wikidataAPIEndpointUrl}${query}`;
    fetch(url)
      .then((response) => response.json())
      .then(({ results }) => {
        if (results?.bindings) {
          const { bindings } = results;
          if (bindings.length > 0) {
            const binding = bindings[0];
            const result = {};
            Object.keys(binding).forEach((k) => {
              result[k] = binding[k].value;
            });
            console.log(`Saving ${result.name} into local storage`);
            wikidataCacheUnit.set(nameLink, {
              timestamp: new Date(),
              wikidata: result,
            });
            resolve(result);
          } else {
            resolve(undefined);
          }
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
