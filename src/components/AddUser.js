import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../stores/UserStore'
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