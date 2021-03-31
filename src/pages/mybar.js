import logo from "../logo.svg"

import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import DrinkTable from "../components/drinktable"

const INGREDIENT_PATH = "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list"
const ALL_PATH = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s="
class MyBar extends Component {
    state = {
      
        drinks: [
            {
              "idDrink": 1,
              "strDrink": "",
              "strCategory": "",
              "strIBA": "",
              "strAlcoholic": "",
              "strGlass": ""
           
            }]
      }
    componentWillMount() {

      this.loadDrinks()
      
    }
    
    loadDrinks(){
   
        fetch(ALL_PATH)
          .then(data => data.json())
          .then(data => {
           console.log(data.drinks)
            this.setState({drinks: data.drinks})
          })
      }

      getIngredients(url){
   
        fetch(url)
          .then(data => data.json())
          .then(data => {
            console.log(data);
            this.setState({ingredient: data})
          })
      }

    render() {
      
        return (
           <DrinkTable drinks = {this.state.drinks}></DrinkTable>
        )
    }
}
 
export default MyBar