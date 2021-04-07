import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


//npm install mdbreact
import { MDBDataTable } from 'mdbreact';

//npm install @risingstack/react-easy-state
import { view } from '@risingstack/react-easy-state'
 

class DrinksTable extends Component {
   
    
    render() {
        let { ableData } = this.props;
        console.log(ableData);
        let { drinkData } = this.props;
        console.log(ableData);
        console.log(drinkData);
        const data = {
            columns: this.getColumns(),
            rows: this.getRows(drinkData, ableData)
        }
        return (
            <
                MDBDataTable
                striped
                bordered
                hover
                scrollX
                responsive
                fixed
                entries={20} 
                maxHeight="50vh"
                searching={false}
                data={data}
            />          
        )
    }
    
    getColumns() {
        const drinkTableColumns = [
            { label: 'Drink ID', field: 'idDrink', sort: 'asc', width: 100 },
            { label: 'Name', field: 'strDrink', sort: 'asc', width: 260},
            { label: 'Category', field: 'strCategory', sort: 'asc', width: 180},
            { label: 'Able To Make', field: 'strAble', sort: 'asc', width: 200},
            { label: 'Alcoholic?', field: 'strAlcoholic', sort: 'asc', width: 150 },
            { label: 'Glass Type', field: 'strGlass', sort: 'asc', width: 175},
            { label: 'Details', field: 'detail', sort: 'asc' }        
        ]
        return drinkTableColumns
    }

    getRows(drinkData, ableData) {
        if ( drinkData == null || typeof(drinkData) == 'undefined') {
            return []
        }
     
      
     
        return drinkData.map((object) => {
           var strAble = "False";
           if(ableData.includes(object)){
            strAble = "True";
           }
            return {
                
                idDrink: object.idDrink,
                strDrink: object.strDrink,
                strCategory: object.strCategory,
                strAble: strAble,
                strAlcoholic: object.strAlcoholic,
                strGlass: object.strGlass,
                detail: <Link to={'/instructions/' + object.idDrink}><Button variant="outline-primary" size="sm">See Details</Button></Link>

            }
        })
    }
}

export default view(DrinksTable)