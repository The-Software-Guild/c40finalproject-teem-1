import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"

import './App.css'
import NavBar from "./components/navbar"
import All from "./pages/all"
import HomePage from './pages/home'
import MyBar from "./pages/mybar"
import Instructions from "./pages/instructions"

 
class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <main>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/home' component={HomePage} />
                        <Route path='/mybar' component={MyBar} />
                        <Route path='/all' component={All} />
                        <Route path='/instructions/:id' component={Instructions} />
                    </Switch>
                </main>
            </div>
        )
    }
}
 
export default App