import React from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';


function CreatePost() {
    let history = useHistory()
    const initialValues ={
        title: "",
        postText:"",
        username:"",
    };

    const onSubmit =(data)=>{
        axios.post("http://localhost:8000/posts",data,{
            headers:{
                accessToken: localStorage.getItem("accessToken"),
                
              }
        })
        .then((response)=>{
            if(response.data.error){// response.status
                alert("Login Please !");
                history.push('/login'); 
            }else{
                history.push('/'); 
            }                   
        });
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('You must put a title!'),
        postText: yup.string().required(),
        username: yup.string().min(3).max(20).required(),
    })





    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field              
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="(Ex. Title...)"
                    />

                    <label>Post:</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field         
                    id="inputCreatePost" 
                    name="postText" 
                    placeholder="(Ex. Post...)"
                    />

                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field 
                    id="inputCreatePost" 
                    name="username" 
                    placeholder="(Ex. Rachel...)"
                    />
                    <button type="submit">Create Post</button>
                </Form>

            </Formik>
          
        </div>
    )
}

export default CreatePost
