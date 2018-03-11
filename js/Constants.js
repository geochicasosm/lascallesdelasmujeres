function Constants(){
    
    this.bboxList = {
        asuncion: [-57.6723, -25.3518, -57.5391, -25.241],
        barcelona: [2.0875, 41.2944, 2.2582, 41.4574],
        buenosaires: [-58.5315, -34.7056, -58.3351, -34.5266],
        cochabamba: [-66.2027, -17.4339, -66.1153, -17.3349],
        lima: [-77.1538, -12.1651, -76.9163, -11.9757],
        montevideo:[-56.2621, -34.936, -56.0538, -34.8066]         
    };

    this.centerList = {
        asuncion: [-57.63591, -25.30066],
        barcelona: [2.154007, 41.390205],
        buenosaires: [-58.37723, -34.61315],
        cochabamba: [-66.1568, -17.3895],
        lima: [ -77.02824, -12.04318],
        montevideo:[ -56.18816, -34.90328]         
    };
    
    this.datos = {
        asuncion:       {pcM: 91.9, numM: 1542, pcF: 8.1, numF: 135},
        barcelona:      {pcM: 84.1, numM: 2139, pcF: 15.9, numF: 404},
        buenosaires:    {pcM: 93.6, numM: 2445, pcF: 6.4, numF: 166},
        cochabamba:     {pcM: 93.6, numM: 701, pcF: 6.4, numF: 48},

        lima:           {pcM: 93.6, numM: 2445, pcF: 6.4, numF: 166},
        montevideo:     {pcM: 92, numM: 2070, pcF: 8, numF: 178},
    }; 

    this.mapDarkStyle = 'mapbox://styles/mapbox/dark-v9';
    this.initCenter = [	-39.11133, 36.66842];
}