let spaceShips = "<div width='45vw'<ul id='spaceships' width='100vw' float='right'><li color='pink'>Tesla spaceships</li><li display='inline'>PT Cruiser spaceships</li><li>Kanye spaceships</li>" +
    "<li display='none'>Microsoft spaceships</li><li>Cardboard spaceships</li></ul></div>";
let spaceShips2 = "<div width='45vw'<table height='100px' width='100vw' ><tr><td>Cinnamon Buns<td><td>Pretzels<td>" +
    "</tr><tr><td>Croissants</td><td>Banana Bread</td></tr></table></div>"
let spaceShipImages = "<img src='../images/icons/astronaut.svg' width='100px' height='100px' position='absolute' right='0'>"
let spaceShipImages2 = "<img src='../images/BottomFeatures/astronaut.png' height='100px' width='100px'>"
let spaceShipImages3 = "<img src='../images/BottomFeatures/astronaut2.png' height='100px' width='100px'>"
let spaceShipImages4 = "<img src='../images/BottomFeatures/astronaut3.png' height='100px' width='100px'>"
let spaceShipImages5 = "<img src='../images/BottomFeatures/astronaut4.svg' height='100px' width='100px'>"
let spaceShipImages6 = "<img src='../images/BottomFeatures/astronaut5.svg' height='100px' width='100px'>"
let spaceShipImages7 = "<img src='../images/BottomFeatures/astronaut6.svg' height='100px' width='100px'>"
let spaceShipImages8 = "<img src='../images/BottomFeatures/astronaut7.svg' height='100px' width='100px'>"
let spaceShipImages9 = "<img src='../images/BottomFeatures/astronaut8.svg' height='100px' width='100px'>"
let spaceShipImages10 = "<img src='../images/BottomFeatures/astronaut9.svg' height='100px' width='100px'>"
let spaceShipImages11 = "<img src='../images/BottomFeatures/astronaut10.svg' height='100px' width='100px'>"



//JSON
let jsonSpaceship = [{
        planet1: "Moon",
        planet2: "Mercury",
        planet3: "Venus",
        planet4: "Mars",
        planet5: "Jupiter"
    },
    {
        planet1: "Saturn",
        planet2: "Uranus",
        planet3: "Neptune",
        planet4: "Pluto",
        planet5: "Ceres"
    },
    {
        planet1: "Haumea",
        planet2: "Eris",
        planet3: "Makemake",
        planet4: "Nessus",
        planet5: "Chiron"
    },
    {
        planet1: "Asbolus",
        planet2: "Chariklo",
        planet3: "Hylonome",
        planet4: "Elatus",
        planet5: "Thereus"
    }];

let jsonNASA = [
    {
        name: "Falcon 9",
        price: "62 million",
        color: "white",
        weight: "22800 kg",
        mars: "qualified"
    },
    {
        name: "Falcon Heavy",
        price: "90M",
        color: "White",
        weight: "63800 kg",
        mars: "qualified"
    },
    {
        name : "Dragon",
        price: "infinite",
        color: "White/black",
        weight: "6000 kg",
        mars: "no"
    },
    {
        name: "Starship",
        price: "Too much",
        color: "Silver",
        weight: "100 ton capacity",
        mars: "no"
    },
    {
        name: "Hubble Space Telescope",
        price: "10 Billion",
        color: "Tin foil",
        weight: "11100 kg",
        mars: "no"
    },
    {
        name: "Curiosity",
        price: "2.5 Billion",
        color: "Mars Colour",
        weight: "899 kg",
        mars: "yes"
    }];



module.exports = {
    getSpaceships: function () {
        console.log("called: getSpaceships");
        return spaceShips;
    },
    getSpaceships2: function () {
        console.log("called: getSpaceships2");
        return spaceShips2;
    },
    getSpaceshipImages: function() {
        console.log("called: getSpaceship Images");
        let randomNum = Math.floor((Math.random() * 12) + 1);
        switch (randomNum) {
            case 1:
                return spaceShipImages;
                break;
            case 2:
                return spaceShipImages2;
                break;
            case 3:
                return spaceShipImages3;
                break;
            case 4:
                return spaceShipImages4;
                break;
            case 5:
                return spaceShipImages5;
                break;
            case 6:
                return spaceShipImages6;
                break;
            case 7:
                return spaceShipImages7;
                break;
            case 8:
                return spaceShipImages8;
                break;
            case 9:
                return spaceShipImages9;
                break;
            case 10:
                return spaceShipImages10;
                break;
            case 11:
                return spaceShipImages11;
                break;
            default:
                return spaceShipImages;
                break;
        }
    }, 
    getJSONSpaceship: function () {
        console.log("Called JSON Spaceship");
        return jsonSpaceship;
    },
    getNASA: function() {
        console.log("Called getNASA");
        return jsonNASA;
    }

};