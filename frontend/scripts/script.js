var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt, {
    keypad: false,
    expressions: false,
    // settingsMenu: false,
    zoomButtons: false,
    showGrid: false,
    showXAxis: false,
    showYAxis: false,
    xAxisNumbers: false,
    yAxisNumbers: false
});

let img = Jimp.read("./assets/creeper.png").then(processImg);

function rgbToHex(obj) {
    return "#" + (1 << 24 | obj.r << 16 | obj.g << 8 | obj.b).toString(16).slice(1);
}

function processImg(img) {
    const IMG_HEIGHT = img.getHeight();
    const IMG_WIDTH = img.getWidth();

    console.log('WIDTH: ', IMG_WIDTH);
    console.log('HEIGHT: ', IMG_HEIGHT);

    for (let y = 0; y < IMG_HEIGHT; y++) {
        for (let x = 0; x < IMG_WIDTH; x++) {
            pixelColorRGBA = Jimp.intToRGBA(img.getPixelColor(x, y));
            pixelColorHex = rgbToHex(pixelColorRGBA);

            graphX = x - Math.floor(IMG_WIDTH / 2);
            graphY = y - Math.floor(IMG_HEIGHT / 2);

            corners = {
                topleft: `(${graphX},${-graphY})`,
                topright: `(${graphX + 1},${-graphY})`,
                bottomright: `(${graphX + 1},${-graphY - 1})`,
                bottomleft: `(${graphX},${-graphY - 1})`
            };

            exp = {
                latex: `\\polygon(${Object.values(corners).join(',')})`,
                fill: false,
                color: pixelColorHex,
                fillOpacity: pixelColorRGBA.a / 255
            };
            calculator.setExpression(exp);
        }
    }
}