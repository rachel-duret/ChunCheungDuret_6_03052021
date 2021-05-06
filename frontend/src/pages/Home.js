import React from 'react'
import axios from 'axios';
import{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useHistory();// its an object
    /* API get */
      useEffect(()=>{
        axios.get("http://localhost:8000/posts")
        .then((response)=>{
         console.log(response.data);
          setListOfPosts(response.data)//后端添加include Likes， 所有现在ListOfPosts里面已经包含Likes的数据
        })
      }, []);

      const likePost = (postId) => {
        axios.post("http://localhost:8000/likes",
        {PostId: postId},
        {headers: 
          {
          accessToken: localStorage.getItem("accessToken"),
        }
       })
       .then((response) => {
         console.log(response);      
         setListOfPosts(listOfPosts.map((post)=>{
           if (post.id=== postId) {
             if (response.data.liked){// 后端设置liked为true or false， 如果为真就改变Likes里面的数据。
              return {...post, Likes: [post.Likes, 0]};
             }else{  // 如何为false就是代表取消like, 删除like数组里的最后一条记录
               const likeArray = post.Likes;
               likeArray.pop(); 
               return {...post, Like: likeArray };
             }
             
           }else{
             return post
           }
         }))
       })
      };

    return (
        <div className="App">
        {listOfPosts.map((value, key)=>{

          return <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div className="body" 
            onClick={()=>{
              history.push(`/post/${value.id}`)/* link to post/:id page */
          }}>
            {value.postText}
            </div>

            <div className="footer">
              <p>
              {value.username}
              </p>
              <div className="likeContainer">
              <ThumbUpIcon onClick={() => {
                likePost(value.id)
              }} />
                <p>{value.Likes.length}</p>
              </div>
              
             
              
            </div>
          </div>;
        })}
       </div>
    )
}

export default Home
