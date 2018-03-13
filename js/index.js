

function initApp(){

   const constats = new Constants();
   const geojsonMapService = new GeojsonMapService();
   const chartService = new ChartService();
   const myMap = new MyMap();
           
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'barcelona'));
   myMap.map.on('load', geojsonMapService.loadGeojsonTiles(myMap.map, 9, 'buenosaires'));
   myMap.map.on('load', geojsonMapService.loadGeojsonTiles(myMap.map, 12, 'cochabamba'));
   myMap.map.on('load', geojsonMapService.loadGeojsonTiles(myMap.map, 9, 'asuncion'));
   myMap.map.on('load', geojsonMapService.loadGeojsonTiles(myMap.map, 12, 'montevideo'));

  
    $("#ciudades-list .nombre-ciudad, #menu-list a").hover(function(){
        $(this).css("background-color", "#243342");
        }, function(){
        $(this).css("background-color", "");
    });
    
    /*CLICK EVENTS*/
    $("#barcelona" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        myMap.mapTo(constats.centerList.barcelona);        
        chartService.loadChart(constats.datos.barcelona, 'Barcelona');  
    });
    $('#menu-barcelona').click(function() {        
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        $(".navbar-collapse").removeClass("show");

        myMap.mapTo(constats.centerList.barcelona);        
        chartService.loadChart(constats.datos.barcelona, 'Barcelona');  
    });
   

    $("#asuncion" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.asuncion);        
        chartService.loadChart(constats.datos.asuncion, 'Asunción'); 
    });
    $('#menu-asuncion').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.asuncion);        
        chartService.loadChart(constats.datos.asuncion, 'Asunción'); 
        $(".navbar-collapse").removeClass("show");
    });
 
    
    $("#buenosaires").click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.buenosaires);        
        chartService.loadChart(constats.datos.buenosaires, 'Buenos Aires');     
    });
    $('#menu-buenosaires').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        $(".navbar-collapse").removeClass("show");
        myMap.mapTo(constats.centerList.buenosaires);        
        chartService.loadChart(constats.datos.buenosaires, 'Buenos Aires');         
    });

    $("#cochabamba" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.cochabamba);        
        chartService.loadChart(constats.datos.cochabamba, 'Cochabamba'); 
    });
    $('#menu-cochabamba').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.cochabamba);        
        chartService.loadChart(constats.datos.cochabamba, 'Cochabamba');      
        $(".navbar-collapse").removeClass("show");
    });
     
    
    $("#lima" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.lima);        
        chartService.loadChart(constats.datos.lima, 'Lima');  

    });
    $('#menu-lima').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.lima);        
        chartService.loadChart(constats.datos.lima, 'Lima');  
        $(".navbar-collapse").removeClass("show");
    });
 
    
    $("#montevideo" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        myMap.mapTo(constats.centerList.montevideo);        
        chartService.loadChart(constats.datos.montevideo, 'Montevideo'); 
    });
    $('#menu-montevideo').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.montevideo);        
        chartService.loadChart(constats.datos.montevideo, 'Montevideo'); 
        $(".navbar-collapse").removeClass("show");
    });
       
}



window.onload = function() {
    var myApp = initApp;
    myApp();

};

