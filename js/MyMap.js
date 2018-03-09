function MyMap(){

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvc3RhcnRlcnMiLCJhIjoiMGNxekwxayJ9.sE1YC8Zxwzjh4CQeZiZN_g';
    this.mapDarkStyle = 'mapbox://styles/mapbox/dark-v9';
    this.initCenter = [	-39.11133, 36.66842];

    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: this.mapDarkStyle, // stylesheet location
        center: this.initCenter, // lng, lat]
        zoom: 1 
    });

    this.mapTo = function(center, zoom = 13){
        this.map.flyTo({
            center: center, //this.constats.centerList.barcelona,
            zoom: zoom
        });        
    }; 

}