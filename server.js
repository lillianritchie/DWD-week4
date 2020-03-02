// require express, path, and file system
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

//declare app as express
const app = express();

app.use(express.static("public"));
app.use(express.json());
// 4. define your middleware: request handling
app.use(bodyParser.urlencoded({
    extended: true
  }));


//set up my main page at /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//set up my ingredients page at /ingredients
app.get("/ingredients", (req,res) => {
    res.sendFile(path.join(__dirname, "public/ingredients.html"));
});

app.get("/smoothie", (req,res) => {
    smoothie = getIngredients();
    res.json(smoothie);
})

//function to look up all fruit
function getIngredients() {
    const contents = fs.readFileSync(path.join(__dirname, "./db/smoothie.json"));
   const obj = JSON.parse(contents);
    return obj;
  }
//funct to add a fruit
function addIngredient(ingredient) {
    const ingredients = getIngredients();
    //push updates to the original array
    console.log("consolelog 1: "+ ingredients.fruit);
    //ingredients.fruit.push(ingredient.fruit);
    //console.log(ingredients[0]); 
    //console.log(ingredients[0][0]);
    //ingredients[0].push(ingredient[0][0]);
    console.log("consolelog 2: "+ ingredients.fruit);
    
    fs.writeFileSync(path.join(__dirname, "./db/smoothie.json"), JSON.stringify(ingredients));
    return ingredients;

}
//funct to remove a fruit
function deleteIngredient(ingredientToDelete) {
    const ingredients = getIngredients();
    //filter does NOT change the original array
    ingredients.fruit = ingredients.fruit.filter(ingredient => ingredient !== ingredientToDelete);
    fs.writeFileSync(path.join(_dirname, "./db/smoothie.json"), JSON.stringify(ingredients));
    return ingredients;
}

//post addition to server
app.post("/smoothie", (req, res) => {
    console.log(req.body);
    const ingredient = req.body.ingredient;
    console.log("ingredient = " + ingredient);
    const ingredients = addIngredient(ingredient);
    res.json(ingredients);
})

//delete fruit from the server
app.delete("/smoothie/:name", (req, res) => {
    const ingredientToDelete = req.params.name;
    const ingredients = deleteIngredient(ingredientToDelete);
    res.json(ingredients);
});


//open the server on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
})
