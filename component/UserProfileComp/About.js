import React from 'react'
import style from './profile.module.scss';
import { motion,AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const CompSection = ({exp})=>{
    return(
        <div className={style.compCont}>
            <div className={style.compImg}><img style={{width:"100%",height:"100%",backgroundSize:"cover"}} src={'images/default_com.png'}></img></div>
            <div className={style.compInfo}> 
                <h3 style={{}}>{exp.companyname}</h3>
                <h5>{exp.position}</h5>
                <p>{exp.emplotype},{exp.edustartyear}-{exp.eduendyear}</p>
            </div>
        </div>
    )
}

const SchoolSection = ({educ})=>{
    return(
        <div className={style.compCont}>
            <div className={style.compImg}><img style={{width:"100%",height:"100%",backgroundSize:"cover"}} src={'images/defaul_school.png'}></img></div>
            <div className={style.compInfo}> 
                <h3 style={{}}>{educ.schoolname}</h3>
                <h5>{educ.degree}</h5>
                <p>{educ.edustartyear}-{educ.eduendyear}</p>
            </div>
        </div>
    )
}

const ProjectSection = ({proj})=>{
    return(
        <div className={style.ProjCont}>
            <div  style={{width:"100%",height:"120px"}} className={style.projImg}><img style={{width:"100%",height:"100%",backgroundSize:"contains"}} src={'images/proj_dummy.jpg'}></img></div>
            <Link className={style.ProjInfo} href ={proj.link}> 
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
            </Link>
        </div>
    )
}

const LinkSection = ({interest})=>{
    return(
        <div className={style.LinkCont}>
            <Link href={interest.link}>{interest.platform}</Link>
        </div>
    )
}


const About = () => {
    const user = useSelector((state)=>state.user);
  return (
    <div className={style.optionContainer}>
        {
        user.About && (<div className={style.Sec}>
            <h2>About</h2>
            <p>my self doidehf pijwd fodejf pidwjf piwd jfpiipeifjfi pewifhohfp fpoidwhfdwpif i9pfuepife poiwf hepwjh pefij pwfj poj f pifj rp</p>
        </div>)
        }
        {
            user.experienceId && (<div className={style.Sec} >
                 <h2>Experince</h2>
                 {user.experienceId.map((exp,idx)=>(
                    <>
                     <CompSection exp={exp} key={"exp"+idx}/>
                     <div className={style.seprate}></div>
                    </>
                 ))}
            </div>)
            
        }
        {
            user.educationId && (<div className={style.Sec} >
                 <h2>Education</h2>
                 {user.educationId.map((exp,idx)=>(
                    <>
                     <SchoolSection educ={exp} key={"educ"+idx}/>
                     <div className={style.seprate}></div>
                    </>
                 ))}
            </div>)
            
        }
        {
            user.projectId && (<div className={style.Sec} >
                 <h2>Projects</h2>
                 {user.projectId.map((exp,idx)=>(
                    <>
                     <ProjectSection key={"proj"+idx} proj={exp}/>
                     <div className={style.seprate}></div>
                    </>
                 ))}
            </div>)
            
        }
        {
            user.skillId && (<div className={style.Sec} >
                <h2>Skills</h2>
                <div className={style.skillCont}>
                    {user.skillId.map((exp,idx)=>(
                        <>
                        <motion.p key={"skill"+idx} whileHover={{scale:"1.1"}} transition={{type: "tween",duration:"1.5"}}>{exp}</motion.p>
                        </>
                    ))}
                </div>
            </div>)
            
        }

{
            user.linkId && (<div className={style.Sec} >
                <h2>Interests</h2>
                    {user.linkId.map((exp,idx)=>(
                        <LinkSection interest={exp} key={"intersest"+idx}/>
                    ))}
            </div>)
            
        }
    </div>
  )
}

export default About