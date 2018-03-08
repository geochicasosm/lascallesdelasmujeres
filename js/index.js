

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvc3RhcnRlcnMiLCJhIjoiMGNxekwxayJ9.sE1YC8Zxwzjh4CQeZiZN_g';

function initMap(){

    var bboxList = {
        asuncion: [-57.6723, -25.3518, -57.5391, -25.241],
        barcelona: [2.0875, 41.2944, 2.2582, 41.4574],
        buenosaires: [-58.5315, -34.7056, -58.3351, -34.5266],
        cochabamba: [-66.2027, -17.4339, -66.1153, -17.3349],
        lima: [-77.1538, -12.1651, -76.9163, -11.9757],
        montevideo:[-56.2621, -34.936, -56.0538, -34.8066]         
    };

    var centerList = {
        asuncion: [-57.63591, -25.30066],
        barcelona: [2.154007, 41.390205],
        buenosaires: [-58.37723, -34.61315],
        cochabamba: [-66.1568, -17.3895],
        lima: [ -77.02824, -12.04318],
        montevideo:[ -56.18816, -34.90328]         
    };
    
    var datos = {
        asuncion:       {pcM: 91.9, numM: 1542, pcF: 8.1, numF: 135},
        barcelona:      {pcM: 84.1, numM: 2139, pcF: 15.9, numF: 404},
        buenosaires:    {pcM: 93.6, numM: 2445, pcF: 6.4, numF: 166},
        cochabamba:     {pcM: 93.6, numM: 701, pcF: 6.4, numF: 48},

        lima:           {pcM: 93.6, numM: 2445, pcF: 6.4, numF: 166},
        montevideo:     {pcM: 93.6, numM: 2445, pcF: 6.4, numF: 166},
    };    

    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/geostarters/cj0wc7qhm00rt2rny75ogya88', // stylesheet location
        center: [	-39.11133, 36.66842], // starting position [lng, lat]
        zoom: 2 // starting zoom
    });
    
    
    map.on('load', loadGeojson(11, 'barcelona'));
    map.on('load', loadGeojson(9, 'buenosaires'));
    map.on('load', loadGeojson(12, 'cochabamba'));
    map.on('load', loadGeojson(9, 'asuncion'));


    function loadGeojson(tilecount, folder){    
    
        for(var i=0; i<tilecount; i++){
    
            fetch('https://raw.githubusercontent.com/geochicasosm/lascallesdelasmujeres/master/data/'+folder+'/final_tile'+i+'.geojson').then(function(res){
                return res.json();
            }).then(function(geojson){
    
                addGeojson(geojson);
    
            });
        }    
    }    
    
  
    
    
    function addGeojson(geojson, sourcename = Date.now()){
           
        map.addLayer({
            "id": `${sourcename}`,
            "type": "line",
            "source": {
                "type": "geojson",
                "data": geojson
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                //"line-color":  "#76ef0a",
                'line-color': ['case', ['==', ['get', 'gender'], 'Female'], '#FFA400', '#00B99E'],
                "line-width": ['case', ['==', ['get', 'gender'], 'Female'], 5, 4],
            }
        });
    
        map.on('click', `${sourcename}`, function (e) {

            var link = e.features[0].properties.wikipedia_link;
            var name = e.features[0].properties.name;
            var gender = e.features[0].properties.gender;
    
            var html = '<div class="popup-male"><p>'+name+'</p></div>';

            if (gender === 'Female'){

                html = '<div class="row">'+
                            '<div class="col-sm">'+
                                '<div class="popup-female"><p>'+name+'</p><p class=""><a target="_blank" href=\''+link+'\'><img id="wiki" class="effect6" src="./css/images/wikipedia.svg"/></a></p></div>'+
                            '</div>'+
                        '</div>';

                //html = '<div class="popup-female"><p>'+name+'</p><p>( mujer )</p> <p><a target="_blank" href=\''+link+'\'><img src="./css/images/wikipedia.svg"/></a></p></div>';
            }
            
    
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map);
        });        
    }



    $("#ciudades-list .nombre-ciudad, #menu-list a").hover(function(){
        $(this).css("background-color", "#243342");
        }, function(){
        $(this).css("background-color", "");
    });
    

    /*CLICK EVENTS*/

    $("#barcelona" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        mapToBarcelona();
    });
    $('#menu-barcelona').click(function() {        
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        mapToBarcelona();
        $(".navbar-collapse").removeClass("show");
    });
    function mapToBarcelona(){
        map.flyTo({
            center: centerList.barcelona,
            zoom: 13
        }); 
        loadChart(datos.barcelona, 'Barcelona');  
    }    

    $("#asuncion" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        mapToAsuncion();
    });
    $('#menu-asuncion').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        mapToAsuncion();
        $(".navbar-collapse").removeClass("show");
    });
    function mapToAsuncion(){
        map.flyTo({
            center: centerList.asuncion,
            zoom: 13
        }); 
        loadChart(datos.asuncion, 'Asunción');    
    }     
    
    $("#buenosaires").click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        mapToBuenosAires();
    });
    $('#menu-buenosaires').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        mapToBuenosAires();
        $(".navbar-collapse").removeClass("show");
    });
    function mapToBuenosAires(){
        map.flyTo({
            center: centerList.buenosaires,
            zoom: 13
        });
        loadChart(datos.buenosaires, 'Buenos Aires');        
    }

    $("#cochabamba" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        mapToCochabamba();
    });
    $('#menu-cochabamba').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        mapToCochabamba();
        $(".navbar-collapse").removeClass("show");
    });
    function mapToCochabamba(){
        map.flyTo({
            center: centerList.cochabamba,
            zoom: 13
        });
        loadChart(datos.cochabamba, 'Cochabamba');     
    }        

    
    $("#lima" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        mapToLima();

    });
    $('#menu-lima').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        mapToLima();
        $(".navbar-collapse").removeClass("show");
    });
    function mapToLima(){
        map.flyTo({
            center: centerList.lima,
            zoom: 13
        });
        loadChart(datos.lima, 'Lima');   
    }    
    
    $("#montevideo" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        mapToMontevideo(); 

    });
    $('#menu-montevideo').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        mapToMontevideo();
        $(".navbar-collapse").removeClass("show");
    });
    function mapToMontevideo(){
        map.flyTo({
            center: centerList.montevideo,
            zoom: 13
        });
        loadChart(datos.montevideo, 'Montevideo');
    }      
    


    /* graficos */


    
    
    function loadChart(datos, ciudad){
        $("#panel-chart").removeClass("invisible");
        var ctx = document.getElementById('chart-area').getContext('2d');
        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [ datos.numM, datos.numF],
                    backgroundColor: [
                       '#00b99e',
                       '#FFCA3A'
                    ],
                    label: 'label'
                }],
                labels: [ 'H,'+datos.pcM+'%', 'M,'+datos.pcF+'%' ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                    fontFamily: 'Roboto',
                    fullWidth: false
                },
                title: {
                    display: true,
                    text: ciudad,
                    position: 'top',
                    fontFamily: 'Roboto',
                    fontSize: 14
                },            
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
		window.myDoughnut = new Chart(ctx, config);
    }

}


window.onload = function() {
   // var myInitMap = initMap();
    //myInitMap();
    initMap();
};

