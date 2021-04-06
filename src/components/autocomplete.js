import React from 'react'
import '../styles/autocomplete.css'

class Autocomplete extends React.Component {


    renderSuggestions () {
        const { suggestions, suggestedSelected } = this.props
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item, i) => <li key={i} value={item} onClick={() => suggestedSelected(item)} >{item}</li>)}
            </ul>
        )
    }

    render () {
        let { searchTerm, inputChange } = this.props
        return (
            <div className="AutocompleteText">
                <input value={searchTerm} type="text" onChange={inputChange} />
                {this.renderSuggestions()}
            </div>
        )
    }
}
export default Autocomplete