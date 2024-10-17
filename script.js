const container = document.querySelector('div.container');
drawGrid(16);

const resizeButton = document.querySelector('button');
resizeButton.addEventListener('click', resizeGrid);

const pen = document.querySelector('#pen');
const eraser = document.querySelector('#eraser');
let draw = false;

pen.addEventListener('click', function() {
    pen.style.filter = 'invert(1)';
    eraser.style.filter = 'invert(0)';
    draw = true;
});

eraser.addEventListener('click', function() {
    eraser.style.filter = 'invert(1)';
    pen.style.filter = 'invert(0)';
    draw = false;
});

const rainbow = document.querySelector('#rainbow');
let rainbowFlag = false;

rainbow.addEventListener('click', function() {
    if (rainbowFlag) {
        rainbow.setAttribute('src', 'images/rainbow-colorless.png');
    } else {
        rainbow.setAttribute('src', 'images/rainbow.png');
    }
    rainbowFlag = !rainbowFlag
});

const gradient = document.querySelector('#gradient');
let gradientFlag = false;

gradient.addEventListener('click', function() {
    if (gradientFlag) {
        gradient.style.filter = 'invert(0)';
    } else {
        gradient.style.filter = 'invert(1)';
    }
    gradientFlag = !gradientFlag;
});

function drawGrid(gridSize) {
    let squareSize = 100 / gridSize;
    console.log(`Square size is ${squareSize}%`);

    for (let i = 0; i < (gridSize * gridSize); i++) {
        const square = document.createElement('div');
        square.className = 'item';
        square.style.width = `${squareSize}%`
        square.addEventListener('mouseover', colorize);
        square.addEventListener('mousedown', colorize);
        square.addEventListener('mouseover', erase);
        square.addEventListener('mousedown', erase);
        container.appendChild(square);
    }

}

function erase(event) {
    event.preventDefault();
    if (event.buttons === 1 && !draw) {
        this.style.backgroundColor = '';
    }
}

function colorize(event) {
    event.preventDefault();
    if (event.buttons === 1 && draw) {
        if (!this.style.backgroundColor) {
            console.log('No color. Setting it ...');
            if (rainbowFlag) {
                this.style.backgroundColor = getRandomColor();
            } else {
                this.style.backgroundColor = "rgb(0, 0, 0)";
            }
            if (gradientFlag) {
                let rgb = this.style.backgroundColor;
                let rgba = rgb.replace(')', ', 0.1)').replace('rgb', 'rgba');
                this.style.backgroundColor = rgba;
            }
        } else if (gradientFlag) {
            const rgbaReg = /^rgba\((\d+), (\d+), (\d+), ([\d\.]+)/;
            console.log(this.style.backgroundColor);
            const matched = this.style.backgroundColor.match(rgbaReg);
            if (matched) {
                let red = matched[1];
                let green = matched[2];
                let blue = matched[3];
                let alphaChannel = parseFloat(matched[4]) + 0.1;
                console.log(alphaChannel)
                this.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alphaChannel})`;
            }
        }
    }
}

function getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function resizeGrid() {
    let gridSize = prompt('How many squares per side would you like?');
    if (gridSize > 0 && gridSize <= 100) {
        removeGrid();
        drawGrid(gridSize);
    } else {
        alert("Can't resize grid! Maximum is 100 squares per side!");
    }
}

function removeGrid() {
    const squares = container.querySelectorAll('div.item');
    for (square of squares) {
        container.removeChild(square);
    }
}
