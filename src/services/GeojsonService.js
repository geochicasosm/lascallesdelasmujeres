/* eslint-disable no-restricted-globals */
import {
  framesPerSecond,
  initialOpacity,
  initialRadius,
  maxRadius,
  FEMALE,
  URL_DATA,
  SOURCE_TYPES_LIST,
} from './Constants';

import {
  mainPopUpTemplate,
  contentPopUpTemplate,
  popUpWidths,
} from './popUpTemplates';

import getWikidataDetails from './WikidataService';

export default class GeojsonMapService {
  static loadGeojson(map, folder, isMobile, coords, lang, popupText) {
    fetch(`${URL_DATA}/data/${folder}/final_tile.geojson`)
      .then((res) => res.json())
      .then(
        this.addGeojsonSource.bind(this, map, isMobile, lang, popupText, coords, folder),
      );
  }

  static loadGeojsonTiles(map, tilecount, folder) {
    for (let i = 0; i < tilecount; i++) {
      fetch(`${URL_DATA}/data/${folder}/final_tile${i}.geojson`)
        .then((res) => res.json())
        .then(this.addGeojsonSource.bind(this, map));
    }
  }

  static getHTMLWikipediaHTML(name, link, popupText, wikidataDetails, isFemale) {
    if (link === '') {
      return contentPopUpTemplate({
        isFemale,
        name,
        popupText,
      });
    }

    let birthYear;
    let deathYear;
    if (wikidataDetails) {
      try {
        const birthDate = new Date(Date.parse(wikidataDetails.birth));
        birthYear = birthDate instanceof Date && !isNaN(birthDate)
          ? birthDate.getFullYear()
          : undefined;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
      }
      try {
        const deathDate = new Date(Date.parse(wikidataDetails.death));
        deathYear = deathDate instanceof Date && !isNaN(deathDate)
          ? deathDate.getFullYear()
          : undefined;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
      }
    }
    return contentPopUpTemplate({
      isFemale,
      name,
      wikidataDetails,
      birthYear,
      deathYear,
      link,
    });
  }

  static addGeojsonSource(
    map,
    isMobile,
    lang,
    popupText,
    coords,
    sourcename,
    geojson,
  ) {
    const widthFemale = isMobile ? 5 : 4;
    const widthMale = isMobile ? 4 : 3;

    map.addLayer({
      id: `${sourcename}-line`,
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson,
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-blur': ['case', ['==', ['get', 'wikipedia_link'], ''], 4, 1],
        'line-color': [
          'case',
          ['==', ['get', 'gender'], FEMALE],
          '#ffca3a',
          '#00B99E',
        ],
        'line-width': [
          'case',
          ['==', ['get', 'gender'], FEMALE],
          widthFemale,
          widthMale,
        ],
      },
      filter: ['==', '$type', 'LineString'],
    });

    map.addLayer({
      id: `${sourcename}-fill`,
      type: 'fill',
      source: {
        type: 'geojson',
        data: geojson,
      },
      layout: {},
      paint: {
        'fill-color': ['case', ['==', ['get', 'gender'], FEMALE], '#ffca3a', '#00B99E'],
        'fill-opacity': ['case', ['==', ['get', 'wikipedia_link'], ''], 0.2, 0.6],
      },
      filter: ['==', '$type', 'Polygon'],
    });

    this.addPopupEvents(map, sourcename, isMobile, popupText);

    this.addAnimatedPoint(map, `${sourcename}-point`, `${sourcename}-point`, coords);
  }

  static addPopupEvents(map, sourcename, isMobile, popupText) {
    SOURCE_TYPES_LIST.forEach((type) => {
      const popupClick = new mapboxgl.Popup();
      const popupHover = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('click', `${sourcename}-${type}`, (e) => {
        popupHover.remove();

        const link = e.features[0].properties.wikipedia_link; // .replace("es.wiki", lang+".wiki");
        const { name, gender } = e.features[0].properties;
        const popupType = gender === FEMALE ? 'popup-female' : 'popup-male';
        const getHTML = this.getHTMLWikipediaHTML;

        getWikidataDetails(link).then((wikidataDetails) => {
          const htmlContent = getHTML(name, link, popupText, wikidataDetails, gender === FEMALE);
          const html = mainPopUpTemplate({
            popupType,
            name,
            htmlContent,
          });

          popupClick.setLngLat(e.lngLat)
            .setHTML(html)
            .setMaxWidth(popUpWidths[gender])
            .addTo(map);
          popupClick.getElement().classList.add(gender);
        });
      });

      if (!isMobile) {
        // Hover PopUp
        map.on('mouseenter', `${sourcename}-${type}`, (e) => {
          popupClick.remove();
          const mapCanvas = map.getCanvas();
          mapCanvas.style.cursor = 'pointer';
          // TODO .replace("es.wiki", lang+".wiki");;
          const link = e.features[0].properties.wikipedia_link;
          const { name, gender } = e.features[0].properties;

          const popupType = gender === FEMALE ? 'popup-female' : 'popup-male';

          const getHTML = this.getHTMLWikipediaHTML;

          getWikidataDetails(link).then((wikidataDetails) => {
            const htmlContent = getHTML(name, link, popupText, wikidataDetails, gender === FEMALE);
            const html = mainPopUpTemplate({
              popupType,
              name,
              htmlContent,
            });

            popupHover.setLngLat(e.lngLat)
              .setHTML(html)
              .setMaxWidth(popUpWidths[gender])
              .addTo(map);
            popupHover.getElement().classList.add(gender);
          });
        });

        map.on('mouseleave', `${sourcename}-${type}`, () => {
          const mapCanvas = map.getCanvas();
          mapCanvas.style.cursor = '';
          popupHover.remove();
        });
      }
    });
  }

  static addAnimatedPoint(map, sourcename, layername, coords = [0, 0]) {
    let opacity = initialOpacity;
    let radius = initialRadius;

    // Add a source and layer displaying a point which will be animated in a circle.
    map.addSource(sourcename, {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: coords,
      },
    });

    map.addLayer({
      id: layername,
      source: sourcename,
      type: 'circle',
      paint: {
        'circle-radius': initialRadius,
        'circle-radius-transition': { duration: 0 },
        'circle-opacity-transition': { duration: 0 },
        'circle-color': '#FFCA3A',
      },
      minzoom: 1,
      maxzoom: 7,
    });

    map.addLayer({
      id: `${layername}1`,
      source: sourcename,
      type: 'circle',
      paint: {
        'circle-radius': initialRadius,
        'circle-color': '#FFCA3A',
      },
      minzoom: 1,
      maxzoom: 7,
    });

    function animateMarker() {
      radius += (maxRadius - radius) / framesPerSecond;
      opacity -= 0.9 / framesPerSecond;

      map.setPaintProperty(sourcename, 'circle-radius', radius);
      map.setPaintProperty(
        sourcename,
        'circle-opacity',
        opacity < 0 ? 0 : opacity,
      );

      if (opacity <= 0) {
        radius = initialRadius;
        opacity = initialOpacity;
      }

      requestAnimationFrame(animateMarker);
    }

    animateMarker();
  }
}
