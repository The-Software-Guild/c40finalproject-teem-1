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
        console.log("Loading contact data")
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
                <div className="card bg-light">
                    <div className="row no-gutters">
                        <div className="col md-4">
                            <img className="card-img" src={this.state.cocktail.strDrinkThumb}/>
                        </div>
                        <div className="col md-8">
                            <div className="card-body">
                                <h3 className="card-title">{this.state.cocktail.strDrink}</h3>
                                <h6 className="card-title">{this.state.cocktail.strCategory}</h6>
                                <ul style={{columns: '2'}}>
                                    {this.state.ingredients.map((i, index) => {
                                        if(i){
                                            return <li key={index} className="text-left">{i}</li>
                                        }
                                    })} 
                                </ul>
                                <p>{this.state.cocktail.strInstructions}</p>
                                <p className="card-text text-sm-center text-muted">Last updated on {this.state.cocktail.dateModified}</p>
                            </div>
                        </div>
                    </div>
                </div>
 
        );
    }
}
export default withRouter(Instructions)