import React, {Component} from "react"
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css'


class NavBar extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            categories: [],
            selectedCategory: "",
            elementSearched: ""
        }
    }
    handleSearchedElement = (event) => {
        console.log(this.state.selectedCategory + " " + this.state.elementSearched);
    }

    componentDidMount = () =>{
        this.loadCategories();
    }

    handleSearch = (event) => {
        console.log(event.target.value);
        this.setState({elementSearched: event.target.value})
    }

    handleCategory = (event) => {
        console.log(event.target.value);
        this.setState({selectedCategory: event.target.value})

    }

    loadCategories() {
        this.setState({ loading: true })
        console.log("Loading contact data")
        
        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?c=list`)
        .then(data => data.json())
        .then(data => this.setState(
            { 
                categories: data.drinks,
                selectedCategory: data.drinks[0].strCategory
            }
        ))
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
                                    return <option key={index} value={category.strCategory}>{category.strCategory}</option>
                                }
                            })}
                        </select>
                        <div className="input-group rounded">
                            <input type="search" className="form-control rounded" onChange={this.handleSearch} placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" />
                            <span className="input-group-text border-0" onClick={this.handleSearchedElement} id="search-addon">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default NavBar