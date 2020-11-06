/* eslint-disable no-console */

// eslint-disable-next-line max-len
const sparqlQueryTemplate = `SELECT%20%0A%20%20%3Fid%20%0A%20%20(%3FidLabel%20AS%20%3Fname)%20%0A%20%20(%3Fdesc%20as%20%3Fdescription)%20%0A%20%20(%3FgenderLabel%20AS%20%3Fgender)%0A%20%20(SAMPLE(%3Fbirths)%20AS%20%3Fbirth)%20%0A%20%20(SAMPLE(%3Fdeaths)%20AS%20%3Fdeath)%20%0A%20%20(SAMPLE(%3Fpic)%20AS%20%3Fpicture)%20%0A%20%20(GROUP_CONCAT(DISTINCT%20%3FoccupationsLabel%3B%20SEPARATOR%20%3D%20%22%2C%20%22)%20AS%20%3Foccupations)%20%0AWHERE%20%7B%0A%20%20VALUES%20%3FwikiTitle%20%7B%0A%20%20%20%20%22##NAME##%22%40es%0A%20%20%7D%0A%20%20%3Fwiki%20schema%3Aabout%20%3Fid%3B%0A%20%20%20%20schema%3AisPartOf%20%3Chttps%3A%2F%2Fes.wikipedia.org%2F%3E%3B%0A%20%20%20%20schema%3Aname%20%3FwikiTitle.%0A%20%20%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP21%20%3Fgender.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP569%20%3Fbirths.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP570%20%3Fdeaths.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP106%20%3Foccupations.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP18%20%3Fpic%20%7D.%0A%20%20OPTIONAL%20%7B%20%3Fid%20schema%3Adescription%20%3Fdesc%20%7D.%0A%20%20FILTER%20(LANG(%3Fdesc)%20%3D%20%22es%22)%20%0A%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22es%22.%0A%20%20%20%20%3Fid%20rdfs%3Alabel%20%3FidLabel.%0A%20%20%20%20%3Fgender%20rdfs%3Alabel%20%3FgenderLabel.%0A%20%20%20%20%3Foccupations%20rdfs%3Alabel%20%3FoccupationsLabel.%0A%20%20%7D%0A%7D%0AGROUP%20BY%20%3Fid%20%3FidLabel%20%3Fdesc%20%3FgenderLabel%20%3Fwiki%0A%0A
`;

export default function getWikidataDetails(wikipediaLink) {
  // Get the text part
  const { length } = wikipediaLink;
  const nameLink = wikipediaLink.substring(wikipediaLink.lastIndexOf('/') + 1, length).replace(/_/g, '%20');
  const query = sparqlQueryTemplate.replace('##NAME##', nameLink);
  const url = `https://query.wikidata.org/sparql?format=json&query=${query}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if ('results' in data && 'bindings' in data.results) {
          const { bindings } = data.results;
          if (bindings.length > 0) {
            const binding = bindings[0];
            const result = {};
            Object.keys(binding).forEach((k) => {
              result[k] = binding[k].value;
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
