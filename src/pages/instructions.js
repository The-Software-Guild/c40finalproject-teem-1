import logo from "../logo.svg"
import React from "react"
 
function Instructions() {
    return (
        <div id="home_page">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                   Welcome to Instruction!
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}
 
export default Instructions