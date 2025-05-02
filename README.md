# #LasCallesDeLasMujeres

Read this in ENGLISH here: [README.en.md](https://github.com/geochicasosm/lascallesdelasmujeres/blob/master/README.en.md)

Visita la web del proyecto: [#LasCallesDeLasMujeres](https://geochicasosm.github.io/lascallesdelasmujeres/) ( Versión beta )

Lee una explicación técnica del proyecto algo más detallada en este artículo: [#LasCallesDeLasMujeres (TheStreetsOfWomen) meets Mapbox #mapmadness18](https://t.co/1NCGE0eyIO)

## Descripción del proyecto

Este es un proyecto colaborativo de Geochicas para producir un mapa de las calles con nombres de mujeres en América Latina y España. Esta propuesta busca vincular y generar contenido en OSM y Wikipedia sobre mujeres prominentes.

El objetivo principal es crear una nueva narrativa de manera colaborativa, y así enfatizar la importancia de recordar a las mujeres, sus luchas y logros a través del espacio público y digital.

Por esta razón, hemos generado un mapa de las calles que tienen nombres de mujeres en las diferentes ciudades de América Latina y España, y así mostrar la brecha que históricamente existe dentro de las ciudades.

Se pretende hacer una encuesta de información sobre calles, avenidas, pasajes, caminos que tienen los nombres de mujeres y también sus respectivas biografías en Wikipedia. También se alentará a agregar los nombres de las calles correspondientes a las mujeres que no están mapeadas en OpenStreetMap (mapa gratuito y colaborativo) y la creación de sus artículos en Wikipedia.

El proyecto fue presentado oficialmente en el marco del Día Internacional de la Mujer, el 8 de marzo.

## Utilización de Wikidata

Al pasar el ratón sobre las calles con información en Wikipedia o Wikidata, la aplicación hace dos consultas distintas a Wikidata. Si la calle tiene enlace a Wikipedia en primer lugar se busca la entrada de esa mujer en Wikidata a partir del enlace. Una vez obtenido el identificador explícitamente o bien vía el enlace a Wikipedia, se realiza otra consulta a Wikidata que trata de extraer información relevante que se mostrará en la ventana emergente (_pop-up_):

* Nombre
* Descripción corta
* Fechas de nacimiento y fallecimiento
* Ocupaciones
* Enlace a una fotografía

### Identificador de Wikidata a partir del nombre

Esta consulta espera el nombre de una mujer que aparece en la Wikipedia en Español y devolverá el identificador de Wikidata al que se refiere. Al [ejecutar](https://query.wikidata.org/#SELECT%20%3Fid%0AWHERE%20%7B%0A%20%20%20%20VALUES%20%3FwikiTitle%20%7B%22Clara%20Campoamor%22%40es%7D%0A%20%20%20%20%3Fwiki%20schema%3Aabout%20%3Fid%3B%0A%20%20%20%20%20%20%20%20%20%20schema%3AisPartOf%20%3Chttps%3A%2F%2Fes.wikipedia.org%2F%3E%3B%0A%20%20%20%20%20%20%20%20%20%20schema%3Aname%20%3FwikiTitle.%0A%7D) esta consulta con `Clara Campoamor` obtenemos el identificador [`Q3321142`](https://www.wikidata.org/wiki/Q3321142).

```sparql
SELECT ?id
WHERE {
    VALUES ?wikiTitle {"Clara Campoamor"@es}
    ?wiki schema:about ?id;
          schema:isPartOf <https://es.wikipedia.org/>;
          schema:name ?wikiTitle.
}
```

### Datos a partir de un identificador de Wikidata

Esta consulta tiene como parámetro el identificador de una entrada y busca obtener algunos datos que pueden aparecer en la entrada de manera opcional (`OPTIONAL`). A veces algunas entradas tienen varias fechas de nacimiento o fallecimiento o imágenes, por lo que la consulta obtendrá uno de esos valores aleatoriamente (`SAMPLE`). Además, agregará las distintas ocupaciones listadas para el personaje. Por desgracia, las ocupaciones vienen en género masculino. Al [ejecutar](https://query.wikidata.org/#SELECT%20%0A%20%20%3Fid%20%28%3FidLabel%20AS%20%3Fname%29%20%0A%20%20%3Fdescription%20%0A%20%20%28%3FgenderLabel%20AS%20%3Fgender%29%20%0A%20%20%28SAMPLE%28%3Fbirths%29%20AS%20%3Fbirth%29%20%0A%20%20%28SAMPLE%28%3Fdeaths%29%20AS%20%3Fdeath%29%20%0A%20%20%28SAMPLE%28%3Fpic%29%20AS%20%3Fpicture%29%20%0A%20%20%28GROUP_CONCAT%28DISTINCT%20%3FoccupationsLabel%3B%20SEPARATOR%20%3D%20%22%2C%20%22%29%20AS%20%3Foccupations%29%20%0AWHERE%20%7B%0A%20%20VALUES%20%3Fid%20%7B%0A%20%20%20%20wd%3AQ3321142%0A%20%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP21%20%3Fgender.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP569%20%3Fbirths.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP570%20%3Fdeaths.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP106%20%3Foccupations.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20wdt%3AP18%20%3Fpic.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fid%20schema%3Adescription%20%3Fdesc.%20%7D%0A%20%20FILTER%28%28LANG%28%3Fdesc%29%29%20%3D%20%22es%22%29%0A%20%20BIND%28COALESCE%28%3Fdesc%2C%20%22%22%29%20AS%20%3Fdescription%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22es%22.%0A%20%20%20%20%3Fid%20rdfs%3Alabel%20%3FidLabel.%0A%20%20%20%20%3Fgender%20rdfs%3Alabel%20%3FgenderLabel.%0A%20%20%20%20%3Foccupations%20rdfs%3Alabel%20%3FoccupationsLabel.%0A%20%20%7D%0A%7D%0AGROUP%20BY%20%3Fid%20%3FidLabel%20%3Fdescription%20%3FgenderLabel%20%3Fwiki) esta consulta con el identificador del ejemplo anterior obtenemos los detalles referidos a Clara Campoamor.

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

### Estado actual

El proyecto se encuentra aún en desarrollo. La idea es ir ampliando paulatinamente el número de ciudades mapeadas, que hasta el momento son:

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

En preparación:
- Santa Fe, Argentina


## Realizado con

* [Mapbox](https://www.mapbox.com/) - The web framework used


## Contribuir con el proyecto

Contacta con nostras a través de twitter: [@geochicasosm](https://twitter.com/GeochicasOSM).


## Coordinadoras


* **Caleidoscpic** (*Bolivia*) - [@CaleidoscopeEye](http://www.fotonostra.com/glosario/arroba.htm) 
    
    Arquitecta, amante  del conocimiento libre y el trabajo colaborativo

* **Nikole Arguedas** (*Costa Rica*)  
    
    UX/UI, apasionada por los mapas y el empoderamiento femenino.

* **Jessica Sena** (*España*) - [@jsenag](https://jessisena.github.io/myprofile/) 
    
    Ingeniera informática, desarrolladora web/móvil en ámbito geo.

* **Malena Libman** (*Argentina*) -  
    
    Técnica en SIG, Geoinquieta

* **Selene Yang** (*Nicaragua*) - [@srta_peperina](https://twitter.com/Srta_Peperina)
    
    Investigadora académica. Sobreviviendo a un doctorado en Comunicación en la UNLP. Geofeminista     
    
## Colaboradores


* **Carina Córdoba** (*Argentina*)

* **Noe Ortiz** (*México*)

* **Horacio Castellaro** (*Argentina*)

* **Jorge Sanz** (*España*)


## Organizaciones Aliadas

* **Wikimedia Argentina** (*Argentina*)

* **Wikimedia Bolivia** (*Bolivia*)

* **Fundación Kiru y Datalat** (*Ecuador*)

* **SantaLab** (*Argentina*)


## Licencia

This project is licensed under *CC BY-SA* License - see the [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) file for details

## Reconocimiento

* [Proyecto](https://blog.mapbox.com/mapping-female-versus-male-street-names-b4654c1e00d5) _Mapping female versus male street names_ de Mapbox por [Aruna Sankaranarayanan](https://www.mapbox.com/about/team/aruna-sankaranarayanan/) 

