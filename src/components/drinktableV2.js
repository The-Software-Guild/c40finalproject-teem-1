import React, { Component } from 'react';
import { Button } from 'react-bootstrap'


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
                maxHeight="50vh"
                data={data}
            />          
        )
    }
    
    getColumns() {
        const drinkTableColumns = [
            { label: 'Drink ID', field: 'idDrink', sort: 'asc', width: 30 },
            { label: 'Name', field: 'strDrink', sort: 'asc', width: 50 },
            { label: 'Categoryr', field: 'strCategory', sort: 'asc', width: 30 },
            { label: 'IBA', field: 'strIBA', sort: 'asc', width: 30 },
            { label: 'Alcoholic?', field: 'strAlcoholic', sort: 'asc', width: 30 },
            { label: 'Glass Type', field: 'strGlass', sort: 'asc', width: 33 },
            { label: 'Details', field: 'detail', sort: 'asc', width: 33 }        
        ]
        return drinkTableColumns
    }

    getRows(drinkData) {
        // Handle null case before reviews data is loaded
        if ( drinkData == null || typeof(drinkData) == 'undefined') {
            return []
        }
     
        // Handle case with no reviews
        if ( !( drinkData.length > 0 ) ) { return [] }
     
        return drinkData.map((object)=> {
            return {
                idDrink: object.idDrink,
                strDrink: object.strDrink,
                strCategory: object.strCategory,
                strIBA: object.strIBA,
                sstrAlcoholic: object.strAlcoholic,
                strGlass: object.strGlass,
                detail: <Button variant="secondary" >See Details</Button> 

            }
        })
    }
}

export default view(DrinksTable)