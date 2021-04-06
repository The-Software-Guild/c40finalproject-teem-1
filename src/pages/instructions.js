import React, {Component} from "react"
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/instructions.css'
import { withRouter } from "react-router";

class Instructions extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            cocktail: {},
            ingredients:[],
            id:  this.props.match.params.id
        }
    }

    componentDidMount = () =>{
       this.loadCocktail();
        console.log(this.state.cocktail);
    }

    loadCocktail() {
        this.setState({ loading: true })
        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${this.state.id}`)
        .then(data => data.json())
        .then(data => this.setState(
            { cocktail: data.drinks[0],
            ingredients:[
                data.drinks[0].strIngredient1,
                data.drinks[0].strIngredient2,
                data.drinks[0].strIngredient3,        
                data.drinks[0].strIngredient4,
                data.drinks[0].strIngredient5,
                data.drinks[0].strIngredient6,                     
                data.drinks[0].strIngredient7,
                data.drinks[0].strIngredient8,
                data.drinks[0].strIngredient9,                     
                data.drinks[0].strIngredient10,
                data.drinks[0].strIngredient11,
                data.drinks[0].strIngredient12,                     
                data.drinks[0].strIngredient13,
                data.drinks[0].strIngredient14,
                data.drinks[0].strIngredient15        
            ],
            }
        ))
    }    

    render() {


        return (
            <Container fluid>
                <Row className="justify-content-center">

                    <Col md={3} className="mt-5"><img className="img-fluid" src={this.state.cocktail.strDrinkThumb}/></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={3} className="mt-5"><label>Name: </label> {this.state.cocktail.strDrink}</Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={3} className="mt-5"><label>Category: </label> {this.state.cocktail.strCategory}</Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={2} className="mt-5"><label>Ingredients:</label>

                        <ul>
                        {this.state.ingredients.map((i, index) => {
                            if(i){
                                return <li key={index} className="text-left">{i}</li>
                            }
                        })}
                            
                        </ul>
                    </Col>
                </Row>
                <Row className="mb-5 justify-content-center">
                    <Col md={3} className="mt-5"><label>Instructions: </label><br/> {this.state.cocktail.strInstructions}</Col>
                </Row>
                
            </Container>
        );
    }
}
export default withRouter(Instructions)