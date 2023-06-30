# #LasCallesDeLasMujeres/#TheStreetsOfWomen

Visit the web project: [#LasCallesDeLasMujeres](https://geochicasosm.github.io/lascallesdelasmujeres/) (in beta)

Read a bit more extended technical explanation about the project here: [#LasCallesDeLasMujeres (TheStreetsOfWomen) meets Mapbox #mapmadness18](https://t.co/1NCGE0eyIO)

## Project description

This is a collaborative project of Geochicas to produce a map of the streets named after women in Latin America and Spain. This proposal seeks to link and generate content in OSM and Wikipedia about prominent women.

The main goal is to create a new storytelling in a collaborative manner, and thus emphasize the importance of remembering women, their struggles and achievements through public and digital space.

For this reason we have generated a map of the streets that have names of women in the different cities of Latin America and Spain, and thus to show the gap that historically exists within cities.

It is intended to make a survey of information on streets, avenues, passages, roads that have the names of women and also their respective biographies in Wikipedia. It will also be encouraged to add the names of streets corresponding to women that are not mapped in OpenStreetMap (free and collaborative map) and the creation of their articles in Wikipedia.

The project was officially presented within the framework of International Women's Day, on March 8.

## Wikidata

When clicking or hovering the mouse over women streets with Wikipedia or Wikidata details, the application will perform queries to Wikidata. If the streets has only a Wikipedia link, it will first query to get the equivalent Wikidata identifier. When the street has the Wikidata identifier explicitly or through the mentioned query, a segond query to Wikidata will try to get a few details of the women that will show up in the pop-up window.:

* Name
* Short description
* Birth and death dates
* Occupations
* Link to a picture

## Wikidata identifier from name

This query expects a name of a Wikipedia article as a parameter, and will return the corresponding Wikidata item identifier. [Executing](https://query.wikidata.org/#SELECT%20%3Fid%0AWHERE%20%7B%0A%20%20%20%20VALUES%20%3FwikiTitle%20%7B%22Clara%20Campoamor%22%40es%7D%0A%20%20%20%20%3Fwiki%20schema%3Aabout%20%3Fid%3B%0A%20%20%20%20%20%20%20%20%20%20schema%3AisPartOf%20%3Chttps%3A%2F%2Fes.wikipedia.org%2F%3E%3B%0A%20%20%20%20%20%20%20%20%20%20schema%3Aname%20%3FwikiTitle.%0A%7D) this query with `Clara Campoamor` the Wikidata item [`Q3321142`](https://www.wikidata.org/wiki/Q3321142) is returned.

```sparql
SELECT ?id
WHERE {
    VALUES ?wikiTitle {"Clara Campoamor"@es}
    ?wiki schema:about ?id;
          schema:isPartOf <https://es.wikipedia.org/>;
          schema:name ?wikiTitle.
}
```

### Details from Wikidata identifier

This query has a Wikidata identifier as a parameter and will try to get back a few details that are optional for the item (`OPTIONAL`). Sometimes a subject has listed several death or birth dates or pictures, so we pick one of them randomly (`SAMPLE`). Additionally, it will aggregate the different occupations, unfortunately using the Spanish male nouns. When  [executing](https://query.wikidata.org/#SELECT%20%0A%20%20%3Fid%20%28%3FidLabel%20AS%20%3Fname%29%20%0A%20%20%3Fdescription%20%0A%20%20%28%3FgenderLabel%20AS%20%3Fgender%29%20%0A%20%20%28SAMPLE%28%3Fbirths%29%20AS%20%3Fbirth%29%20%0A%20%20%28SAMPLE%28%3Fdeaths%29%20AS%20%3Fdeath%29%20%0A%20%20%28SAMPLE%28%3Fpic%29%20AS%20%3Fpicture%29%20%0A%20%20%28GROUP_CONCAT%28DISTINCT%20%3FoccupationsLabel%3B%20SEPARATOR%20%3D%20%22%2C%20%22%29%20AS%20%3Foccupations%29%20%0AWHERE%20%7B%0A%20%20VALUES%20%3Fid%20%7B%0A%20%20%20%20wd%3AQ3321142%0A%20%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP21%20%3Fgender.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP569%20%3Fbirths.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP570%20%3Fdeaths.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP106%20%3Foccupations.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP18%20%3Fpic.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20schema%3Adescription%20%3Fdesc.%20%7D%0A%20%20FILTER%28%28LANG%28%3Fdesc%29%29%20%3D%20%22es%22%29%0A%20%20BIND%28COALESCE%28%3Fdesc%2C%20%22%22%29%20AS%20%3Fdescription%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22es%22.%0A%20%20%20%20%3Fid%20rdfs%3Alabel%20%3FidLabel.%0A%20%20%20%20%3Fgender%20rdfs%3Alabel%20%3FgenderLabel.%0A%20%20%20%20%3Foccupations%20rdfs%3Alabel%20%3FoccupationsLabel.%0A%20%20%7D%0A%7D%0AGROUP%20BY%20%3Fid%20%3FidLabel%20%3Fdescription%20%3FgenderLabel%20%3Fwiki) this query with the identifier from the previous example we get all the desired details from Clara Campoamor.

```sparql
SELECT 
  ?id (?idLabel AS ?name) 
  ?description 
  (?genderLabel AS ?gender) 
  (SAMPLE(?births) AS ?birth) 
  (SAMPLE(?deaths) AS ?death) 
  (SAMPLE(?pic) AS ?picture) 
  (GROUP_CONCAT(DISTINCT ?occupationsLabel; SEPARATOR = ", ") AS ?occupations) 
WHERE {
  VALUES ?id {
    wd:Q3321142
  }
  OPTIONAL { ?id wdt:P21 ?gender. }
  OPTIONAL { ?id wdt:P569 ?births. }
  OPTIONAL { ?id wdt:P570 ?deaths. }
  OPTIONAL { ?id wdt:P106 ?occupations. }
  OPTIONAL { ?id wdt:P18 ?pic. }
  OPTIONAL { ?id schema:description ?desc. }
  FILTER((LANG(?desc)) = "es")
  BIND(COALESCE(?desc, "") AS ?description)
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "es".
    ?id rdfs:label ?idLabel.
    ?gender rdfs:label ?genderLabel.
    ?occupations rdfs:label ?occupationsLabel.
  }
}
GROUP BY ?id ?idLabel ?description ?genderLabel ?wiki
```
### Current state

The project is still under development. The idea is to gradually expand the number of mapped cities, which so far are:

- Asunción, Paraguay
- Barcelona, España
- Buenos Aires, Argentina
- Cochabamba, Bolivia
- Lima, Perú
- Montevideo, Uruguay
- Ciudad de México
- La Habana, Cuba
- Rosario, Argentina
- Resistencia, Argentina

Work in progress:
- Santa Fe, Argentina
- Salta, Argentina


## Built with:

* [Mapbox](https://www.mapbox.com/) - The web framework used


## Contribute to the project

Join our slack channel [#lascallesdelasmujeres](https://join.slack.com/t/geochicas-osm/shared_invite/enQtMzIzMzUyMDQyNjczLTU0YjYzNTQ2ZWRkOWQwZGJlNGY4NjhmODY4Y2M2M2Y2MDM3M2EyZTg4NWI0ODY2ZWRhZGIyN2JjMDc0ZDdlODE).


## Coordinators


* **Caleidoscpic** (*Bolivia*) - [@CaleidoscopeEye](http://www.fotonostra.com/glosario/arroba.htm) 
    
    Architect, lover of free knowledge and collaborative work

* **Nikole Arguedas** (*Costa Rica*)  
    
    UX / UI, passionate about maps and female empowerment

* **Jessica Sena** (*España*) - [@jsenag](https://jessisena.github.io/myprofile/) 
    
    Computer engineer, web/mobile geo-developer.

* **Malena Libman** (*Argentina*) -  
    
    Technician in GIS, Geoinquieta

* **Selene Yang** (*Nicaragua*) - [@srta_peperina](https://twitter.com/Srta_Peperina)
    
    Academic researcher Surviving a PhD in Communication at the UNLP. Geofeminist     
    
## Collaborators


* **Carina Córdoba** (*Argentina*)

* **Noe Ortiz** (*México*)

* **Horacio Castellaro** (*Argentina*)

* **Jorge Sanz** (*España*)



## Allied organizations

* **Wikimedia Argentina** (*Argentina*)

* **Wikimedia Bolivia** (*Bolivia*)

* **Fundación Kiru y Datalat** (*Ecuador*)

* **SantaLab** (*Argentina*)


## License

This project is licensed under *CC BY-SA* License - see the [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) file for details


## Knowledgement

* [Project](https://blog.mapbox.com/mapping-female-versus-male-street-names-b4654c1e00d5) _Mapping female versus male street names_ of Mapbox by [Aruna Sankaranarayanan](https://www.mapbox.com/about/team/aruna-sankaranarayanan/) 

