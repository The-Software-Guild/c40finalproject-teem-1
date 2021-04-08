import React from "react"
import {Button} from 'react-bootstrap'
import '../styles/home.css'
const SERVICE_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktail: {},
        }
    }
    componentDidMount = () => {
        this.setState({loading: true});
        console.log("Loading data");

        fetch(SERVICE_URL)
            .then((resp) => resp.json())
            .then(resp =>  this.setState(
                { cocktail: resp.drinks[0],

            }
            ))
        .catch(function(error) {
            console.log(error);
        })
    }

    render() {
        return(
            <div id="homePage">
                    <h1 style={{fontWeight: 'Bold'}}>Welcome!</h1>
                    <hr className="thick"/>  
                        <p style={{fontWeight: 'Bold'}}>
                            Welcome to Team 1's Drinkology Web App!
                            Try out a new drink recipe below or find new recipes on your own.
                            Discover all of the drinks you can create by visiting the <a href="/mybar">MyBar</a> page! Simply login, select your ingredients, then get to drinking!
                            Or explore all of the available drink recipes in the <a href="/all">All Drinks</a> page.
                        </p>
                        <h2 style={{marginTop: '2em', fontWeight: 'Bold'}}>Try Something New!</h2>
                        <div className="card mb-3">
                            <div className="row no-gutters special-card">
                                <div className="col-md-4">
                                    <img src={this.state.cocktail.strDrinkThumb} className="card-img" alt=""/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{this.state.cocktail.strDrink}</h5>
                                        <p>An {this.state.cocktail.strAlcoholic}  drink served in a {this.state.cocktail.strGlass}</p>
                                        <Button variant="dark" href={'/instructions/' + this.state.cocktail.idDrink }>See how its made!</Button>
                                    </div>
                                </div>
                            </div>
                        </div> 
            </div>

        );
    }
}

export default HomePage