

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

    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/geostarters/cj0wc7qhm00rt2rny75ogya88', // stylesheet location
        center: [2.154007, 41.390205], // starting position [lng, lat]
        zoom: 12 // starting zoom
    });
    
    
    //map.on('load', loadGeojsonBarcelona());
    map.on('load', loadGeojson(9, 'buenosaires'));
    map.on('load', loadGeojson(12, 'cochabamba'));
    map.on('load', loadGeojson(9, 'asuncion'));
/*     map.on('load', loadGeojsonBarcelona());
    map.on('load', loadGeojsonBarcelona());
    map.on('load', loadGeojsonBarcelona());
    map.on('load', loadGeojsonBarcelona()); */


    function loadGeojson(tilecount, folder){
    
        //var listNames = [ 'final_tile_2071,1528,12.geojson', 'final_tile_2071,1529,12.geojson', 'final_tile_2071,1530,12.geojson', 'final_tile_2072,1528,12.geojson', 'final_tile_2072,1529,12.geojson', 'final_tile_2072,1530,12.geojson', 'final_tile_2073,1528,12.geojson', 'final_tile_2073,1529,12.geojson', 'final_tile_2073,1530,12.geojson'];
    
        for(var i=0; i<tilecount; i++){
    
            fetch('https://raw.githubusercontent.com/geochicasosm/lascallesdelasmujeres/master/data/'+folder+'/final_tile'+i+'.geojson').then(function(res){
                return res.json();
            }).then(function(geojson){
    
                addGeojson(geojson);
    
            });
        }    
    }    
    
    function loadGeojsonBarcelona(){
    
        var listNames = [ 'final_tile_2071,1528,12.geojson', 'final_tile_2071,1529,12.geojson', 'final_tile_2071,1530,12.geojson', 'final_tile_2072,1528,12.geojson', 'final_tile_2072,1529,12.geojson', 'final_tile_2072,1530,12.geojson', 'final_tile_2073,1528,12.geojson', 'final_tile_2073,1529,12.geojson', 'final_tile_2073,1530,12.geojson'];
    
        for(var i=0; i<listNames.length; i++){
    
            fetch('data/barcelona/'+listNames[i]).then(function(res){
                return res.json();
            }).then(function(geojson){
    
                addGeojson(geojson);

            });
        }    
    }
    
/*     function loadGeojson(e) {
    
    
        
        fetch('data/tile0.geojson').then(function(res){
            return res.json();
        }).then(function(geojson){
    
            addGeojson(geojson, 'tile0');
    
        });
    
        fetch('data/tile1.geojson').then(function(res){
            return res.json();
        }).then(function(geojson){
    
            addGeojson(geojson, 'tile1');
    
        });
    
        fetch('data/tile2.geojson').then(function(res){
            return res.json();
        }).then(function(geojson){
    
            addGeojson(geojson, 'tile2');
    
        });
    
        fetch('data/tile3.geojson').then(function(res){
            return res.json();
        }).then(function(geojson){
    
            addGeojson(geojson, 'tile3');
    
        });            
    } */
    
    
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
                'line-color': ['case', ['==', ['get', 'gender'], 'Female'], '#76ef0a', '#FFA463'],
                "line-width": ['case', ['==', ['get', 'gender'], 'Female'], 6, 4],
            }
        });
    
        map.on('click', `${sourcename}`, function (e) {
            //var coordinates = e.features[0].geometry.coordinates.slice(1);
            var link = e.features[0].properties.wikipedia_link;
            var name = e.features[0].properties.name;
            var gender = e.features[0].properties.gender;
    
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
    /*         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            } */
    
            var html = '<div><p>'+name+'</p><p>'+gender+'</p></div>';
            if (gender === 'Female'){
                html = '<div><p>'+name+'</p><p>'+gender+'</p> <p><a target="_blank" href=\''+link+'\'>Wikipedia info</a></p></div>';
            }
            
    
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map);
        });    
    
    }


    $(".nombre-ciudad").hover(function(){
        $(this).css("background-color", "#243342");
        }, function(){
        $(this).css("background-color", "");
    });

    /*CLICK EVENTS*/

    $("#barcelona" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        map.flyTo({
            center: centerList.barcelona
        }); 

    });

    $("#asuncion" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        map.flyTo({
            center: centerList.asuncion
        }); 
    });
    
    $("#buenosaires" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        map.flyTo({
            center: centerList.buenosaires
        });
    });
    
    $("#lima" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        map.flyTo({
            center: centerList.lima
        });
    });
    
    $("#montevideo" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        map.flyTo({
            center: centerList.montevideo
        });
    });
    
    $("#cochabamba" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        map.flyTo({
            center: centerList.cochabamba
        });
    });    

}


window.onload = function() {
   // var myInitMap = initMap();
    //myInitMap();
    initMap();
};

