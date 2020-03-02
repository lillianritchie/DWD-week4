//event listener for the dom being loaded
window.addEventListener("DOMContentLoaded", () => {
    //look up the unordered list we declared in html
    const fruitsList = document.getElementById("fruits-list");
    //get the toppings from our json, then reformat it as individual data items
    fetch("/smoothie").then(res => res.json()).then((data) => {
      //and add each item to the list
      fruitsList.innerHTML = FruitsList(data.fruit);
    });
    //look up your input form
    const fruitForm = document.getElementById("fruit-form");
    //an event parameter with an event parameter "e"
    fruitForm.onsubmit = (event) => {
      //prevent the page from refreshing on submission
      event.preventDefault();
      //look up the value that was submitted and save it to a value
      const fruitInput = event.target.elements["fruit"];
      //save the string value to a new variable
      const fruit = fruitInput.value;
      //reset the input value
      fruitInput.value = "";
      //use fetch to post the values to our json
      fetch("/smoothie",
        { method: "POST",
          body: JSON.stringify({fruit: fruit}),
          headers: {
            'Content-Type': 'application/json'
          },
          //ASK A QUESTION ABOUT WHAT THIS DOES
        }).then(res => res.json()).then((data) => {
          fruitsList.innerHTML = FruitsList(data.fruit);
        });
    }
  });
  
  //go through the array of toppings and return each fruit as a list item with a remove button
  function FruitsList(fruits) {
    return fruits.map((fruit) => {
      return `<li data-fruit="${fruit}">
                <span>${fruit}</span>
                <button onclick="removeFruit(event)">Remove</button>
              </li>`;
    }).join("");
  }
  
  //Write a function called removeFruit, which accesses the fruit by event.target.parentElement.dataset.fruit
  function removeFruit(event) {
    const fruitsList = document.getElementById("fruits-list");
    //access data attributes using dataset
    const fruit = event.target.parentElement.dataset.fruit;
    fetch(`/smoothie/${fruit}`,
    {
      method: "DELETE",
      headers: { 
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then((data) => {
      fruitsList.innerHTML = FruitsList(data.fruit);
    });
  }
  
  