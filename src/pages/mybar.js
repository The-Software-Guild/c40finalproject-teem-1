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
import AddUser from "../components/AddUser"
import { Form, Button, Row, Col } from 'react-bootstrap';

const INGREDIENT_PATH = "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list"
const ALL_PATH = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s="



var options = [
 
];


class MyBar extends Component {
  
    state = {
        showLogin: true,
        drinks: []
         
        ,
        ableToMake:[

        ],
        useringredients:[],
        ingredientList:[
        ]
 

      }

    async componentDidMount() {
      this.loadDrinks();
      this.getIngredients();
     // this.getDrinksByIngredients();
      console.log(this.state.ingredientList);
      console.log(this.state.useringredients);
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
     
      
//inits both drink and ingredient lists

      loadDrinks(){
        console.log("loaddrinks");
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
             filtered.map((x, i) =>{
                filtered[i] = x.toLowerCase();
             });
              
              this.state.ingredientList.push(filtered);   

              
           
                        
            });
           
            this.setState({
             ingredientList: this.state.ingredientList
          }, () => {
              this.getIngredientsFromDB()
          })
       
      

              });
           
      
      }
      //stores ingredients passed in into the DB
   async storeUserIngredients(i){
  

          try{
              let res = await fetch('/store', {
                  method: 'post',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      username: UserStore.username,
                      uingredients: i
                 
                  })
                  
          });
          
          let result = await res.json();
          
          }catch(e){
              console.log(e);
             
          }
      
      
  
     }
     
     getDrinksByIngredients(){
      console.log("getdrinks by ing");
   
      var canMake =[];
     
      this.state.ingredientList.map((ingredients, i) =>{ 
       var canAdd = true;
      
     
       ingredients.map((item, x) =>{ 
       
           if(!this.state.useringredients.includes(item.toLowerCase())){

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
  selectFunction = (event) =>{
       console.log("select");
        let newIngredients = event.map(a => a.value.toLowerCase());
        this.storeUserIngredients(newIngredients);
        this.loadDrinks();
       
    }
  async getIngredientsFromDB(){
    console.log("DB");
      try{
        let res = await fetch('/getingredients', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
           
            
      });
      
      
      let result = await res.json();
     result.map((x, i) =>{ 
        this.state.useringredients.push(x.strName.toLowerCase());
     });
  
     this.setState({useringredients: this.state.useringredients}, () => this.getDrinksByIngredients());
     
    
    
      }catch(e){
        console.log(e);
       
      }
  }


    getIngredients(){
   
      fetch(INGREDIENT_PATH)
        .then(data => data.json())
        .then(data => {
           
          data.drinks.map((ingredient, i) => {
            options.push( { label: ingredient.strIngredient1, value: ingredient.strIngredient1});
                            
        });
        
        
      
        })
         
    }

    changeLogin() {
      if (this.isLoggedIn) {
        this.setState({isLoggedIn: false});
      } else {
        this.setState({isLoggedIn: true});
      }
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
              <div >
                <h1 id="mybar_page_title">Select which Ingredients you have at home!</h1>
                <div class = "selectbox">
                <ReactMultiSelectCheckboxes options={options} onChange ={this.selectFunction}></ReactMultiSelectCheckboxes>
                </div>
                <br></br>
                <MyBarTable drinkData = {this.state.drinks} ableData ={this.state.ableToMake}></MyBarTable>
              

                Welcome {UserStore.username}
                <SubmitButton 
                text = {'Log out'} 
                disabled = {false} 
                onClick = { () => this.doLogout() }/>
              </div>
          
             
            )
          }else{
            console.log(this.state.isNewUser);
            return (
              <div className="App">

                      <Row>
                        {(!this.state.isNewUser) ? <LoginForm /> : <AddUser />}
                      </Row>
                      <Row>
                        <Col>
                        <Button className="formChangeBtn" onClick = { () => this.setState(({isNewUser}) => ({isNewUser: !isNewUser}))}>
                        {(!this.state.isNewUser) ? "New User?" : "Already have an account?"}
                        </Button>
                        </Col>
                      </Row>

                </div>
            )
            
          }
         }
    }
    
}
 
export default observer(MyBar)