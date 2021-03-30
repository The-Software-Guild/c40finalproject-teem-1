import logo from "../logo.svg"
import React from "react"
 
function All() {
    return (
        <div id="home_page">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                   Welcome to All!
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
            <body>
               
            </body>
        </div>
    )
}
 
export default All