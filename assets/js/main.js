import generateCoordParagraph from './controls.js';

///letIABLES///

let modoSeleccion = false; //Esta letiable se encarga de actilet el modo
let pinColor;

let wwd = new WorldWind.WorldWindow("canvasOne");
wwd.navigator.range = 25e6//distancia a la elipse
wwd.redraw();

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.AtmosphereLayer());
wwd.addLayer(new WorldWind.StarFieldLayer());
console.log(WorldWind);

//Atributos marcador
let placemarkLayer = new WorldWind.RenderableLayer();
wwd.addLayer(placemarkLayer);

///METODOS///
//Detector del click del usuario en el mapa
let clickRecognizer = new WorldWind.ClickRecognizer(wwd,
    function (recognizer) {
        console.log("bandera" + modoSeleccion);
        //Primero miramos si esta activado el modo selector punto
        if (modoSeleccion) {
            let x = recognizer.clientX; //letiable contiene primero la coordenada x y despues de la conversion la longitud
            let y = recognizer.clientY; //letiable contiene primero la coordenada y y despues de la conversion la latitud

            //Recuperamos las coordenadas del raton en el canvas
            let pickList = wwd.pick(wwd.canvasCoordinates(x, y));

            //Convertimos las coordenadas del raton a longitud y latitud
            if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
                let position = pickList.objects[0].position;
                console.log("latitude: " + position.latitude); //NS/Y
                console.log("altitude: " + position.longitude); //EO/X
                x = position.longitude;
                y = position.latitude;
            }

            let posicionPunto = new WorldWind.Position(y, x, 100.0);


            // Creando una nueva instancia con los las propiedades cambiadas
            let placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
            placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + 'images/pushpins/plain-'+pinColor+'.png';
            
            placemarkAttributes.imageOffset = new WorldWind.Offset(
                WorldWind.OFFSET_FRACTION, 0.3,
                WorldWind.OFFSET_FRACTION, 0.0);
            
            placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
            placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                WorldWind.OFFSET_FRACTION, 0.5,
                WorldWind.OFFSET_FRACTION, 1.0);


            let placemark = new WorldWind.Placemark(posicionPunto, false, placemarkAttributes);


            placemark.label = document.getElementById("coordName").value;
            
            placemark.alwaysOnTop = true;

            generateCoordParagraph();

            placemarkLayer.addRenderable(placemark);

            wwd.redrawRequested = true;
            modoSeleccion = false;
        }
    });

export default function createPoint(color) {
    modoSeleccion = true;
    pinColor = color;
}