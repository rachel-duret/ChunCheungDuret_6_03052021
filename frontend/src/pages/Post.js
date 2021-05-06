import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext'





function Post() {
  let history = useHistory()
  let {id} = useParams();  
  const [postObject, setPostObject] = useState({});
  const  [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const {authState} = useContext(AuthContext);
  

  useEffect(()=>{
    axios.get(`http://localhost:8000/posts/byId/${id}`)
      .then((response)=>{
        setPostObject(response.data);
        console.log(response);
      },);

      axios.get(`http://localhost:8000/comments/${id}`)
      .then((response)=>{
        setComments(response.data);
      });
  }, []);
  
  const addComment = ()=>{

  
    axios.post('http://localhost:8000/comments', {
      commentBody:newComment ,
       PostId:id
      },
      {
        headers:{
          accessToken: localStorage.getItem("accessToken"),
          
        }
      }
      )
    .then((response)=>{
    
      if (response.data.error){
      alert("Login Please !");
      history.push('/login');  
      }else{
        const commentToAdd = {
          commentBody:newComment,
          username: response.data.username
        };
        setComments([...comments, commentToAdd]);
        setNewComment('');// will clear the last comment in the input  
      }  
    })
  }

/////////      fonction for delete one post
  const deleteOnePost = (id) => {
    console.log(id);
    axios.delete(`http://localhost:8000/posts/byId/${id}`, {
      headers:{
        accessToken: localStorage.getItem("accessToken"),      
      },
    })
    .then((response) => {
      console.log(response);
      setPostObject({});
       history.push('/');  
    })

  }


  ////////      fonction for delete one comment    ///////////////
  const deleteComment = (id) =>{ 
  
    axios.delete(`http://localhost:8000/comments/${id}`,{
      headers:{
        accessToken: localStorage.getItem("accessToken"),      
      },
    })
    .then(()=>{
     setComments(
       comments.filter((val) => {
       console.log(val);
         return val.id !==id;
         
       })
     )
    })

  }


  return (
     <div className="postPage">
       <div className="leftSide">
         <div className="post" id="individual">
           <div className="title"> {postObject.title}</div>
           <div className="body"> {postObject.postText}</div>
           <div className="footer"> 
           {postObject.username}
           {
              authState.username ===postObject.username 
              &&
            (<button onClick={() => {
              deleteOnePost(postObject.id)
            }}>Delete</button>)
           }
         
           </div>
         </div>
       </div>
       <div className="rightSide">
         <div className="addCommentContainer">
           <input 
           type="text" 
           placeholder="Write your Comment..." 
           value={newComment}
           onChange ={(event)=>{
             setNewComment(event.target.value)
           }}/>
           <button onClick={addComment}>Add Comment</button>
         </div> 
         <div className="listOfComments">
           {comments.map((comment, key)=>{
             return <div key={key} className="comment">
               {comment.commentBody}
               <p>Username: {comment.username}</p>
               <p>Date: {comment.createdAt}</p>
             
               { 
               authState.username ===comment.username 
               && 
               (<button onClick={() => {
                 deleteComment(comment.id);
               }}>Delete</button>)
               }
               </div>
           })}
         </div>
       </div>
     </div>
  )
}


export default Post
