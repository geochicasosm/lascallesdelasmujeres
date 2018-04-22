function MyMap(){

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvY2hpY2Fzb3NtIiwiYSI6ImNqZXZ6ODBjaDBpYnUyd3B1eHkzdXp4aWIifQ.l2fZ1UWWPwQHVbhH24064A';
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