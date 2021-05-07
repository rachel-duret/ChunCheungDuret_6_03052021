import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext'



function CreatePost() {
    const {authState} = useContext(AuthContext);
    let history = useHistory()
    const initialValues ={
        title: "",
        postText:"",
    };

    useEffect(() => {

        if ( !localStorage.getItem('accessToken')) {
            history.push('/login');
        }
    }, [])

    const onSubmit =(data)=>{
        /* let data = new initialValues();
        data.append('imageUrl', values.imageUrl) */
        console.log(data);
        axios.post("http://localhost:8000/posts",data,{
            headers:{
                accessToken: localStorage.getItem("accessToken"),              
              }
        })
        .then((response)=>{
            if(response.data.error){// response.status
                console.log(response);
                alert("Login Please!");
                //history.push('/login'); 
            }else{
                history.push('/'); 
            }                   
        });
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('You must put a title!'),
        postText: yup.string().required(),
        
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
                     
                    <button type="submit">Create Post</button>
                </Form>

            </Formik>
          
        </div>
    )
}

export default CreatePost
