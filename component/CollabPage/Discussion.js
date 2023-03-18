import React from 'react'
import style from './style.module.scss';
import { useState } from 'react';
import CreateDiscussion from './CreateDiscussion';
import useSWR from 'swr';
const base_url = process.env.NEXT_PUBLIC_URL;
import {useSelector} from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../../utils/fireconnect';
import Link from 'next/link';
import Filter from './Filter';
import CircleLoader from "react-spinners/CircleLoader";

const Discussion = () => {
    const user = useSelector((state)=>state.user);
    const [open,setOpen] = useState(false);
    
    const [categorydiss,setcategorydiss] = useState([]);
    const [load,setLoad]=useState(true);
    const[disData,setDisData] = useState(undefined);

    const [myWork,setMyWork] = useState(false);




    const {data,error} = useSWR(user._id===null?null:`${base_url}/api/post/discusspost`,async function fetcher(){
        let arr = new Set([]);
        await Promise.all(user.categoryId.map(async(cat)=>{
            const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=DiscussionIds`);
            if(res.data.resp.length!==0)
                res.data.resp[0].DisscussionId.map((dat)=>{
                    arr.add(dat);
                })
        }));
        setcategorydiss(Array.from(arr));
        let discussPost =[];
        console.log(arr);
        await Promise.all(Array.from(arr).map(async(id)=>{
            if(id!==''){
                const docRef=doc(db,'discussion',id);
                const docSnap=await getDoc(docRef);
                if(docSnap.exists()){
                    const data = docSnap.data();
                    data.id= id;
                    discussPost.push(data);
                }
            }
        }))
        console.log(discussPost);
        setDisData(discussPost);
        return discussPost;
    });
    
   
  return (
    <div className={style.groupFrame}> 
        {console.log("disData->"+data)}
        <div className={style.createPost} onClick={()=>setOpen(true)}>Ask</div>
        <Filter opt={"Discussion"} setMyWork={setMyWork}/>
        {open===true && <CreateDiscussion setOpen={setOpen}/>}
        {disData===undefined && <div style={{width:"95%"}}>Loading...</div>}
        {myWork===false && disData!==undefined && <div style={{width:"95%"}}>{
                disData.map((d,ind)=>(
                   
                    <div className={style.groupBox} key={ind+'gp'}>
                         {console.log(d)}
                        <div className={style.head}>
                            <img src={d?.image}></img>
                            <div className={style.nameTitle}>
                                <h4>{d?.name}</h4>
                                <span>{d?.time}</span>
                            </div>
                            <h4 className={style.compensation}>{d?.Compensation}</h4>
                        </div>
                        <div className={style.body}>
                            <h2>{d?.title}</h2>
                            <p>{d?.description}</p>
                            <div>
                            {
                                d?.category.map((cat)=>(
                                    <span>{cat}</span>
                                ))
                            }
                            </div>     
                        </div>
                        <div className={style.chatCont}>
                            <Link href={
                                {
                                    pathname:'/chat',
                                    query:{id:d.id}
                                }
                            }>Start Discussion</Link>
                        </div>
                    </div>
                ))
            }
        </div>}

        {myWork===true && <div style={{width:"95%",textAlign:"center"}}>
                <h2 style={{margin:"10px auto"}}>You have no discussion</h2>
        </div>}

    </div>
  )
}

export default Discussion