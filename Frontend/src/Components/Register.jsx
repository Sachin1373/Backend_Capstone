import React, { useState} from 'react'
import styles from '../Styles/Register.module.css'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import img from '/public/Register.png'
function Register() {
  const [isChecked,setisChecked] = useState(false)
  const [RegisterData,setRegisterData] = useState([])
  
  const redirect = useNavigate();
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

   const PostRegisterData = async(data) =>{
      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/signup',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
       
        if (response.ok) {
          const result = await response.json();
          
        } else {
          const error = await response.json();
        }
      } catch (error) {
        console.log("Registeres data is not send",error.message)
      }
   }

   const handlelogin = () =>{
     redirect('/login')
   }
   

  const onsubmit = (data) =>{
      setRegisterData(data)
      PostRegisterData(data)
  }
  const handleCheckboxChange = (e) =>{
    setisChecked((prev)=> !prev)
  }

  return (
   <>
     <div className={styles.register_wrapper}>
        <div className={styles.form_wrapper}>
          <div className={styles.form}>
          <h2>Create an account</h2>
          <span>Your Personal job finder is here</span>
          <form onSubmit={handleSubmit(onsubmit)}> 
            <p>
            <input type="text" placeholder='Name'
            {...register("name",{required:"Name is required"})}/>
            {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            </p>
             <p>
             <input type="email" placeholder='email' 
            {...register("email",{required:"Email is required", pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },})}
            />
             {errors.Email && <p style={{color:"red"}}>{errors.Email.message}</p>}
             </p>
            <p>
            <input type="text" placeholder='mobile'
            {...register("mobile",{required:"Mobile Number is required"})}/>
            {errors.Mobile && <p style={{color:"red"}} >{errors.Mobile.message}</p>}
            </p>
            <p>
              <input type="password" placeholder='Password'
              {...register("password",{required:"Password required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                
              })} />
              {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
            </p>
              <div className={styles.policy}>
                 <input type="checkbox" 
                  checked={isChecked}
                  className={styles.check}
                  onChange={handleCheckboxChange} />
                  <span>By creating an account, I agree to our terms of use and privacy policy</span>
              </div>
                  <div className={styles.createbtn}>
                     <button className={styles.btn} disabled={!isChecked}>Create Account</button>
                  </div> 
          </form>
          <div className={styles.already_registerd}>
             <span>Already have an account?</span>
             <span className={styles.login} onClick={handlelogin}>Sign In</span>
          </div>
          </div>
        </div>
        <div className={styles.img}>
            <img src={img} alt="Photo" />
        </div>
        <div className={styles.img_heading}>
          <p>Your Personal Job Finder</p>
        </div>
     </div>
     
   </>
  )
}

export default Register