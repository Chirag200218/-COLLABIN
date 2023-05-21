import axios from "axios";
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
const base_url = process.env.NEXT_PUBLIC_URL;
import { useDispatch } from 'react-redux';
import {CreateId} from '../../redux_feature/UserInfo/userSlice';
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode"
import styles from "../../styles/signin.module.scss"
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import HashLoader from "react-spinners/HashLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";

const SigninP = () => {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const Userid = useSelector((state)=>state.user._id);
    const dispatch = useDispatch();
    const [intro,setIntro]=useState(true);
    const [load,setLoad] = useState(false);

    const onSubmit = async(data) => {
        try {
          setLoad(true);
          const result = await axios.get(`${base_url}/api/auth/isuser?email=${data.email}&password=${data.password}`)
          if(result.data.success===true){
            localStorage.setItem("userId", result.data.id);
            const res = await axios.get(`${base_url}/api/details/user?id=${result.data.id}`);
            dispatch(CreateId(res.data.result));
            console.log(res.data.result);
            router.push("/feed");
          }else{
            console.log(result.data.message);
          }
          setLoad(false);
        } catch (error) {
          console.log("----------------------signinError--------------------------")
          console.log(error);
          setLoad(false);
        }
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
        dispatch(CreateId(user));
    }

      useEffect(()=>{
        if(Userid!==null){
          router.push("/feed");
        } 
        setTimeout(()=>{
          setIntro(false);
        },4000)
      },[Userid])

      const onClickFunc=()=>{
        router.push("/logus");
      }


    return (
      <>
        {intro && 
        <div className={styles.loader}>
          <HashLoader color="#369cd6" loading={intro} size={50}  />
          <h3>Find your Complement</h3>
        </div>}
        {
          load && (
            <div className="loaderPage">
              <ClipLoader color="#36d7b7" />
            </div>
          )

        }
        <div className={styles.deskTop}>
          <h1 style={{margin:"auto"}}>Please open web application on mobile.</h1>
        </div>
        <div className={styles.frame}>
           <p style={{fontFamily:"cursive",fontStyle:"oblique",fontWeight:"600",fontSize:"44px"}}>WelCome</p>
           <p style={{fontSize:"35px"}}>Glad to see you</p>
           <div className={styles.box}>
              <div className={styles.innerbox}>
               
                <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" name="email" {...register("email",{required: true})} placeholder=" Email:" className={styles.input}/>
                        <input type="password" name="password" {...register("password",{required: true,minLength: 6})} placeholder="Password" className={styles.input}/>
                    <motion.button whileTap={{scale:"0.8"}} type="submit">Sign In</motion.button>
                </form>
              </div>
              <div style={{display:"flex",alignItems:"center",marginBottom:"10px",margin:"20px auto",width:"170px"}}><div style={{width:"60px",borderBottom:"0.5px solid grey",marginRight:"10px"}}></div>OR<div style={{width:"60px",borderBottom:"0.5px solid grey",marginLeft:"10px"}}></div></div>
              <div style={{width:"200px",margin:"auto"}}>
              {<GoogleLogin
                  onSuccess={(res)=>CreateorGetUser(res)}
                  onError={(res)=>console.log("google login error",res)}
                />}
              </div>
           </div>
           
           <p style={{"color":"#17177d",marginTop:"40px"}}>Already a user?<span style={{marginLeft:"7px",fontWeight:"600",fontSize:"18px",color:"#17177d",cursor:"pointer"}} onClick={()=>onClickFunc()}>signup</span></p>
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
      </>
      )
    };

export default SigninP;





