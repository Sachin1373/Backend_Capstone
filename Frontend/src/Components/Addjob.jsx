import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../Styles/AddJob.module.css";
import { useNavigate } from "react-router-dom";
import img from "/public/addjobimg.png";

const AddJob = () => {
  const userdetails = JSON.parse(localStorage.getItem("UserDetails"))
  const token = userdetails?.token; 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const redirect = useNavigate();

  const [inp, setinp] = useState('');
  const [skills, setskills] = useState([]);


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inp.trim() !== "") {
      e.preventDefault();
      setskills((prevSkills) => [...prevSkills, inp.trim()]);
      setinp(''); 
    }
  };

  const onSubmit = async (data) => {
    try {
      const jobData = { ...data, skills }; 
      const response = await fetch('http://localhost:8000/api/v1/job/addjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${token}`
        },
        
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const result = await response.json();
        reset()
        setskills([])
        // redirect('/');
        
      } else {
        const error = await response.json();
        console.log(error)
       
      }
    } catch (error) {
      console.log("Job data is not sent", error.message);
    }
  };

  return (
    <div className={styles.addjob}>
      <div className={styles.addjobleft}>
        <h1>Add job description</h1>
        <form className={styles.jobform} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.jobinput}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name here"
              {...register("companyName", { required: "This field is required" })}
            />
            {errors.companyName && <span>{errors.companyName.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="logoUrl">Logo URL</label>
            <input
              type="text"
              placeholder="Enter the link"
              {...register("logoUrl", { required: "This field is required" })}
            />
            {errors.logoUrl && <span>{errors.logoUrl.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              placeholder="Enter job position"
              {...register("jobPosition", { required: "This field is required" })}
            />
            {errors.jobPosition && <span>{errors.jobPosition.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="salary">Monthly Salary</label>
            <input
              type="text"
              placeholder="Enter Amount in rupees"
              {...register("salary", { required: "This field is required" })}
            />
            {errors.salary && <span>{errors.salary.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobType">Job Type</label>
            <select {...register("jobType", { required: "This field is required" })}>
              <option value="">Select</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
            {errors.jobType && <span>{errors.jobType.message}</span>}
          </div>
           
          <div className={styles.jobinput}>
            <label htmlFor="totalsize">Total Size</label>
            <input
              type="number"
              placeholder="Enter the total team size"
              {...register("totalsize", { required: "This field is required" })}
            />
            {errors.totalsize && <span>{errors.totalsize.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="currentsize">Current Size</label>
            <input
              type="number"
              placeholder="Enter the current team size"
              {...register("currentsize", { required: "This field is required" })}
            />
            {errors.currentsize && <span>{errors.currentsize.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="mode">Remote/Office</label>
            <select {...register("mode", { required: "This field is required" })}>
              <option value="">Select</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
            {errors.mode && <span>{errors.mode.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="location">Job Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              {...register("location", { required: "This field is required" })}
            />
            {errors.location && <span>{errors.location.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              placeholder="Type the job description"
              {...register("jobDescription", { required: "This field is required" })}
            />
            {errors.jobDescription && <span>{errors.jobDescription.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="aboutCompany">About Company</label>
            <textarea
              placeholder="Type about your company"
              {...register("aboutCompany", { required: "This field is required" })}
            />
            {errors.aboutCompany && <span>{errors.aboutCompany.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="skills">Skills Required</label>
            <input
              type="text"
              value={inp}
              onChange={(e) => setinp(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter the must-have skills and press Enter"
            />
            {errors.skills && <span>{errors.skills.message}</span>}
          </div>

          {/* Skills List Section */}
          <div className={styles.skillsContainer}>
            {skills.map((skill, idx) => (
              <div key={idx} className={styles.skillItem}>
                <div className={styles.skill}>
                  <span>{skill}</span>
                </div>
                <div className={styles.remove_skill}>
                  <button
                    type="button"
                    className={styles.removeSkillButton}
                    onClick={() => {
                      setskills((prevSkills) => prevSkills.filter((_, index) => index !== idx));
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="additionalInformation">Information</label>
            <input
              type="text"
              placeholder="Enter the additional information"
              {...register("additionalInformation")}
            />
          </div>

          <div className={styles.jobbuttons}>
            <button
              className={styles.canceladdJob}
              type="button"
              onClick={() => {
                redirect('/')
              }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.addjobbutton} onClick={()=>redirect('/')}>
              + Add Job
            </button>
          </div>
        </form>
      </div>

      <div className={styles.addjobright}>
        <div className={styles.img}>
          <img src={img} alt="photo" />
        </div>
      </div>
      <div className={styles.img_heading}>
        <p>Recruiter add job details here</p>
      </div>
    </div>
  );
};

export default AddJob;
