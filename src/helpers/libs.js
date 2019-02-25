const helpers = {};

//Creando un numero aleatorio para usarlo en image.js
//asi le ponemos un numero de id a la imagen que suban
helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomNumber = 0;
    for(let i = 0; i < 6; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber;
};

module.exports =  helpers;   