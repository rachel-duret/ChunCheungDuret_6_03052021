import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Profile() {
    let {id }= useParams();
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/auth/profile/${id}`)
        .then((response) => {
            setUsername(response.data.username)
            console.log(response)

        })
    })
    return (
        <div className="profilePageContainer">
            <div className="userInfo">
                <h1>Username:{username}</h1>
            </div>
            <div className="listOfPosts"></div>
           
        </div>
    )
}

export default Profile
