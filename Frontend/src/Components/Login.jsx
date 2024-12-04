import React from "react";
import styles from "../Styles/Login.module.css"; 
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import img from "../assets/Register.png";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const redirect = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        localStorage.setItem(
          "UserDetails",
          JSON.stringify({
            token: result.token,
            Username: result.username,
            expiry: new Date().getTime() + 60 * 60 * 1000,
          }))
          setTimeout(()=>{
            redirect('/')
          },2000)
      } else {
        const error = await response.json();
        // toast.error(error.message || "Invalid credentials.");
      }
    } catch (error) {
      // toast.error("An error occurred while logging in.");
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <div className={styles.register_wrapper}>
        <div className={styles.form_wrapper}>
          <div className={styles.form}>
              <div>
              <h1>Already have an account?</h1>
              <p>Your Personal job finder is here</p>
              </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
              </p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
              </p>
              <div className={styles.loginbtn}>
                <button className={styles.btn}>Login</button>
              </div>
            </form>
            <div className={styles.already_registerd}>
              <span>Don’t have an account?</span>
              <span className={styles.login} onClick={() => redirect("/register")}>
                Sign Up
              </span>
            </div>
          </div>
        </div>
        <div className={styles.img}>
          <img src={img} alt="Login Illustration" />
        </div>
        <div className={styles.img_heading}>
          <p>Your Personal Job Finder</p>
        </div>
      </div>
      
    </>
  );
}

export default Login;
