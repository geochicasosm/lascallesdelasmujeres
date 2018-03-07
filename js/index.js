

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvc3RhcnRlcnMiLCJhIjoiMGNxekwxayJ9.sE1YC8Zxwzjh4CQeZiZN_g';

function initMap(){

    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/geostarters/cj0wc7qhm00rt2rny75ogya88', // stylesheet location
        center: [2.154007, 41.390205], // starting position [lng, lat]
        zoom: 12 // starting zoom
    });
    
    
    map.on('load', loadGeojsonBarcelona());
    
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
    
    function loadGeojson(e) {
    
    
        
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

}


window.onload = function() {
   // var myInitMap = initMap();
    //myInitMap();
    initMap();
};

