import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../stores/UserStore';
import { Form, Button } from 'react-bootstrap';
class AddUser extends React.Component {
constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        cpassword: '',
        buttonDisabled: false
    }
}
checkPassword(){
console.log(this.state.password);
console.log(this.state.cpassword);
    if(this.props.password === this.props.cpassword){
        return true;
    }
    else{ return false}
}
setInputValue(property, val){
    val = val.trim();
    if(val.length > 12){
        return;
    }
    this.setState({
        [property]: val
    })
}
resetForm(){
    this.setState({
        username: '',
        password: '',
        cpassword: '',
        buttonDisabled: false

    })
}
async add(){

    if(this.checkPassword() === true){

      
        this.setState({
            buttonDisabled: true
        })
        try{
            let res = await fetch('/add', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
                
        });
        
        let result = await res.json();
        
        }catch(e){
            console.log(e);
            this.resetForm();
        }
    }
    
}

    render() {
        return (
            /*            
            <Form className="loginForm">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username"
                    value ={this.state.username ? this.state.username : ''}
                    onChange = { (val) => this.setInputValue('password', val)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    value ={this.state.password ? this.state.password : ''}
                    onChange = { (val) => this.setInputValue('password', val)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"
                        value ={this.state.cpassword ? this.state.cpassword : ''}
                        onChange = { (val) => this.setInputValue('cpassword', val)}>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit"
                disabled = {this.state.buttonDisabled}
                onClick = {() => this.add()}>
                    Sign Up
                </Button>
            </Form>
            */
            <div className = "loginForm">
                Log in
                <InputField
                type ='text'
                placeholder = 'Username'
                value ={this.state.username ? this.state.username : ''}
                onChange = { (val) => this.setInputValue('username', val)}/>

                <InputField
                type ='password'
                placeholder = 'Password'
                value ={this.state.password ? this.state.password : ''}
                onChange = { (val) => this.setInputValue('password', val)}/>

                <InputField
                type ='password'
                placeholder = 'Confirm Password'
                value ={this.state.cpassword ? this.state.cpassword : ''}
                onChange = { (val) => this.setInputValue('cpassword', val)}/>

                <SubmitButton
                text='Login'
                disabled = {this.state.buttonDisabled}
                onClick = {() => this.add()}/>
            </div>
            
        );
    }
}
export default AddUser;