import React from 'react';
import { Form, Button, ToggleButton, ToggleButtonGroup, Card } from 'react-bootstrap';

class CreateDrink extends React.Component{
    constructor(props) {
        super(props);
        this.state = { inputs: ['input-0']};
    }

    render () {

        return (
            <Card style={{ width: '50%'}}>
                <Form>
                    <Form.Group controlId="formDrinkName">
                        <Form.Label>Drink Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"/>
                    </Form.Group>

                    <Form.Group controlId="Category">
                        <Form.Label>Drink Category</Form.Label>
                        <Form.Control type="text" placeholder="Category"/>
                    </Form.Group>
                    <Form.Group controlId="formAlcoholic">
                        <Form.Label>Drink Type</Form.Label>
                        <ToggleButtonGroup type="radio" defaultValue={"Alcoholic"} name="drinkType">
                            <ToggleButton value={"Alcoholic"}>Alcoholic</ToggleButton>
                            <ToggleButton value={"Non-Alcoholic"}>Non-Alcoholic</ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Group>
                    <Form.Group controlId="formGlass">
                        <Form.Label>Glass</Form.Label>
                        <Form.Control type="text" placeholder="Enter Glass"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control type="textarea" rows={3}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingredients</Form.Label>
                        {this.state.inputs.map(input => <Form.Control type="text"/> )}
                        <Button onClick={ () => this.appendInput() }>
                            Next Ingredient
                        </Button>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
                
        )
    }
    appendInput() {
        let length = this.state.inputs.length;
        if (length < 15) {
            var newInput = `input-${this.state.inputs.length}`;
            this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput])}));
        } else {
            //hide add button
        }

    }
}
export default CreateDrink;