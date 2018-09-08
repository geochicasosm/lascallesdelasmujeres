
function Constants(){

    this.mapDarkStyle = 'mapbox://styles/mapbox/dark-v9';
    this.initCenter = [	-39.11133, 36.66842];

    this.countriesList = [
        {id: 'argentina', name: 'Argentina', citiesList: [
          {id: 'resistencia', name: 'Resistencia', datos: {numLink:51,pcLink:75.0,numNoLink:17,pcNoLink:25.0,numMale:474,numFemale:68,pcMale:87.5,pcFemale:12.5,totalNames:542}, center: [ -58.98652, -27.45112]},
          {id: 'rosario', name: 'Rosario', datos: {numLink:28,pcLink:43.8,numNoLink:36,pcNoLink:56.3,numMale:504,numFemale:64,pcMale:88.7,pcFemale:11.3,totalNames:568}, center: [-60.6553737,  -32.9427715]},
          {id: 'buenosaires', name: 'Buenos Aires', datos: {numLink:86,pcLink:67.7,numNoLink:41,pcNoLink:32.3,numMale:1941,numFemale:127,pcMale:93.9,pcFemale:6.1,totalNames:2068}, center: [-58.37723, -34.61315]}]},
        {id: 'espana', name: 'España', citiesList:[
          {id: 'barcelona', name: 'Barcelona', datos: {numLink:229,pcLink:69.4,numNoLink:101,pcNoLink:30.6,numMale:1795,numFemale:330,pcMale:84.5,pcFemale:15.5,totalNames:2125}, center: [2.154007, 41.390205]}]},
	      {id: 'mexico', name: 'México', citiesList:[
          {id: 'cdmx', name: 'C. de México', datos: {numLink:161,pcLink:47.8,numNoLink:176,pcNoLink:52.2,numMale:2577,numFemale:337,pcMale:88.4,pcFemale:11.6,totalNames:2914}, center: [-99.133205, 19.432608 ]}]},
	      {id: 'bolivia', name: 'Bolivia', citiesList:[
          {id: 'cochabamba', name: 'Cochabamba', datos: {numLink:16,pcLink:34.8,numNoLink:30,pcNoLink:65.2,numMale:617,numFemale:46,pcMale:93.1,pcFemale:6.9,totalNames:663}, center: [-66.1568, -17.3895]}]},
	      {id: 'paraguay', name: 'Paraguay', citiesList:[
	        {id: 'asuncion', name: 'Asunción', datos: {numLink:55,pcLink:45.5,numNoLink:66,pcNoLink:54.5,numMale:1426,numFemale:121,pcMale:92.2,pcFemale:7.8,totalNames:1547}, center: [-57.63591, -25.30066]}]},
        {id: 'cuba', name: 'Cuba', citiesList:[
          {id: 'habana', name: 'La Habana', datos: {numLink:42,pcLink:36.2,numNoLink:74,pcNoLink:63.8,numMale:191,numFemale:116,pcMale:62.2,pcFemale:37.8,totalNames:307}, center: [-82.366592,23.113592]}]},
        {id: 'peru', name: 'Perú', citiesList:[
          {id: 'lima', name: 'Lima', datos: {numLink:155,pcLink:58.1,numNoLink:112,pcNoLink:41.9,numMale:2881,numFemale:267,pcMale:91.5,pcFemale:8.5,totalNames:3148}, center: [ -77.02824, -12.04318]}]},
        {id: 'uruguay', name: 'Uruguay', citiesList:[
          {id: 'montevideo', name: 'Montevideo', datos: {numLink:78,pcLink:47.9,numNoLink:85,pcNoLink:52.1,numMale:1875,numFemale:163,pcMale:92.0,pcFemale:8.0,totalNames:2038}, center: [ -56.18816, -34.90328]}]}
    ];


    this.lang = {
        es : {
            panelDescriptionText1 : 'Mapa generado a partir de las calles con nombre de mujeres, en diferentes ciudades de habla hispana (Latinoamérica y España).',
            panelDescriptionText2 : 'El objetivo es visibilizar la brecha que existe históricamente en la representación de figuras femeninas en las calles de las ciudades.',
            panelDescriptionTextShort: 'Mapa de las calles con nombre de mujer en ciudades de Latinoamérica y España, para visibilizar la brecha que existe en la representación de figuras femeninas en las ciudades.',
            panelProjectBy: 'Un proyecto de',
            menuTitle: 'Las calles de las mujeres'

        },
        en : {
            readmore : 'Read More',
            date     : 'Date'
        }
    }
}
