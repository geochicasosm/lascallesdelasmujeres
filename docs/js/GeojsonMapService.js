function GeojsonMapService(){

    //this.map = map;
    this.urlData = 'https://raw.githubusercontent.com/betCG/lascallesdelasmujeres/master';

    this.loadGeojson = function(map, folder, isMobile, coords){    
    
        fetch(this.urlData+ '/data/'+folder+'/final_tile.geojson').then(function(res){
            return res.json();
        }).then(addGeojsonSource.bind(this, map, isMobile, coords));

        
   
    };

    this.loadGeojsonTiles = function(map, tilecount, folder){    
    
        for(var i=0; i<tilecount; i++){
    
            fetch(this.urlData+ '/data/'+folder+'/final_tile'+i+'.geojson').then(function(res){
                return res.json();
            }).then(addGeojsonSource.bind(this, map));
        }    
    };

    function addGeojsonSource(map, isMobile, coords, geojson, sourcename = Date.now()){
           
        const widthFemale = isMobile ? 5 : 4;
        const widthMale = isMobile ? 4 : 3;

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
                "line-blur": ['case', ['==', ['get', 'wikipedia_link'], ''], 4, 1],
                'line-color': ['case', ['==', ['get', 'gender'], 'Female'], '#ffca3a', '#00B99E'],
                "line-width": ['case', ['==', ['get', 'gender'], 'Female'], widthFemale, widthMale],
            }
        });

        var popupClick = new mapboxgl.Popup();
        var popupHover = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
    
        map.on('click', `${sourcename}`, function (e) {

            popupHover.remove();
            
            var link = e.features[0].properties.wikipedia_link;
            var name = e.features[0].properties.name;
            var gender = e.features[0].properties.gender;
    
            var color = "#0e9686f2";

            var html = '<div class="row">'+
                        '<div class="col-sm">'+
                            '<div class="popup-male"><p>'+name+'</p></div>'+
                        '</div>'+
                    '</div>';

            if (gender === 'Female'){
                color = "#ffca3af2";

                var txtLink = '<p class=""><a  class="btn btn-light" target="_blank" href=\''+link+'\'><i class="fab fa-wikipedia-w"></i></a></p>';
                if(link === ''){
                    txtLink = '<p class=""><a  class="btn btn-light disabled" target="_blank" href=\''+link+'\'><i class="fab fa-wikipedia-w"></i></a></p>'+
                    '<span class="badge badge-secondary"><i class="fas fa-exclamation"></i>&nbsp;Calle sin artículo</span>';
                }

                html = '<div class="row">'+
                            '<div class="col-sm">'+
                                '<div class="popup-female">'+
                                    '<p>'+name+'</p>'+
                                    txtLink+
                                '</div>'+
                            '</div>'+
                        '</div>';

                //html = '<div class="popup-female"><p>'+name+'</p><p>( mujer )</p> <p><a target="_blank" href=\''+link+'\'><img src="./css/images/wikipedia.svg"/></a></p></div>';
            }
            
            popupClick.setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map);
            const popUpContent = document.getElementsByClassName("mapboxgl-popup-content");
            if(popUpContent.length !== 0) popUpContent[0].style.backgroundColor = color;                            
        });        

    
        if(!isMobile){
            map.on('mouseenter', `${sourcename}`, function(e) {

                popupClick.remove();
                map.getCanvas().style.cursor = 'pointer';
    
                var link = e.features[0].properties.wikipedia_link;
                var name = e.features[0].properties.name;
                var gender = e.features[0].properties.gender;
    
                var color = "#0e9686f2";
    
                var html = '<div class="row">'+
                            '<div class="col-sm">'+
                                '<div class="popup-male"><p>'+name+'</p></div>'+
                            '</div>'+
                        '</div>';
    
                if (gender === 'Female'){
                    color = "#ffca3af2";
    
                    var txtLink = '<p class=""><a  class="btn btn-light" target="_blank" href=\''+link+'\'><i class="fab fa-wikipedia-w"></i></a></p>';
                    if(link === ''){
                        txtLink = '<p class=""><a  class="btn btn-light disabled" target="_blank" href=\''+link+'\'><i class="fab fa-wikipedia-w"></i></a></p>'+
                        '<span class="badge badge-secondary"><i class="fas fa-exclamation"></i>&nbsp;Calle sin artículo</span>';
                    }
    
                    html = '<div class="row">'+
                                '<div class="col-sm">'+
                                    '<div class="popup-female">'+
                                        '<p>'+name+'</p>'+
                                        txtLink+
                                    '</div>'+
                                '</div>'+
                            '</div>';
    
                    //html = '<div class="popup-female"><p>'+name+'</p><p>( mujer )</p> <p><a target="_blank" href=\''+link+'\'><img src="./css/images/wikipedia.svg"/></a></p></div>';
                }        
    
                popupHover.setLngLat(e.lngLat)
                    .setHTML(html)
                    .addTo(map);
                const popUpContent = document.getElementsByClassName("mapboxgl-popup-content");
                if(popUpContent.length !== 0) popUpContent[0].style.backgroundColor = color;
            });
    
            map.on('mouseleave', `${sourcename}`, function() {
                map.getCanvas().style.cursor = '';
                popupHover.remove();
            });
        }

        addAnimatedPoint(map, sourcename+'_point', sourcename+'_point', coords);
        
    }

    function addAnimatedPoint(map, sourcename, layername, coords = [0, 0]) {

        var framesPerSecond = 60; 
        var initialOpacity = 1;
        var opacity = initialOpacity;
        var initialRadius = 5;
        var radius = initialRadius;
        var maxRadius = 18;        

        // Add a source and layer displaying a point which will be animated in a circle.
        map.addSource(sourcename, {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": coords
            }
        });
    
        map.addLayer({
            "id": layername,
            "source": sourcename,
            "type": "circle",
            "paint": {
                "circle-radius": initialRadius,
                "circle-radius-transition": {duration: 0},
                "circle-opacity-transition": {duration: 0},
                "circle-color": "#FFCA3A"
            },
            "minzoom": 1,
            "maxzoom": 7
        });
    
        map.addLayer({
            "id": layername+"1",
            "source": sourcename,
            "type": "circle",
            "paint": {
                "circle-radius": initialRadius,
                "circle-color": "#FFCA3A"
            },
            "minzoom": 1,
            "maxzoom": 7
        });
    
    
        function animateMarker(timestamp) {
            
            radius += (maxRadius - radius) / framesPerSecond;
            opacity -= ( 0.9 / framesPerSecond );

            map.setPaintProperty(sourcename, 'circle-radius', radius);
            map.setPaintProperty(sourcename, 'circle-opacity', (opacity<0 ? 0 : opacity));

            if (opacity <= 0) {
                radius = initialRadius;
                opacity = initialOpacity;
            }
            
            requestAnimationFrame(animateMarker);
            
        }
    
        animateMarker(0);
    }     

}
