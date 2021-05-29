// Varíaveis Globais
let selectedColor;
window.addEventListener('load', () => {
    selectedColor = "#323236";
})

// Customizações CSS
const main = document.querySelector('main');
main.style.width = `calc(100vw - 306.64px)`

// Renderização dos Pixels

let container = main.querySelector('.container');
let pixel = container.querySelector('.pixel');

for (let i = 0; i < 1024; i++) {
    let pixelCloned = pixel.cloneNode(true);
    container.appendChild(pixelCloned);
}

// Mensagem de execução
let header = document.querySelector('header');
let sucessMessage = document.querySelector('header h2');
let messages = [
    'Modo desenhar selecionado',
    'Modo borracha selecionado',
    'Modo pintar selecionado',
];

// Funcionabilidades
const writePixel = (e) => {
    let target = e.target;
    target.style.backgroundColor = selectedColor;
    target.classList.add('marked');
}

const removePixel = (e) => {
    let target = e.target;
    target.style.backgroundColor = 'transparent';
}

const fill = (e) => {
    let target = e.target;
    allPixels.forEach(item => {
        if (!item.matches('.marked')) {
            item.style.backgroundColor = selectedColor;
        }
    })
}

// Capturar cor
let inputColor = document.querySelector('#color');
let colorDisplay = document.querySelector('.colors h2');
inputColor.addEventListener('input', () => {
    colorDisplay.style.color = inputColor.value;
    selectedColor = inputColor.value;
});

// Paleta de cores
let saveColor = document.querySelector('#save-color');
let listPallete = document.querySelector('.list');

saveColor.addEventListener('click', addSavedColor);

function addSavedColor(e) {
    let colorElement = `
        <div style="background-color: ${selectedColor}"></div>
    `;
    listPallete.innerHTML += colorElement;
    let listPalleteDivs = document.querySelectorAll('.list div');
    listPalleteDivs.forEach(item => {
        item.addEventListener('click', () => {
            selectedColor = `${item.style.backgroundColor}`;
        })
    })
}

// Remover pixelado
let removeGrade = document.querySelector('#remove-pixel');
removeGrade.addEventListener('click', () => {
    let teste = container.querySelectorAll('.pixel');
    teste.forEach(item => {
        item.classList.toggle('grade-pixel');
    })
})

// Executar os comandos
let allPixels = document.querySelectorAll('.pixel');
let designButton = document.querySelector('#design');
let removeButton = document.querySelector('#rubber');
let fillButton = document.querySelector('#fill');


designButton.addEventListener('click', () => {
    header.style.backgroundColor = `${selectedColor}`;
    sucessMessage.textContent = messages[0];
    header.style.display = "block";
    setTimeout(() => {
        header.style.display = "none";
    }, 2000);
    container.style.cursor = 'cell';
    allPixels.forEach(item => {
        item.removeEventListener('click', removePixel);
        item.removeEventListener('click', fill);
        item.addEventListener('click', writePixel);
    })
});

removeButton.addEventListener('click', () => {
    header.style.backgroundColor = `${selectedColor}`;
    sucessMessage.textContent = messages[1];
    header.style.display = "block";
    setTimeout(() => {
        header.style.display = "none";
    }, 2000);
    container.style.cursor = 'grabbing';
    allPixels.forEach(item => {
        item.removeEventListener('click', writePixel);
        item.removeEventListener('click', fill);
        item.addEventListener('click', removePixel);
    })
});

fillButton.addEventListener('click', () => {
    header.style.backgroundColor = `${selectedColor}`;
    sucessMessage.textContent = messages[2];
    header.style.display = "block";
    setTimeout(() => {
        header.style.display = "none";
    }, 2000);
    container.style.cursor = 'grabbing';
    allPixels.forEach(item => {
        item.removeEventListener('click', writePixel);
        item.removeEventListener('click', removePixel);
        item.addEventListener('click', fill);
    });
});

// Funções por tecla

function getKeyCode(e) {
    if (e.code == "KeyJ") { // Desenho
        header.style.backgroundColor = `${selectedColor}`;
        sucessMessage.textContent = messages[0];
        header.style.display = "block";
        setTimeout(() => {
            header.style.display = "none";
        }, 2000);
        container.style.cursor = 'cell';
        allPixels.forEach(item => {
            item.removeEventListener('click', removePixel);
            item.removeEventListener('click', fill);
            item.addEventListener('click', writePixel);
        });
    } else if (e.code == "KeyK") { // Borracha
        header.style.backgroundColor = `${selectedColor}`;
        sucessMessage.textContent = messages[1];
        header.style.display = "block";
        setTimeout(() => {
            header.style.display = "none";
        }, 2000);
        container.style.cursor = 'grabbing';
        allPixels.forEach(item => {
            item.removeEventListener('click', writePixel);
            item.removeEventListener('click', fill);
            item.addEventListener('click', removePixel);
        })
    } else if (e.code == "KeyL") { // Pintar
        header.style.backgroundColor = `${selectedColor}`;
        sucessMessage.textContent = messages[2];
        header.style.display = "block";
        setTimeout(() => {
            header.style.display = "none";
        }, 2000);
        container.style.cursor = 'grabbing';
        allPixels.forEach(item => {
            item.removeEventListener('click', writePixel);
            item.removeEventListener('click', removePixel);
            item.addEventListener('click', fill);
        });
    }
}

document.addEventListener('keydown', getKeyCode);