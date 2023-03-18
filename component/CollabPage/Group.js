 import React from 'react'
import { useState } from 'react'
 import CreateGroup from './CreateGroup'
 import style from './style.module.scss'
 import { useSelector } from 'react-redux'
 import axios from 'axios';
 const base_url = process.env.NEXT_PUBLIC_URL;
 import useSWR from 'swr';
import Filter from './Filter';


 const Group = () => {
    const [open,setOpen] = useState(false);
    const user = useSelector((state)=>state.user);
    const [load,setLoad]=useState(true);
    const [myWork,setMyWork] = useState(false);
    const [grouppost2,setgroupPost2] = useState([]);

    const MailMessage = async (e,toemail,describe)=>{
        e.preventDefault();
        console.log(toemail);
        const res = await axios.post(`${base_url}/api/mail/`,{myemail:user.email,name:user.name,toemail:toemail,desc:describe});
    }

    const{data,error} = useSWR(user._id===null?null:`${base_url}/api/group/fetch`,async function fetcher(){
        let arr = new Set([]);
        console.log(user.categoryId);
        await Promise.all(user.categoryId.map(async(cat)=>{
            const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=groupIds`);
            console.log(res.data.result);
                if(res.data.result.length!==0){
                    res.data.result[0]?.GroupsIds.map((ids)=>{
                        arr.add(ids)
                    })
                }
        }))
        console.log(arr);
        let groupPost = [];
        await Promise.all(Array.from(arr).map(async(id)=>{
            const res= await axios.get(`${base_url}/api/group/fetch?id=${id}`);
            if(res.data.result!==null){
                groupPost.push(res.data.result);
            }
        }))

        const rest = await axios.get(`${base_url}/api/group/usergroup?userId=${user._id}`);
        let mypost=[];
        if(rest.data.result.groupId.length!==0){
            await Promise.all(rest.data.result.groupId.map(async(d)=>{
                const res= await axios.get(`${base_url}/api/group/fetch?id=${d}`);
                console.log(d);
                if(res.data.result!==null){
                    mypost.push(res.data.result);
                }
            }))
        }
        setgroupPost2(mypost);
        {console.log(groupPost)}
        return groupPost;
    },{revalidateOnFocus: false,
        revalidateOnMount:true,
        revalidateOnReconnect: true,
        refreshWhenOffline: true,
        refreshWhenHidden: true,
        refreshInterval: 0});
    if(error){
        return<>{error.message}</>
    }
    
    if (!data) return 
    (setTimeout(()=>{
        setLoad(false);
      },1000)
    )

   return (
    <div className={style.groupFrame}> 
        
        <div className={style.createPost} onClick={()=>setOpen(true)}>Post</div>
        <Filter opt={"group"} setMyWork={setMyWork}/>
        {open===true && (<CreateGroup setOpen={setOpen}/>)}
         {data!==null && myWork===false && (
             <div style={{width:"95%",paddingBottom:"30px"}}>{
                data.map((d,ind)=>(
                    <div className={style.groupBox} key={ind+'gp'}>
                        <div className={style.head}>
                            <img src={d?.image}></img>
                            <div className={style.nameTitle}>
                                <h4 style={{marginBottom:"2px"}}>{d?.name}</h4>
                                <span>{d?.location}</span>
                            </div>
                            <h4 className={style.compensation}>{d?.Compensation}</h4>
                        </div>
                        <div className={style.body}>
                            <h2>{d?.title}</h2>
                            <p>{d?.description}</p>
 
                            <div>
                                <h2>About Group</h2>
                                <p>{d?.about}</p>
                            </div>
                            <p style={{fontWeight:"600"}}>Required Skills</p>
                            <div>
                            {
                                d?.category.map((cat,indx)=>(
                                    <span key={indx+"mc"}>{cat}</span>
                                ))
                            }
 
                            </div>     
                        </div>
                        <div className={style.dock} onClick={(e)=>MailMessage(e,d?.groupEmail,d?.title)}>
                            {console.log(d?.groupEmail)}
                            <button>dock</button>
                        </div>
                    </div>
                ))
            }
        </div>
        )}

        {data!==null && myWork===true && (
            <div style={{width:"95%",paddingBottom:"30px"}}>
                {grouppost2.map((d)=>(
                    <div className={style.groupBox}>
                    <div className={style.head}>
                        <img src={d?.image}></img>
                        <div className={style.nameTitle}>
                            <h4 style={{marginBottom:"2px"}}>{d?.name}</h4>
                            <span>{d?.location}</span>
                        </div>
                        <h4 className={style.compensation}>{d?.Compensation}</h4>
                    </div>
                    <div className={style.body}>
                        <h2>{d?.title}</h2>
                        <p>{d?.description}</p>

                        <div>
                            <h2>About Group</h2>
                            <p>{d?.about}</p>
                        </div>
                        <p style={{fontWeight:"600"}}>Required Skills</p>
                        <div>
                        {
                            d?.category.map((cat,indx)=>(
                                <span key={indx+"mc"}>{cat}</span>
                            ))
                        }

                        </div>     
                    </div>
                    {/* <div className={style.dock} onClick={(e)=>MailMessage(e,d?.groupEmail,d?.title)}>
                        {console.log(d?.groupEmail)}
                        <button>dock</button>
                    </div> */}
                </div>
                ))}
            </div>
        )}
    </div>
   )
 }
 
 export default Group