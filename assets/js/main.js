///VARIABLES///
var modoSeleccion = false;//Esta variable se encarga de activar el modo

var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

//Atributos marcador
var placemarkLayer = new WorldWind.RenderableLayer();
wwd.addLayer(placemarkLayer);


var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);

placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

///METODOS///
//Detector del click del usuario en el mapa
var clickRecognizer = new WorldWind.ClickRecognizer(wwd, 
    function(recognizer) {
        console.log("bandera" + modoSeleccion);
        //Primero miramos si esta activado el modo selector punto
        if (!modoSeleccion) {
            var x = recognizer.clientX;//variable contiene primero la coordenada x y despues de la conversion la longitud
            var y = recognizer.clientY;//variable contiene primero la coordenada y y despues de la conversion la latitud

            //Recuperamos las coordenadas del raton en el canvas
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

            //Convertimos las coordenadas del raton a longitud y latitud
            if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
                var position = pickList.objects[0].position;
                console.log("latitude: " + position.latitude);//NS/Y
                console.log("altitude: " + position.longitude);//EO/X
                x = position.longitude;
                y = position.latitude;
            }

            var posicionPunto = new WorldWind.Position(y, x, 100.0);
            var placemark = new WorldWind.Placemark(posicionPunto, false, placemarkAttributes);
            
            //placemark.label = document.getElementById("coordName").value;
            placemark.label = "prueba";
            //Cargarlo siempre en la capa superior del camvas
            placemark.alwaysOnTop = true;

            placemarkLayer.addRenderable(placemark);

            
            
            console.log("generado");

            modoSeleccion = false;
        }
});

export default function selectPoint() {
    modoSeleccion = true;
}