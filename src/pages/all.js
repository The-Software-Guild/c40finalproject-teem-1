import React, { Component } from "react"
import DrinkTable from '../components/drinktableV2'

import '../styles/allPage.css'

 
class allPage extends Component {

    state = {
        drinks: [
            {
              "idDrink": 1,
              "strDrink": "",
              "strCategory": "",
              "strIBA": "",
              "strAlcoholic": "",
              "strGlass": ""
            }
        ],
        categories: [
            {
                "category": "s",
                "name": "Drink Name"
            },
            {
                "category": "c",
                "name": "Drink Category"
            },
            {
                "category": "a",
                "name": "Type"
            },
            {
                "category": "g",
                "name": "Glass Type"
            }
            
        ],
        searchCategory: '',
        searchTerm: ''
      }
    
    
    componentDidMount() {
      this.loadDrinks()
      
    }

    loadDrinks() {
        fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=")
          .then(data => data.json())
          .then(data => {
           console.log(data.drinks)
            this.setState({drinks: data.drinks})
          })
    }

    getDrinks() {
        fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?" + this.state.searchCategory + "")
          .then(data => data.json())
          .then(data => {
           console.log(data.drinks)
            this.setState({drinks: data.drinks})
          })
    }

    inputChange = (event) => {
        let inputValue = event.target.value;    
        this.setState({ searchTerm: inputValue })
    }


    changeCategory = (event) => {
        console.log(`Current search Category: ${this.state.searchCategory}`)
        let value = event.currentTarget.value;
        console.log(`value: ` + value)

        this.setState( prevState => { return { searchCategory:  value }}       
        );
    }

     
     
    
    render() {
        let { drinks } = this.state;

        return (
            <div id="all_page">
                <h1 id="all_page_title">Available Drinks</h1>
                <DrinkTable drinkData = {drinks}></DrinkTable>
            </div>
        )
    }
}
 
export default allPage