import logo from "../logo.svg"
import { Link } from 'react-router-dom'
import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import DrinkTable from "../components/drinktable"
import DrinkTable2 from "../components/drinktableV2"
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import '../styles/mybar.css'
import MyBarTable from "../components/myBarTable"
import NavBar from "../components/navbar"
import All from "./all"
import HomePage from './home'

import Instructions from "./instructions"
import UserStore from "../stores/UserStore"
import LoginForm from "../components/LoginForm"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import {observer} from 'mobx-react'

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
    
    async componentDidMount() {
     this.loadDrinks();
     this.getIngredients();
        try{
          let res = await fetch('/isLoggedIn', {
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
    
          let result = await res.json();
    
          if(result && result.success){
            UserStore.loading = false;
            UserStore.isLoggedIn = true;
            UserStore.username = result.username;
            
          }
          else{
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
          }
    
    
        }
        catch(e){
          UserStore.loading =false;
          UserStore.isLoggedIn = false;
        }
     
      }
    
      
    async doLogout() {
    
        try{
          let res = await fetch('/logout', {
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
    
          let result = await res.json();
    
          if(result && result.success){
            UserStore.isLoggedIn = false;
            UserStore.username = '';
          
          }
    
    
        }
        catch(e){
          console.log(e);
        }
    
      }
      state = {
       ingredient: "",
        drinkData: [
          {
            "Id": 1,
            "Name": "Product",
           
         
          }]
        
       
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
           console.log(this.state.ingredientList);
      
      }
   
      getDrinksByIngredients= (event) =>{
       
        let userIngredients = event.map(a => a.value.toLowerCase());
     
       
        var canMake =[];
        
        
         this.state.ingredientList.map((ingredients, i) =>{ 
          var canAdd = true;
         
           
          ingredients.map((item, x) =>{ 
                   
              if(!userIngredients.includes(item.toLowerCase())){

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
      if(UserStore.loading){
        return(
            <div className="App">
                <div className = 'container'>
                  
                  Loading, please wait...;
                </div>
            </div>
      
         ) }
         else{
          
          if(UserStore.isLoggedIn){
            
            return ( 
              <div className = 'app'>
                 <div className = 'container'>
              
              Welcome {UserStore.username}
              <SubmitButton 
                text = {'Log out'} 
                disabled = {false} 
                onClick = { () => this.doLogout() }/>
        
                </div>
              </div>
            )
          }else{
            return (
              <div className="App">
                    <div className = 'container'>
                   
                     <LoginForm/>
                    </div>
                </div>
            )
            
          }
         }
       
    /*
      return(
        
         <div id="mybar_page">
 
  <h1 id="mybar_page_title">Select which Ingredients you have at home!</h1>
  <div class = "selectbox">
  <ReactMultiSelectCheckboxes options={options} onChange ={this.getDrinksByIngredients}></ReactMultiSelectCheckboxes>
  </div>
  <br></br>
  <MyBarTable drinkData = {this.state.drinks} ableData ={this.state.ableToMake}></MyBarTable>
</div>
)
*/
    }
    
}
 
export default observer(MyBar)