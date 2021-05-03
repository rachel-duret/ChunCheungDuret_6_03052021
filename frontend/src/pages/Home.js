import React from 'react'
import axios from 'axios';
import{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useHistory();// its an object
    /* API get */
      useEffect(()=>{
        axios.get("http://localhost:8000/posts")
        .then((response)=>{
         
          setListOfPosts(response.data)
        })
      }, []);
    return (
        <div className="App">
        {listOfPosts.map((value, key)=>{

          return <div key={key} className="post" onClick={()=>{
              history.push(`/post/${value.id}`)/* link to post/:id page */
          }}>
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>;
        })}
       </div>
    )
}

export default Home
