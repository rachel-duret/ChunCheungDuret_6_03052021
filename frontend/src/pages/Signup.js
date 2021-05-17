import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import logo from '../images/icon.png';


function Signup() {
    let history = useHistory()
    const initialValues ={
        username:"",
        email:"",
        password:"",
    };

    const validationSchema = yup.object().shape({
        username: yup.string().min(3).max(20).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).max(25).required(),
    })

    const onSubmit =(data)=>{
        axios.post("http://localhost:8000/auth/signup",data)
        .then((response)=>{
            history.push('/');    
        });
    };

   
    return (
        <div className="loginContainer">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="signupCantainerLeft">                  
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field 
                    id="username" 
                    name="username" 
                    placeholder="(Ex. Rachel...)"
                    />
                    <label>Email:</label>
                    <ErrorMessage name="email" component="span" />
                    <Field 
                    id="email" 
                    name="email" 
                    placeholder="(Ex. Rachel1984@gmail.com....)"
                    />

                    <label>password</label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Put your password 6-25..."
                    />
                    <button type="submit" className="signupBtn">Signup</button>
                </Form>
            </Formik>
            <div className="signupContainerRight">
            <img src ={logo} alt="Logo" className="logo"/>
            </div>
        </div>
    )
}

export default Signup
