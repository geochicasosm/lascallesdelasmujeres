function Constants(){
    
    this.bboxList = {
        asuncion: [-57.6723, -25.3518, -57.5391, -25.241],
        barcelona: [2.0875, 41.2944, 2.2582, 41.4574],
        buenosaires: [-58.5315, -34.7056, -58.3351, -34.5266],
        cdmx: [-99.2446, 19.2804, -99.0255, 19.524],
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
        montevideo:[ -56.18816, -34.90328],
        cdmx:[-99.133205, 19.432608 ]        
    };
    
    this.datos = {
        asuncion:       {numLink:55,pcLink:45.5,numNoLink:66,pcNoLink:54.5,numMale:1426,numFemale:121,pcMale:92.2,pcFemale:7.8,totalNames:1547}, //{pcM: 91.9, numM: 1542, pcF: 8.1, numF: 135},
        barcelona:      {numLink:229,pcLink:69.4,numNoLink:101,pcNoLink:30.6,numMale:1795,numFemale:330,pcMale:84.5,pcFemale:15.5,totalNames:2125}, //{pcM: 84.1, numM: 2139, pcF: 15.9, numF: 404},
        buenosaires:    {numLink:86,pcLink:67.7,numNoLink:41,pcNoLink:32.3,numMale:1941,numFemale:127,pcMale:93.9,pcFemale:6.1,totalNames:2068}, //{pcM: 93.6, numM: 2445, pcF: 6.4, numF: 166},
        cochabamba:     {numLink:16,pcLink:34.8,numNoLink:30,pcNoLink:65.2,numMale:617,numFemale:46,pcMale:93.1,pcFemale:6.9,totalNames:663}, //{pcM: 93.6, numM: 701, pcF: 6.4, numF: 48},
        cdmx:           {numLink:161,pcLink:47.8,numNoLink:176,pcNoLink:52.2,numMale:2577,numFemale:337,pcMale:88.4,pcFemale:11.6,totalNames:2914},
        lima:           {numLink:155,pcLink:58.1,numNoLink:112,pcNoLink:41.9,numMale:2881,numFemale:267,pcMale:91.5,pcFemale:8.5,totalNames:3148}, //{pcM: 93.6, numM: 2445, pcF: 6.4, numF: 166},
        montevideo:     {numLink:78,pcLink:47.9,numNoLink:85,pcNoLink:52.1,numMale:1875,numFemale:163,pcMale:92.0,pcFemale:8.0,totalNames:2038} //{pcM: 92, numM: 2070, pcF: 8, numF: 178},
    }; 

    this.mapDarkStyle = 'mapbox://styles/mapbox/dark-v9';
    this.initCenter = [	-39.11133, 36.66842];
}