import React from 'react'
import Footer from '../component/FooterComp/Footer'
import UserProfile from '../component/UserProfileComp/UserProfile'
import { useRouter } from 'next/router'
const profile = () => {
  const router = useRouter();
  return (
    <div >
       <UserProfile userid={router.query.id}/>
        <Footer/>
    </div>
   
  )
}

export default profile