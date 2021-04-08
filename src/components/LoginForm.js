import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../stores/UserStore';
import '../styles/login.css';
import { Form, Button } from 'react-bootstrap';
class LoginForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        buttonDisabled: false
    }
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
        buttonDisabled: false

    })
}
async doLogin(){
    if(!this.state.username){
        return;
    }
    if(!this.state.password){
        return;
    }
    this.setState({
        buttonDisabled: true
    })
    try{
        let res = await fetch('/login', {
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
       if(result && result.success){
           UserStore.isLoggedIn = true;
           UserStore.username = result.username;

       }
       else if(result && result.success === false){
           this.resetForm();
           alert(result.msg);
       }
    }catch(e){
        console.log(e);
        this.resetForm();
    }
    
}
    render() {
        return (
            /*
            <Form className="loginForm">
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username"
                    value={this.state.username ? this.state.username : ''}
                    onChange = { (val) => this.setInputValue('username', val)}
                    required>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                    value ={this.state.password ? this.state.password : ''}
                    onChange = { (val) => this.setInputValue('password', val)}
                    required>
                    </Form.Control>
                </Form.Group>
                <Button type="submit"
                disabled = {this.state.buttonDisabled}
                onClick = {() => this.doLogin()}>
                    Log In
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

                <SubmitButton
                text='Login'
                disabled = {this.state.buttonDisabled}
                onClick = {() => this.doLogin()}/>
            </div>
        );
    }
}
export default LoginForm;