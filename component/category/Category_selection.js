import React, { useEffect, useState } from 'react'
import {category_Data,allCategory} from '../category/category_data';
import styles from "./category.module.scss"
const base_url = process.env.NEXT_PUBLIC_URL;
import axios from 'axios';
import { useRouter } from 'next/router';
import { updateCategory } from '../../redux_feature/UserInfo/userSlice';
import {useDispatch,useSelector } from 'react-redux';
import styled from "styled-components";
import {motion} from 'framer-motion';


function Category_selection() {
  const [selected,setSelected] = useState([]);
  const user = useSelector((state)=>state.user);
  const [options,setOptions] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
	const [domainCat,setDomainCat] = useState(category_Data["Academics"]);
	const [selectedCats,setselectedCats] = useState(new Set());
	// const [alreadyselectedCats,SetalreadyselectedCats] = useState(new Set(user.catergoryId));

  const[toggle,setToggle] = useState(0);

 

  
  
  const handleSubmit = async()=>{
    const Id=localStorage.getItem("userId");
    const url =`${base_url}/api/details/user`;
	const cat = Array.from(new Set(selectedCats,user.catergoryId));
    try{
      const res=await axios.put(url,{selectedCats:cat,id:Id });
      const r = await axios.post(`${base_url}/api/categorys/updateCategories`,{category:cat,userId:Id});
      console.log(r);
      dispatch(updateCategory(cat))
      router.push("/feed");
    }catch(err){
      console.log(err);
    }
  }

   

  const HandleMainCategory = ()=>{
		let arr=[];
		for(let x in category_Data){
			arr.push(x);
		}
		return(
			<>	
				{arr.map((data,idx)=>(
					<button key={idx} style={{border:toggle===idx?"2px solid #1086e8":"",backgroundColor:toggle===idx?"white":"white"}} onClick={()=>{setDomainCat(category_Data[data]),setToggle(idx)}}>{data}</button>
				))}
			</>
		)
	}
	const HandleSubCategories = ()=>{
		 return(
			<>	
				{domainCat.map((data,idx)=>(
					<button key={idx} style={{boxShadow:selectedCats.has(data.toLowerCase())?"rgba(0, 0, 0, 0.35) 0px -35px 40px -34px inset":"",border:selectedCats.has(data.toLowerCase())?"0.4px solid #e4e4e4":"",backgroundColor:selectedCats.has(data.toLowerCase())?"#2f60c9":"",color:selectedCats.has(data.toLowerCase())?"white":"black"}}onClick={()=>handleCatClick(data)}>{data}</button>
				))}
			</>
		)
	}

  const handleCatClick = (data)=>{
    if(selectedCats.has(data.toLowerCase())){
      let arr = new Set([]);
      Array.from(selectedCats).map((cat)=>{
        if(cat!==data.toLowerCase()){
          arr.add(cat);
        }
      })
      setselectedCats(arr);
    }else{
      setselectedCats(previousState => new Set([...previousState, data.toLowerCase()]));
    }
	
	}

	const handleSearch = (e)=>{
		const  text = e.target.value.toLowerCase();
		if(text.length===0){
			setOptions([]); 
			return;
		}
		let arr=[];
		allCategory.map((data)=>{
		let str = data.toLowerCase();
		if(str.search(text)!==-1){
			arr.push(str);
		}})
		setOptions(arr); 
		console.log(options)
	}


  return (
    <div className={styles.catCont} style={{padding:"10px 0px"}}>
        <h1>Choose your Interests</h1>
        

        <div className={styles.CategorySection}>
            <input type='text'placeholder="Search your category" onChange={(e)=>handleSearch(e)}/>
            
            {options.length>=1 && 
            <div className ={styles.Option}>{
              options.map((data,idx)=>(
                <>
                  <button key={idx+"@"+data} style={{backgroundColor:selectedCats.has(data)?"blue":"white"}}onClick={()=>handleCatClick(data)}>{data}</button>
                </>
              ))	
            }
            </div>}
            <div className ={styles.Categories}>
              <HandleMainCategory/>
            </div>
            <div className ={styles.SubCategory}>
              <HandleSubCategories/>
            </div>
          </div>
          <button as={motion.button} whileTap={{scale:0.8}} className={styles.button} onClick={(e)=>handleSubmit(e)}>submit</button>
    </div>
    
  )
}

export default Category_selection;