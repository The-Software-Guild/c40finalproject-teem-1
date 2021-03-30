
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import React, { Component } from 'react';
import { Table, Button, Card, Col} from 'react-bootstrap'


const DrinkRow = ({drink}) =>{
    return (
        <tr>
            <td>{drink.idDrink}</td>
            <td>{drink.strDrink}</td>
            <td>{drink.strCategory}</td>
            <td>{drink.strIBA}</td>
            <td>{drink.strAlcoholic}</td>
            <td>{drink.strGlass}</td>
        </tr>
          
    )
}



class DrinkTable extends Component {

    // this static property will initialize a prop with data
    // if it hasn't been provided by the parent component
    static defaultProps = {
   
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

    render() {
      
  
        console.log(this.props.drinks)
        return (
            
            <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>IBA</th>
            <th>Type</th>
            <th>GlassType</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
                
                {this.props.drinks.map((drink, i) => {
                 
                    return <div><DrinkRow drink={drink}  /></div>
                                  
                })}
                </Table>
            
        )
    }
}

export default DrinkTable