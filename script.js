const container = document.querySelector('div.container');
drawGrid(16);

const resizeButton = document.querySelector('button');
resizeButton.addEventListener('click', resizeGrid);

const eraser = document.querySelector('#eraser');
let drawFlag = true;

eraser.addEventListener('click', function () {
    if (!drawFlag) {
        eraser.style.filter = 'invert(0)';
    } else {
        eraser.style.filter = 'invert(1)';
    }
    drawFlag = !drawFlag;
});

const rainbow = document.querySelector('#rainbow');
let rainbowFlag = false;

rainbow.addEventListener('click', function () {
    if (rainbowFlag) {
        rainbow.setAttribute('src', 'images/rainbow-colorless.png');
    } else {
        rainbow.setAttribute('src', 'images/rainbow.png');
    }
    rainbowFlag = !rainbowFlag
});

const gradient = document.querySelector('#gradient');
let gradientFlag = false;

gradient.addEventListener('click', function () {
    if (gradientFlag) {
        gradient.style.filter = 'invert(0)';
    } else {
        gradient.style.filter = 'invert(1)';
    }
    gradientFlag = !gradientFlag;
});

const colorInput = document.querySelector('#colorInput');

colorInput.addEventListener('click', function () {
    rainbowFlag = false;
    rainbow.setAttribute('src', 'images/rainbow-colorless.png');
    drawFlag = true;
    eraser.style.filter = 'invert(0)';
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
    if (event.buttons === 1 && !drawFlag) {
        this.style.backgroundColor = '';
    }
}

function colorize(event) {
    event.preventDefault();
    if (event.buttons === 1 && drawFlag) {
        let newColor;
        if (rainbowFlag) {
            newColor = getRandomColor();
        } else {
            newColor = hexToRGB(colorInput.value);
        }
        if (gradientFlag) {
            if (isRGBA(this.style.backgroundColor)) {
                newColor = increaseRGBAAlphaChanel(this.style.backgroundColor);
            } else if (this.style.backgroundColor) {
                newColor = this.style.backgroundColor;
            } else {
                newColor = newColor.replace(')', ', 0.1)').replace('rgb', 'rgba');
            }
        }
        this.style.backgroundColor = newColor;
    }
}

function isRGBA(colorValue) {
    const rgbaReg = /^rgba\((\d+), (\d+), (\d+), ([\d\.]+)/;
    return rgbaReg.test(colorValue);
}

function increaseRGBAAlphaChanel(rgbaColor) {
    const rgbaReg = /^rgba\((\d+), (\d+), (\d+), ([\d\.]+)/;
    const matched = rgbaColor.match(rgbaReg);
    if (matched) {
        let red = matched[1];
        let green = matched[2];
        let blue = matched[3];
        let alphaChannel = parseFloat(matched[4]) + 0.1;
        return `rgba(${red}, ${green}, ${blue}, ${alphaChannel})`;
    }
    return '';
}

function hexToRGB(hexColor) {
    const hexColorReg = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/;
    const matched = hexColor.match(hexColorReg);
    if (matched) {
        let red = parseInt(`0x${matched[1]}`, 16);
        let green = parseInt(`0x${matched[2]}`, 16);
        let blue = parseInt(`0x${matched[3]}`, 16);
        return `rgb(${red}, ${green}, ${blue})`;
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
