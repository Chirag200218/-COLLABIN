import React, { useState } from 'react'
import style from './profile.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import { reset } from '../../redux_feature/UserInfo/userSlice';
import { useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { base_url } from '../../utils/connection';
import Posts from "./Posts.js"
import axios from 'axios';
import Link from 'next/link';
import About from './About';
import Groups from './Groups';

const OpenBar = ({setOpenBar})=>{
    const router = useRouter();
    const dispatch= useDispatch();
    useEffect(()=>{
        document.addEventListener("mousedown",handleClick);
        return ()=>{
          document.removeEventListener("mousedown",handleClick);
        }
      },[]);
    
      const handleClick = (e)=>{
        if(e.target.className==="profile_optionFrame__GeMg2" || e.target.className==="profile_menuButton__YV7Vb"){
          return;
        }
        setOpenBar(false);
      }
      const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem("userId");
        dispatch(reset());
        router.push("/signin");
    }
    const handleUpdate = (e)=>{
      console.log("ijofd");
        e.preventDefault();
        // 
        router.push("/userprofile")
    }
      return (
            <motion.div className={style.optionFrame} viewport={{once:true}} initial={{x:70}} whileInView={{x:10}} transition={{type: "tween",duration:"0.5"}} exit={{x:150}}>
              <button className={style.menuButton} onClick={(e)=>handleLogout(e)}>Logout</button>
              <button   className={style.menuButton} onClick={(e)=>handleUpdate(e)}>Update profile</button>
            </motion.div>
      )
}

const UserProfile = () => {


    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const[openBar,setOpenBar] = useState(false);
    const[content,setContent] = useState("About");
    const[posts,setPosts] = useState([]);

   
    
  return (
    <>
        <AnimatePresence>
            {openBar===true && 
                <OpenBar setOpenBar={setOpenBar}/>
            }
        </AnimatePresence>
        <div className={style.frame}>
            <div className={style.upperCont}>
              <div className={style.userHeader}> 
                  <span>{user.name}</span>
                  <img onClick={()=>setOpenBar(!openBar)}src='/images/humburger.svg' style={{cursor:"pointer"}}></img>
              </div>
              <div className={style.about}>
                      {user.image!==null? <img src={user.image}></img>:<img src={'/images/user.svg'}></img> }
                      <span>{user.headline} </span>
                      <div className={style.profileOptions}>
                        <p onClick={()=>setContent("About")} style={{borderRight:"1px solid grey"}}>About</p>
                        <p onClick={()=>setContent("Posts")} >Posts</p>
                        <p onClick={()=>setContent("Groups")} style={{borderLeft:"1px solid grey"}}>Groups</p>
                      </div>
              </div>   
            </div>
            {content==="About" && <About/> }
            {content==="Posts" && <Posts/> }
            {content==="Groups" && <Groups/>}

            {/* <div className={style.skills}>
              <h3>Skills</h3>
              <div>
                {
                  user.skillId.map((sk,idx)=>(
                    <>
                      <motion.span whileHover={{scale:"1.1"}} transition={{type: "tween",duration:"1.5"}} key={idx}>{sk}</motion.span>
                    </>
                  ))
                }
              </div>
            </div>
            <div className={style.postBox}>
              <h3>Posts</h3>
              <div>
                
              </div>
            </div>   */}
        </div>
        
    </>
    
  )
}

export default UserProfile