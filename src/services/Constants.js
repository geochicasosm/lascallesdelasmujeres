export const mapDarkStyle = 'mapbox://styles/mapbox/dark-v9';

export const initCenter = [-39.11133, 36.66842];

export const framesPerSecond = 60;
export const initialOpacity = 1;
export const initialRadius = 5;
export const maxRadius = 18;

export const FEMALE = 'Female';
export const MALE = 'Male';
export const URL_DATA = 'https://raw.githubusercontent.com/geochicasosm/lascallesdelasmujeres/master';
export const SOURCE_TYPES_LIST = ['line', 'fill'];


export const countriesList = [
  {
    id: 'argentina',
    name: 'Argentina',
    citiesList: [
      {
        id: 'buenosaires',
        name: 'Buenos Aires',
        datos: {
          numLink: 86,
          pcLink: 67.7,
          numNoLink: 41,
          pcNoLink: 32.3,
          numMale: 1941,
          numFemale: 127,
          pcMale: 93.9,
          pcFemale: 6.1,
          totalNames: 2068,
        },
        center: [-58.37723, -34.61315],
      },
      {
        id: 'chajari',
        name: 'Chajarí',
        datos: {
          numLink: 7,
          pcLink: 53.8,
          numNoLink: 6,
          pcNoLink: 46.2,
          numMale: 98,
          numFemale: 13,
          pcMale: 88.3,
          pcFemale: 11.7,
          totalNames: 111,
        },
        center: [-58, -30.75],
      },
      {
        id: 'ciudaddesanluis',
        name: 'Ciudad de San Luis',
        datos: {
          numLink: 13, pcLink: 50.0, numNoLink: 13, pcNoLink: 50.0, numMale: 165, numFemale: 26, pcMale: 86.4, pcFemale: 13.6, totalNames: 191,
        },
        center: [-66.33563, -33.29501],
      },
      {
        id: 'cordoba',
        name: 'Córdoba',
        datos: {
          numLink: 95, pcLink: 59.0, numNoLink: 66, pcNoLink: 41.0, numMale: 2096, numFemale: 161, pcMale: 92.9, pcFemale: 7.1, totalNames: 2257,
        },
        center: [-64.183334, -31.416668],
      },
      {
        id: 'parana',
        name: 'Paraná',
        datos: {
          numLink:26,
          pcLink:59.1,
          numNoLink:18,
          pcNoLink:40.9,
          numMale:605,
          numFemale:44,
          pcMale:93.2,
          pcFemale:6.8,
          totalNames:649
        },
        center: [ -60.5238, -31.73197],
      },
      {
        id: 'resistencia',
        name: 'Resistencia',
        datos: {
          numLink: 51,
          pcLink: 75.0,
          numNoLink: 17,
          pcNoLink: 25.0,
          numMale: 474,
          numFemale: 68,
          pcMale: 87.5,
          pcFemale: 12.5,
          totalNames: 542,
        },
        center: [-58.98652, -27.45112],
      },
      {
        id: 'rosario',
        name: 'Rosario',
        datos: {
          numLink: 28,
          pcLink: 43.8,
          numNoLink: 36,
          pcNoLink: 56.3,
          numMale: 504,
          numFemale: 64,
          pcMale: 88.7,
          pcFemale: 11.3,
          totalNames: 568,
        },
        center: [-60.6553737, -32.9427715],
      },
      {
        id: 'salta',
        name: 'Salta',
        datos: {
          numLink: 89,
          pcLink: 47.1,
          numNoLink: 100,
          pcNoLink: 52.9,
          numMale: 1213,
          numFemale: 189,
          pcMale: 86.5,
          pcFemale: 13.5,
          totalNames: 1402,
        },
        center: [-65.410, -24.789],
      },
      {
        id: 'santafe',
        name: 'Santa Fe',
        datos: {
          numLink: 20,
          pcLink: 64.5,
          numNoLink: 11,
          pcNoLink: 35.5,
          numMale: 433,
          numFemale: 31,
          pcMale: 93.3,
          pcFemale: 6.7,
          totalNames: 464,
        },
        center: [-60.7077, -31.60135],
      },
    ],
  },
  {
    id: 'bolivia',
    name: 'Bolivia',
    citiesList: [
      {
        id: 'cochabamba',
        name: 'Cochabamba',
        datos: {
          numLink: 16,
          pcLink: 34.8,
          numNoLink: 30,
          pcNoLink: 65.2,
          numMale: 617,
          numFemale: 46,
          pcMale: 93.1,
          pcFemale: 6.9,
          totalNames: 663,
        },
        center: [-66.1568, -17.3895],
      },
    ],
  },
  /*   {
    id: 'costarica',
    name: 'Costa Rica',
    citiesList: [
      {
        id: 'alajuela',
        name: 'Alajuela',
        datos: {
          numLink: 14,
          pcLink: 21.5,
          numNoLink: 51,
          pcNoLink: 78.5,
          numMale: 143,
          numFemale: 65,
          pcMale: 68.8,
          pcFemale: 31.3,
          totalNames: 208,
        },
        center: [-84.198235, 10.009604],
      },
      {
        id: 'heredia',
        name: 'Heredia',
        datos: {
          numLink: 14,
          pcLink: 19.7,
          numNoLink: 57,
          pcNoLink: 80.3,
          numMale: 132,
          numFemale: 71,
          pcMale: 65.0,
          pcFemale: 35.0,
          totalNames: 203,
        },
        center: [-84.115938, 9.997433],
      }],
  }, */

  {
    id: 'cuba',
    name: 'Cuba',
    citiesList: [
      {
        id: 'habana',
        name: 'La Habana',
        datos: {
          numLink: 42,
          pcLink: 36.2,
          numNoLink: 74,
          pcNoLink: 63.8,
          numMale: 191,
          numFemale: 116,
          pcMale: 62.2,
          pcFemale: 37.8,
          totalNames: 307,
        },
        center: [-82.366592, 23.113592],
      },
    ],
  },
  {
    id: 'espana',
    name: 'España',
    citiesList: [
      {
        id: 'badalona',
        name: 'Badalona',
        datos: {
          numLink: 37,
          pcLink: 94.9,
          numNoLink: 2,
          pcNoLink: 5.1,
          numMale: 305,
          numFemale: 39,
          pcMale: 88.7,
          pcFemale: 11.3,
          totalNames: 344,
        },
        center: [2.24741, 41.45004],
      },
      {
        id: 'barcelona',
        name: 'Barcelona',
        datos: {
          numLink: 123,
          pcLink: 69.1,
          numNoLink: 55,
          pcNoLink: 30.9,
          numMale: 911,
          numFemale: 178,
          pcMale: 83.7,
          pcFemale: 16.3,
          totalNames: 1089,
        },
        center: [2.154007, 41.390205],
      },
      {
        id: 'girona',
        name: 'Girona',
        datos: {
          numLink: 42,
          pcLink: 77.8,
          numNoLink: 12,
          pcNoLink: 22.2,
          numMale: 279,
          numFemale: 54,
          pcMale: 83.8,
          pcFemale: 16.2,
          totalNames: 333,
        },
        center: [2.8239, 41.9842],
      },
      {
        id: 'madrid',
        name: 'Madrid',
        datos: {
          numLink: 379,
          pcLink: 52.2,
          numNoLink: 347,
          pcNoLink: 47.8,
          numMale: 2674,
          numFemale: 726,
          pcMale: 78.6,
          pcFemale: 21.4,
          totalNames: 3400,
        },
        center: [-3.7037, 40.41677],
      },
      {
        id: 'zaragoza',
        name: 'Zaragoza',
        datos: {
          numLink: 185,
          pcLink: 77.7,
          numNoLink: 53,
          pcNoLink: 22.3,
          numMale: 1090,
          numFemale: 238,
          pcMale: 82.1,
          pcFemale: 17.9,
          totalNames: 1328,
        },
        center: [-0.87734, 41.65606],
      },
    ],
  },
  {
    id: 'mexico',
    name: 'México',
    citiesList: [
      {
        id: 'cdmx',
        name: 'C. de México',
        datos: {
          numLink: 161,
          pcLink: 47.8,
          numNoLink: 176,
          pcNoLink: 52.2,
          numMale: 2577,
          numFemale: 337,
          pcMale: 88.4,
          pcFemale: 11.6,
          totalNames: 2914,
        },
        center: [-99.133205, 19.432608],
      },
    ],
  },

  {
    id: 'paraguay',
    name: 'Paraguay',
    citiesList: [
      {
        id: 'asuncion',
        name: 'Asunción',
        datos: {
          numLink: 27,
          pcLink: 44.3,
          numNoLink: 34,
          pcNoLink: 55.7,
          numMale: 974,
          numFemale: 61,
          pcMale: 94.1,
          pcFemale: 5.9,
          totalNames: 1035,
        },
        center: [-57.63591, -25.30066],
      },
      {
        id: 'encarnacion',
        name: 'Encarnación',
        datos: {
          numLink: 11,
          pcLink: 45.8,
          numNoLink: 13,
          pcNoLink: 54.2,
          numMale: 98,
          numFemale: 24,
          pcMale: 80.3,
          pcFemale: 19.7,
          totalNames: 122,
        },
        center: [-55.86667, -27.33056],
      },
    ],
  },
  {
    id: 'peru',
    name: 'Perú',
    citiesList: [
      {
        id: 'lima',
        name: 'Lima',
        datos: {
          numLink: 155,
          pcLink: 58.1,
          numNoLink: 112,
          pcNoLink: 41.9,
          numMale: 2881,
          numFemale: 267,
          pcMale: 91.5,
          pcFemale: 8.5,
          totalNames: 3148,
        },
        center: [-77.02824, -12.04318],
      },
    ],
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    citiesList: [
      {
        id: 'montevideo',
        name: 'Montevideo',
        datos: {
          numLink: 78,
          pcLink: 47.9,
          numNoLink: 85,
          pcNoLink: 52.1,
          numMale: 1875,
          numFemale: 163,
          pcMale: 92.0,
          pcFemale: 8.0,
          totalNames: 2038,
        },
        center: [-56.18816, -34.90328],
      },
    ],
  },
];

export const lang = {
  es: {
    panelDescriptionText1:
      'Mapa generado a partir de las calles con nombre de mujeres, en diferentes ciudades de habla hispana (Latinoamérica y España).',
    panelDescriptionText2:
      'El objetivo es visibilizar la brecha que existe históricamente en la representación de figuras femeninas en las calles de las ciudades.',
    panelDescriptionTextShort:
      'Mapa de las calles con nombre de mujer en ciudades de Latinoamérica y España, para visibilizar la brecha que existe en la representación de figuras femeninas en las ciudades.',
    panelProjectBy: 'Un proyecto de',
    panelProjectBy2: 'Proyecto de',
    menuTitle: 'Las calles de las mujeres',
    chartTxt: {
      chartMen: 'Hombres',
      chartWomen: 'Mujeres',
      chartStreetsOf: 'Calles de',
      chartHave: 'tiene',
      chartNotHave: 'no tiene',
      chartText1: 'Mujeres con artículo en Wikipedia',
    },
    popupText: 'Calle sin artículo',
  },

  ca: {
    panelDescriptionText1:
      'Mapa generat a partir dels carrers amb nom de dones, a diferents ciutats de parla hispana (Llatinoamèrica i Espanya).',
    panelDescriptionText2:
      "L'objectiu és visibilitzar la bretxa que existeix històricament en la representació de figures femenines als carrers de les ciutats.",
    panelDescriptionTextShort:
      'Mapa dels carrers amb nom de dona en ciutats de Llatinoamèrica i Espanya, per visibilitzar la bretxa que existeix en la representació de figures femenines a les ciutats.',
    panelProjectBy: 'Un projecte de',
    panelProjectBy2: 'Projecte de',
    menuTitle: 'Els carrers de les dones',
    chartTxt: {
      chartMen: 'Homes',
      chartWomen: 'Dones',
      chartStreetsOf: 'Carrers de',
      chartHave: 'en té',
      chartNotHave: 'no en té',
      chartText1: 'Dones amb article a Wikipedia',
    },
    popupText: 'Carrer sense article',
  },
  en: {
    panelDescriptionText1:
      'Map generated from the data obtained of Women Street names in Spanish speaking cities (Latin America and Spain).',
    panelDescriptionText2:
      'The objective is visualize the historic gap representing women figures in the streets of the cities.',
    panelDescriptionTextShort:
      "Map of the streets containing women's names in cities of Latin America and Spain, visualizing the gap representing women figures in the cities.",
    panelProjectBy: 'A project from',
    panelProjectBy2: 'Project from',
    menuTitle: 'The street of the women',
    chartTxt: {
      chartMen: 'Men',
      chartWomen: 'Women',
      chartStreetsOf: 'The street of',
      chartHave: 'have',
      chartNotHave: "doesn't have",
      chartText1: 'Women having a Wikipedia article',
    },
    popupText: 'Street without article',
  },
};
