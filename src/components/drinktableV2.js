import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


//npm install mdbreact
import { MDBDataTable } from 'mdbreact';

//npm install @risingstack/react-easy-state
import { view } from '@risingstack/react-easy-state'
 

class DrinksTable extends Component {

    
    render() {

        let { drinkData } = this.props;

        const data = {
            columns: this.getColumns(),
            rows: this.getRows(drinkData)
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
            { label: 'IBA', field: 'strIBA', sort: 'asc', width: 200},
            { label: 'Alcoholic?', field: 'strAlcoholic', sort: 'asc', width: 150 },
            { label: 'Glass Type', field: 'strGlass', sort: 'asc', width: 175},
            { label: 'Details', field: 'detail', sort: 'asc' }        
        ]
        return drinkTableColumns
    }

    getRows(drinkData) {
        if ( drinkData == null || typeof(drinkData) == 'undefined') {
            return []
        }
     
        if ( !( drinkData.length > 0 ) ) { return [] }
     
        return drinkData.map((object) => {
            return {
                idDrink: object.idDrink,
                strDrink: object.strDrink,
                strCategory: object.strCategory,
                strIBA: object.strIBA,
                strAlcoholic: object.strAlcoholic,
                strGlass: object.strGlass,
                detail: <Link to={'/instructions/' + object.idDrink}><Button variant="outline-primary" size="sm">See Details</Button></Link>

            }
        })
    }
}

export default view(DrinksTable)