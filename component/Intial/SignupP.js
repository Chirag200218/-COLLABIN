import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
const base_url = process.env.NEXT_PUBLIC_URL;
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {CreateId} from '../../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';
import {convertToBase64} from '../../utils/base64'
import jwtDecode from "jwt-decode"
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import styles from '../../styles/signup.module.scss'
import { DotLoader , ClipLoader} from 'react-spinners';
import { motion } from "framer-motion";


const SignupP = ()=> {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const Userid = useSelector((state)=>state.user._id);
    const User = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const[ppic,setppic]=useState(false);
    const [load,setLoad] = useState(false);

    const onSubmit = async(data) => {
      try {
        setLoad(true);
        const res= await axios.post(`${base_url}/api/details/user`,data);
        localStorage.setItem("userId", res.data.id); 
        data._id=res.data.id; //adding over form data
        console.log(data._id);
        dispatch(CreateId(data));
        router.push("/categories");
        setLoad(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    const isma=()=>{
      setppic((pre)=>!pre);
    }

    const CreateorGetUser = async (res) => {
      const decode=jwtDecode(res.credential);
      const { name, email, picture } = decode;
      const user = {
          name:name,
          email:email,
          image:picture
      }
      const result=await axios.post(`${base_url}/api/auth/gauth`,user);
      localStorage.setItem("userId", result.data.id); 
      user._id=result.data.id;
      user.friendId=[result.data.id];
      dispatch(CreateId(user));
  }

    useEffect(()=>{
      if(Userid!==null){
        router.push("/categories");
      }else{
        setTimeout(()=>{
          <DotLoader color="hsla(238, 67%, 53%, 1)" style={{display:"flex",justifyContent:"center",alignContent:"center"}} loading={true} size={25} />
        },5000)
      }
      
    },[Userid])

    const onClickFunc = ()=>{
      router.push("/signin");
    }
    
  return (
    <div className={styles.box}>
        {
          load && (
            <div className="loaderPage">
              <ClipLoader color="#36d7b7" />
            </div>
          )

        }
        <div className={styles.comp}>
          <p style={{fontFamily:"cursive",fontStyle:"oblique",fontWeight:"600",fontSize:"44px"}}>Creat Account</p>
          <p>to get started now!</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className={styles.innerbox}>
              <input type="text" name="name" {...register("name",{required: true})} placeholder={"Name"}/>
              {errors.name && errors.name.type === "required" && (
                <p style={{"fontSize":"13px"}} className="errorMsg">name is required.</p>
              )}
          
              <input type="email" name="email" {...register("email",{required: true,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} placeholder={"Email"}/>
              {errors.email && errors.email.type === "required" && (
                <p style={{"fontSize":"13px"}} className="errorMsg">Email is required.</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p  style={{"fontSize":"13px"}} className="errorMsg">Email is not valid.</p>
              )}
            
        
              <input type="password" name="password" {...register("password",{required: true,minLength: 6})} placeholder={"Password"}/>
              {errors.password && errors.password.type === "required" && (
                <p style={{"fontSize":"13px"}}className="errorMsg">password is required.</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p style={{"fontSize":"13px"}}className="errorMsg">Enter some lengthy password.</p>
              )}
            
        
            <motion.button whileTap={{scale:"0.8"}} type='submit'>Sign up</motion.button>
        </form>
      <div>
      <div style={{display:"flex",alignItems:"center",marginBottom:"10px",margin:"20px auto",width:"170px"}}><div style={{width:"60px",borderBottom:"0.5px solid grey",marginRight:"10px"}}></div>OR<div style={{width:"60px",borderBottom:"0.5px solid grey",marginLeft:"10px"}}></div></div>
      <div style={{width:"200px",margin:"auto"}}>
      {<GoogleLogin
            onSuccess={(res)=>CreateorGetUser(res)}
            onError={(res)=>console.log("google login error",res)}
      />}
      </div>
      <p style={{color:"#17177d"}} className={styles.onsite}>Already a user?<span style={{marginLeft:"7px",fontWeight:"600",fontSize:"18px",color:"#17177d",cursor:"pointer"}} onClick={()=>onClickFunc()}>SignIn</span></p>
      </div>
      <style jsx>
        {`
          .loaderPage{
            position:absolute;
            height:100%;
            width:100%;
            background:transparent;
            display:flex;
            align-items:center;
            justify-content:center;
          }
        `}
        </style>
    </div>
  )
}

export default SignupP;

