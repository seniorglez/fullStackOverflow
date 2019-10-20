import {
    birthRate
} from "./csv.js";

// variable canvas
var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.AtmosphereLayer());


/* Functions */
//ShapeFiles
var shapeConfigurationCallback = function (attributes, record) {

    var configuration = {};
    configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

    if (record.isPolygonType()) {
        configuration.attributes = new WorldWind.ShapeAttributes(null);

        let data = birthRate.split("\n");
        let currentRateColors;
        let currentRate;
        let maxNumber = 0;

        data.forEach(element => {
            let currentNumber = parseInt(element.split(",")[1]);
            if (currentNumber > maxNumber) {
                maxNumber = currentNumber;
            }
        });

        data.forEach(element => {
            if (element.split(",")[0] === record.attributes.values.name) {
                currentRate = map_range(parseInt(element.split(",")[1]), 0, maxNumber, 0, 60);
            }
        });
        if (currentRate === undefined) {
            return configuration;
        }
        currentRateColors = color_Map(currentRate);
        //Color between  0 and 1
        configuration.attributes.interiorColor = new WorldWind.Color(
            currentRateColors[0],
            currentRateColors[1],
            currentRateColors[2],
            1.0
        );

        // Paint the outline in a darker variant of the interior color. Fija
        configuration.attributes.outlineColor = new WorldWind.Color(
            0,
            0,
            0,
            1.0);
    }

    return configuration;
};
/* Function to add a layer with the different countrys */
export function create_country_layer() {
    //Countries layer
    let shapefileLibrary = "https://worldwind.arc.nasa.gov/web/examples/data/shapefiles/naturalearth";

    let worldLayer = new WorldWind.RenderableLayer("Countries");
    let worldShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp");
    worldShapefile.load(null, shapeConfigurationCallback, worldLayer);
    wwd.addLayer(worldLayer);
}

/* Function to remap the numbers in a range to another range */
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

/* Function for color map with number.*/
function color_Map(number) {
    let purple = [0.19, 0.00, 0.40];
    let darkBlue = [0.00, 0.00, 0.80];
    let blue = [0.00, 0.40, 1.00];
    let green = [0.00, 0.80, 0.00];
    let yellow = [1.00, 0.80, 0.19];
    let orange = [1.00, 0.40, 0.00];

    if (number > 0 && number <= 10) {
        return purple;
    } else if (number > 10 && number <= 20) {
        return darkBlue;
    } else if (number > 20 && number <= 30) {
        return blue;
    } else if (number > 30 && number <= 40) {
        return green;
    } else if (number > 40 && number <= 50) {
        return yellow;
    } else if (number > 50 && number <= 60) {
        return orange;
    }
}

create_country_layer();