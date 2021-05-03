import React, {useState} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import logo from '../images/icon-up.png';


function Login() {
    let history = useHistory()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = ()=>{
        const data = { username: username, email: email, password: password};
        axios.post('http://localhost:8000/auth/login', data)
        .then((response)=>{
        
            if (response.data.error){ 
               alert(response.data.error)
            }
            else{ 
                localStorage.setItem("accessToken", response.data.accessToken);
               
                history.push("/");
            }
          
        });
    };
    
    return (
        <div className="loginContainer">
            <div className= "loginCantainerLeft">
                <input type="text" 
                placeholder="Username"
                onChange = {(event)=>{
                    setUsername(event.target.value);
                }}
                />
                <input type="email" 
                placeholder="Email"
                onChange = {(event)=>{
                    setEmail(event.target.value);
                }}
                />
                <input type="password"
                placeholder="Password"
                onChange = {(event)=>{
                    setPassword(event.target.value);
                }}
                />
                <button onClick={login}>Login</button>
            </div>
            <div className= "loginCantainerRight">
                <img src ={logo} alt="Logo" id="logo"/>
            </div>
           
        </div>
    )
}

export default Login
