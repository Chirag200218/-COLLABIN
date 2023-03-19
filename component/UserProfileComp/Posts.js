import React from 'react'
import { useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import style from './profile.module.scss';
import { db } from '../../utils/fireconnect';
import { doc, getDoc, orderBy, limit } from "firebase/firestore";
import Post from '../FeedComp/Post';
const Posts = () => {
  const[posts,setPosts] = useState([]);
  const user = useSelector((state)=>state.user);
  useEffect(()=>{

    async function getPost(){
      if(user){
        // console.log(user.postId);
        let postId =[];
        await Promise.all(user.PostId.map(async(id)=>{
          const docRef = doc(db, "posts", id);
          const docSnap = await getDoc(docRef,orderBy("date", "desc"), limit(20));
          if(docSnap.exists()){
            const res = docSnap.data();
            res.id = id;
            postId.push(res);
          }
        }))
        console.log(postId);
        setPosts(postId);
      }
    }
   getPost();
  },[user])
  return (
    <div className={style.optionContainer}>
      
      {posts.map((post,idx)=>(
        <Post key={"post"+idx} post={post}/>
      ))
      }

    </div>
  )
}

export default Posts