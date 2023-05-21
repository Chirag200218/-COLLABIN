import React, { useState } from 'react'
import style from './profile.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import { reset } from '../../redux_feature/UserInfo/userSlice';
import { useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import Posts from "./Posts.js"
import axios from 'axios';
import About from './About';
import Groups from './Groups';
const base_url = process.env.NEXT_PUBLIC_URL;
import { useRouter } from 'next/router';

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
        e.preventDefault();
        router.push("/userprofile")
    }
    const handleCategory = (e)=>{
      e.preventDefault();
      router.push("/categories")
    }
      return (
            <motion.div className={style.optionFrame} viewport={{once:true}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:"0.3"}} exit={{x:150}}>
              <button className={style.menuButton} onClick={(e)=>handleLogout(e)}>Logout</button>
              <button   className={style.menuButton} onClick={(e)=>handleUpdate(e)}>Update profile</button>
              <button className={style.menuButton} onClick={(e)=>handleCategory(e)}>Update category</button>
            </motion.div>
      )
}

const UserProfile = () => {
    const router = useRouter();
    const userid=router.query.id;
    const x=useSelector((state)=>state.user);
    const [user,setUser] = useState(x);
    const[openBar,setOpenBar] = useState(false);
    const[content,setContent] = useState("About");
    const[posts,setPosts] = useState([]);
    useEffect(()=>{
      const fetchPosts = async ()=>{
        if(userid){
          const res=await axios.get(`${base_url}/api/details/user?id=${userid}`);
          setUser(res.data.result);
        }else{
          setUser(x);
        }
      }
      fetchPosts();
    },[userid]);
   
    
  return (
    <>
      {/* {console.log(userid +" "+x._id)} */}
        <AnimatePresence>
            {openBar===true && 
                <OpenBar setOpenBar={setOpenBar}/>
            }
        </AnimatePresence>
        <div className={style.frame}>
            <div className={style.upperCont}>
              <div className={style.userHeader}> 
                  <span>{user.name}</span>
                  {userid === x._id && <img onClick={()=>setOpenBar(!openBar)}src='/images/humburger.svg' style={{cursor:"pointer"}}></img>}
              </div>
              <div className={style.about}>
                      {user.image!==null? <img src={user.image}></img>:<img src={'/images/user.svg'}></img> }
                      <span>{user.headline} </span>
                      <div className={style.profileOptions}>
                        <p style={{ width: "30%"}} onClick={()=>setContent("About")}>About</p>
                        <div style={{display:"inline",height:"65%", width: "1%",borderRight:"0.3px solid black"}}></div>
                        <p style={{ width: "30%"}} onClick={()=>setContent("Posts")}>Posts</p>
                        {/* <p onClick={()=>setContent("Groups")} style={{borderLeft:"1px solid grey"}}>Groups</p> */}
                      </div>
              </div>   
            </div>
            {content==="About" && <About userdata={user}/> }
            {content==="Posts" && <Posts userdata={user}/> }
            {content==="Groups" && <Groups userdata={user}/>}

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