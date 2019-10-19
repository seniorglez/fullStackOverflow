import { birthRate } from "./csv.js";

var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.AtmosphereLayer());


//ShapeFiles
var shapeConfigurationCallback = function (attributes, record) {
    var configuration = {};
    configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

    if (record.isPointType()) { // Configure point-based features (cities, in this example)
        configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

        configuration.attributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);

        if (attributes.values.pop_max) {
            var population = attributes.values.pop_max;
            configuration.attributes.imageScale = 0.01 * Math.log(population);
        }
    } else if (record.isPolygonType()) { // Configure polygon-based features (countries, in this example).
        configuration.attributes = new WorldWind.ShapeAttributes(null);

        let data = birthRate.split("\n");
        let currentRate;

        data.forEach(element => {
           if(element.split(",")[0] === record.attributes.values.name)
           {
               currentRate = parseInt(element.split(",")[1]);
               console.log(currentRate + " " + map_range(currentRate, 0, 50, 0, 255));
           } 
        });



        configuration.attributes.interiorColor = new WorldWind.Color(
            map_range(currentRate, 0, 50, 0, 255),
            0,
            0,
            1.0
        );

        // Paint the outline in a darker variant of the interior color.
        configuration.attributes.outlineColor = new WorldWind.Color(
            0,
            0,
            0,
            1.0);
    }

    return configuration;
};


//Countries layer
let shapefileLibrary = "https://worldwind.arc.nasa.gov/web/examples/data/shapefiles/naturalearth";

let worldLayer = new WorldWind.RenderableLayer("Countries");
let worldShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp");
worldShapefile.load(null, shapeConfigurationCallback, worldLayer);
wwd.addLayer(worldLayer);

function map_range(value, low1, high1, low2, high2) 
{
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

