import logo from "../logo.svg"
import { Link } from 'react-router-dom'
import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import DrinkTable from "../components/drinktable"
import DrinkTable2 from "../components/drinktableV2"
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
const INGREDIENT_PATH = "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list"
const ALL_PATH = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s="



var options = [
 
];


class MyBar extends Component {
    state = {
      
        drinks: {
        },
        ableToMake:[

        ],
        ingredientList:[
        ]
 

      }
    componentDidMount() {

      this.loadDrinks()
      this.getIngredients();
      
    }
   
    loadDrinks(){
   
        fetch(ALL_PATH)
          .then(data => data.json())
          .then(data => {
          
            this.setState({drinks: data.drinks});
            data.drinks.map((drink, i) => {
              var ingredients = [
                drink.strIngredient1,
                drink.strIngredient2,
                drink.strIngredient3,
                drink.strIngredient4,
                drink.strIngredient5,
                drink.strIngredient6,
                drink.strIngredient7,
                drink.strIngredient8,
                drink.strIngredient9,
                drink.strIngredient10,
                drink.strIngredient11,
                drink.strIngredient12,
                drink.strIngredient13,
                drink.strIngredient14,
                drink.strIngredient15,
              ]
              var filtered = ingredients.filter(function (el) {
                return el != null;
              });
              this.state.ingredientList.push(filtered);
           
                        
            });
      

              });
           
      
      }
   
      getDrinksByIngredients= (event) =>{
       
        let userIngredients = event.map(a => a.value.toLowerCase());
     
       
        var canMake =[];
        //loop through drink ingredients
        
         this.state.ingredientList.map((ingredients, i) =>{ 
          var canAdd = true;
         
           
          ingredients.map((item, x) =>{ 
                   
              if(!userIngredients.includes(item.toLowerCase())){
                //console.log(i+"false:" + item);
                  canAdd = false;           
              }
            }
          
          );
         
  
          if(canAdd == true && !(this.state.ableToMake.includes(this.state.drinks[i]))){
             
              canMake.push(this.state.drinks[i]);
             
          }
        });
       
         

      if(canMake.length != 0 ){
     
      this.setState({
        ableToMake: this.state.ableToMake.concat(canMake)})
     
      }
    }
      
    getIngredients(){
   
      fetch(INGREDIENT_PATH)
        .then(data => data.json())
        .then(data => {
           
          data.drinks.map((ingredient, i) => {
            options.push( { label: ingredient.strIngredient1, value: ingredient.strIngredient1})                          
        });

          this.setState({ingredient: data})
        })
         
    }

    render() {
    
        return (
          
        <div>
          <h1>Select which Ingredients you have at home!</h1>
          <div class = "selectbox">
          <ReactMultiSelectCheckboxes options={options} onChange ={this.getDrinksByIngredients}></ReactMultiSelectCheckboxes>
          </div>
          <br></br>
          <DrinkTable2  drinkData = {this.state.ableToMake}></DrinkTable2>
        </div>
        )

    }
}
 
export default MyBar