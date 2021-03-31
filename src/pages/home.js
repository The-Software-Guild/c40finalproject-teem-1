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
                        <p style={{fontWeight: 'Bold'}}>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                            exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
                            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                            dolorem eum fugiat quo voluptas nulla pariatur?
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