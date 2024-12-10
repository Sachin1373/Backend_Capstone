import React, { useState,useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { AuthContext } from '../Context/AuthContext';
import styles from "../Styles/JobCard.module.css";

function JobCard({ job }) {
  const [jobid,setjobid]=useState("");
  // const [loggedin, setloggedin] = useState(false);
     const {isLoggedIn} = useContext(AuthContext)
    const redirect = useNavigate();
  
    // const userdetails = JSON.parse(localStorage.getItem("UserDetails"))
    // const tokenTime = userdetails?.expiry; 
  
    // useEffect(() => {
    //   const currentTime = new Date().getTime();
    //   const logg =
    //     tokenTime !== null
    //       ? tokenTime > currentTime
    //         ? true
    //         : false
    //       : false;
    //   setloggedin(logg);
    // }, [tokenTime]);
  
  const handleViewDetailsClick = (id) =>{
      setjobid(id)
      redirect(`/JobDetails/${id}`)
  }
  return (
    <>
    <div className={styles.jobCard}>
        <div className={styles.left_card}>
           <div className={styles.log_details}>
           <div className={styles.logo}>
            <img src={job?.logoUrl} alt={`logo`} className={styles.companyLogo} />
          </div>
        <div className={styles.details}>
          <h2 className={styles.jobTitle}>{job.jobPosition}</h2>
           <div className={styles.salry_team}>
             <p><FaUserGroup />{job.currentsize}/{job.totalsize}</p>
             <p className={styles.salary}>₹ {job.salary}</p>
           </div>
            <div className={styles.mode}>
              <span className={styles.mode}>{job.mode}</span>
              <span className={styles.jobType}>{job.jobType}</span>
            </div>
        </div>
           </div>
        <div className={styles.location}>
          <span className={styles.location}>{job.location}</span>
        </div>
        </div>
         <div className={styles.right_card}>
         <div className={styles.skills}>
            <div className={styles.skill}>
                {job.skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>{skill}</span>
                ))}
            </div>
                
        </div>
          <div className={styles.btn}>
            {isLoggedIn && <button className={styles.viewDetailsBtn} onClick={() => redirect('/addjobs')}>Edit</button> } 
             <button className={styles.viewDetailsBtn} onClick={() => handleViewDetailsClick(job._id)}>View Details</button>
          </div>
         </div>
    </div>
    
    
    </>
  );
}

export default JobCard;
