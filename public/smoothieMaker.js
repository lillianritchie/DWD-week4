const fs = require('fs');
const path = require('path');

//save arrays in variables
const contents = fs.readFileSync(path.join(__dirname, "./db/smoothie.json"));
const obj = JSON.parse(contents);
const fruit = obj.fruit;
const liquid = obj.liquid;
const protein = obj.protein;
const extra = obj.extra


//pick a random ingredient from each list
function getFruit(fruit) {
    return fruit[Math.floor(Math.random()*fruit.length)]
}
function getLiquid(liquid) {
    return liquid[Math.floor(Math.random()*liquid.length)]
}
function getProtein(protein) {
    return protein[Math.floor(Math.random()*protein.length)]
}

function getExtra(extra){
    return extra[Math.floor(Math.random()*extra.length)]
}

const fruit1 = getFruit(fruit);
const fruit2 = getFruit(fruit);
const liquidPick = getLiquid(liquid);
const proteinPick = getProtein(protein);
const extraPick = getExtra(extra);

console.log(`my smoothie = ${fruit1}, ${fruit2}, ${liquidPick}, ${proteinPick}, and some ${extraPick}`)