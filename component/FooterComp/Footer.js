import React from 'react'
import style from './footer.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useSelector } from 'react-redux';
const Footer = () => {
    const route = useRouter();
    const userdata= useSelector((state)=>state.user);
    let user = userdata._id;
    if (typeof window !== 'undefined') {
      user=localStorage.getItem("userId");
    }
    const handleRoute = (path)=>{
        route.push(path, null, { shallow: true });
    }
  return (
    <div  className={style.footer}>
        <img onClick={()=>handleRoute('/feed')} src={'/images/home.svg'}></img>
        {/* <img onClick={()=>handleRoute('/swr')} src={'/images/home.svg'}></img> */}
        <img onClick={()=>handleRoute('/explore')} src={'/images/explore.svg'}></img>
        <img onClick={()=>handleRoute('/collab')} src={'/images/group.svg'}></img>
        <Link href={{
            pathname: '/profile',
            query: { id: `${user}` },
          }}>
          <img src={'/images/profile.svg'}></img>
        </Link>
    </div>
  )
}

export default Footer