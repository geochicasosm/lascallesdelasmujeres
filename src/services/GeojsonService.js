import {
  framesPerSecond,
  initialOpacity,
  initialRadius,
  maxRadius,
  FEMALE,
  URL_DATA,
} from './Constants';

export default class GeojsonMapService {
  static loadGeojson(map, folder, isMobile, coords, lang, popupText) {
    fetch(`${URL_DATA}/data/${folder}/final_tile.geojson`)
      .then((res) => res.json())
      .then(
        this.addGeojsonSource.bind(this, map, isMobile, lang, popupText, coords),
      );
  }

  static loadGeojsonTiles(map, tilecount, folder) {
    for (let i = 0; i < tilecount; i++) {
      fetch(`${URL_DATA}/data/${folder}/final_tile${i}.geojson`)
        .then((res) => res.json())
        .then(this.addGeojsonSource.bind(this, map));
    }
  }

  static getHTMLWikipediaLink(link, popupText) {
    if (link !== '') {
      return `<p class=""><a  class="btn btn-light" target="_blank" href='${link}'><i class="fab fa-wikipedia-w"></i></a></p>`;
    }

    return `<p class=""><a  class="btn btn-light disabled" target="_blank" href='${link}'><i class="fab fa-wikipedia-w"></i></a></p>
              <span class="badge badge-secondary"><i class="fas fa-exclamation"></i>&nbsp;${popupText}</span>`;
  }

  static addGeojsonSource(
    map,
    isMobile,
    lang,
    popupText,
    coords,
    geojson,
    sourcename = Date.now(),
  ) {
    const widthFemale = isMobile ? 5 : 4;
    const widthMale = isMobile ? 4 : 3;

    map.addLayer({
      id: `${sourcename}`,
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
    });

    const popupClick = new mapboxgl.Popup();
    const popupHover = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on('click', `${sourcename}`, (e) => {
      popupHover.remove();

      const link = e.features[0].properties.wikipedia_link; // .replace("es.wiki", lang+".wiki");
      const { name, gender } = e.features[0].properties;
      const color = gender === FEMALE ? '#ffca3af2' : '#0e9686f2';
      const popupType = gender === FEMALE ? 'popup-female' : 'popup-male';

      const html = `<div class="row"><div class="col-sm"><div class="${popupType}"><p>${name}</p>${
        gender === FEMALE ? this.getHTMLWikipediaLink(link, popupText) : ''
      }</div></div></div>`;

      popupClick
        .setLngLat(e.lngLat)
        .setHTML(html)
        .addTo(map);
      const popUpContent = document.getElementsByClassName(
        'mapboxgl-popup-content',
      );
      if (popUpContent.length !== 0) {
        popUpContent[0].style.backgroundColor = color;
      }
    });

    if (!isMobile) {
      map.on('mouseenter', `${sourcename}`, (e) => {
        popupClick.remove();
        map.getCanvas().style.cursor = 'pointer';
        const link = e.features[0].properties.wikipedia_link; // .replace("es.wiki", lang+".wiki");;
        const { name, gender } = e.features[0].properties;
        const color = gender === FEMALE ? '#ffca3af2' : '#0e9686f2';
        const popupType = gender === FEMALE ? 'popup-female' : 'popup-male';

        const html = `<div class="row"><div class="col-sm"><div class="${popupType}"><p>${name}</p>${
          gender === FEMALE ? this.getHTMLWikipediaLink(link, popupText) : ''
        }</div></div></div>`;

        popupHover
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map);
        const popUpContent = document.getElementsByClassName(
          'mapboxgl-popup-content',
        );
        if (popUpContent.length !== 0) {
          popUpContent[0].style.backgroundColor = color;
        }
      });

      map.on('mouseleave', `${sourcename}`, () => {
        map.getCanvas().style.cursor = '';
        popupHover.remove();
      });
    }

    this.addAnimatedPoint(
      map,
      `${sourcename}_point`,
      `${sourcename}_point`,
      coords,
    );
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

    function animateMarker(timestamp) {
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

    animateMarker(0);
  }
}
