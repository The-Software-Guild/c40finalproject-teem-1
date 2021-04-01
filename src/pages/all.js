import React, { Component } from "react"
import { Col, Row, Button } from 'react-bootstrap'
import DrinkTable from '../components/drinktableV2'
import { withRouter, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/allPage.css'

 
class allPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        drinks: [],
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
                "name": "Contains Alcohol"
            },
            {
                "category": "g",
                "name": "Glass Type"
            }],
        searchCategory: '',
        searchTerm: '',
        filteredDrinks: [],
        location: React.PropTypes
      }
    }
    
    



    componentDidMount() {

        if (!this.props.match.params.element && (this.state.drinks === undefined || this.state.drinks.length == 0)) {
            this.loadAllDrinks()
        }else{

            this.loadDrinksFromURL();

        }
    }

    loadDrinksFromURL = () => {
        let element = this.props.match.params.element
                if(element){
                    element = element.replace(/%20/g, " ");
                }
                // if(this.props.match.params){
                this.setState({
                    searchTerm: this.props.match.params.element,
                    searchCategory: this.props.match.params.category
        
                }, () => {
                    this.getDrinks();
                })
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            if (!this.props.match.params.element) {
                this.setState({
                    searchTerm: "",
                    searchCategory: ""
        
                }, () => {
                    this.loadAllDrinks()
                })
                
            }else{
                this.loadDrinksFromURL();
            }
        }
    }


    loadAllDrinks = (event) =>  {
        fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=")
          .then(data => data.json())
          .then(data => {
           console.log(data.drinks)
            this.setState({drinks: data.drinks})
          })
    }
    
    inputChange = (event) => {
        let inputValue = event.currentTarget.value; 
        console.log(`input= ` + inputValue)
        this.setState({ searchTerm: inputValue }, () => {
            console.log(`search term = ${this.state.searchTerm}`);
        });
    }


    changeCategory = (event) => {
        console.log(`Current search Category: ${this.state.searchCategory}`)
        let value = event.currentTarget.value;
        console.log(`value: ` + value)

        this.setState( prevState => { return { searchCategory:  value }}       
        );
    }

    getDrinks = (event) => {
        console.log(`search category = ${this.state.searchCategory}`)
        console.log(`search term = ${this.state.searchTerm}`)
        if (this.state.searchCategory === "s") {
            fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.state.searchTerm)
            .then(data => data.json())
            .then(data => {
             console.log(data.drinks)
              this.setState({drinks: data.drinks})
            }) 
        }
        else {
            fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?" + this.state.searchCategory + "=" + this.state.searchTerm)
            .then(data => data.json())
            .then(data => {
                console.log(data.drinks)
                    this.setState({ filteredDrinks: data.drinks, drinks: [] }, () => {
                        console.log(`${this.state.filteredDrinks}`);
                        this.state.filteredDrinks.forEach(drink => {
                            console.log('drink : ' + drink.strDrink)
                            fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink.idDrink)
                                .then(data => data.json())
                                .then(data => {
                                    this.setState({
                                        drinks: this.state.drinks.concat(data.drinks)
                                      })
                                }) 
                        })
                });
            })

            
        }
    }


    
    render() {
        let { drinks } = this.state;

        return (
            <div>

                <div id="all_page">
                    <h1 id="all_page_title">Available Drinks</h1>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Row className="drinkSearch">
                            <Col>
                                <select className="form-select form-control mr-2" value={this.state.searchCategory} onChange={this.changeCategory} >
                                    <option value="" key="-1" disabled >Select Category...</option>
                                    {this.state.categories.map((category, index) => {
                                        if(category){
                                            return <option key={index} value={category.category}>{category.name}</option>
                                        }
                                    })}
                                </select>
                            </Col>
                            <Col>
                                <input type="search" className="form-control rounded" onChange={this.inputChange} value={this.state.searchTerm} placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                            </Col>
                            <Button id="drinkSearchButton" size="sm" onClick={this.getDrinks}>Search Drinks</Button>
                        </Row>
                    </Col>

                    <DrinkTable drinkData = {drinks}></DrinkTable>
                    <Button id="searchDrinkButton"variant="Secondary" onClick={this.loadAllDrinks}>See All Drinks</Button>
                </div>
            </div>

        )
    }
}
 
export default withRouter(allPage)