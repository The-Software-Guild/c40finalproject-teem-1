import React, {Component} from "react"
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";

class NavBar extends Component {
    constructor(props){
        super(props);
        this.tmp = this.props.match.params;
        this.state = {
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
            selectedCategory: "s",
            elementSearched: ""
        }
    }
    handleSearchedElement = (event) => {
        console.log(this.state.selectedCategory + " " + this.state.elementSearched);
    }

    handleSearch = (event) => {
        console.log(event.target.value);
        this.setState({elementSearched: event.target.value})
    }

    handleCategory = (event) => {
        console.log(event.target.value);
        this.setState({selectedCategory: event.target.value})
    }

    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Drinkology</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item px-3">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to='/mybar'>MyBar</Link>
                            </li>
                            <li className="nav-item pl-3">
                                <Link className="nav-link" to='/all'>All</Link>
                            </li>
                        </ul>
                        <form className="d-flex ml-auto">
                        <select className="form-select form-control mr-2" onChange={this.handleCategory} >
                            {this.state.categories.map((category, index) => {
                                if(category){
                                    return <option key={index} value={category.category}>{category.name}</option>
                                }
                            })}
                        </select>
                        <div className="input-group rounded">
                            <input type="search" className="form-control rounded" onChange={this.handleSearch} placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" disabled={this.state.selectedCategory === ""}/>
                            <button className="input-group-text border-0" id="search-addon" disabled={this.state.elementSearched === ""}>
                                <Link to={'/find/' + this.state.selectedCategory + "/" + this.state.elementSearched} ><i className="fas fa-search"></i></Link>
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default withRouter(NavBar)