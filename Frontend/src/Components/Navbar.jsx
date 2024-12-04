import styles from "../Styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import rec1 from "../assets/Rectangle1.png";
import rec2 from "../assets/Rectangle2.png";
import rec3 from "../assets/Rectangle3.png";
import { useState, useEffect } from "react";

const Navbar = ({ onLogut }) => {
  const redirect = useNavigate();
  const [loggedin, setloggedin] = useState(false);

  //   const tokenTime = JSON.parse(localStorage.getItem("recuirterDetail"));
  //   useEffect(() => {
  //     const currentTime = new Date().getTime();
  //     const logg =
  //       tokenTime !== null
  //         ? tokenTime.expiry > currentTime
  //           ? true
  //           : false
  //         : false;
  //     setloggedin(logg);
  //   }, [tokenTime]);

  return (
    <div className={styles.nav}>
      {/* Rectangles Positioned Inside Navbar */}
      <img src={rec1} alt="Rectangle 1" className={styles.rectangle1} />
      <img src={rec2} alt="Rectangle 2" className={styles.rectangle2} />
      <img src={rec3} alt="Rectangle 3" className={styles.rectangle3} />

      <h3 className={styles.title}>Jobfinder</h3>
      {loggedin ? (
        <div className={styles.loginView}>
          <span
            onClick={() => {
              
              setloggedin(false);
              onLogut();
              localStorage.removeItem("recuirterDetail");
            }}
          >
            Logout
          </span>
          <span>Hello! Recruiter</span>
          <div className={styles.recruiterLogo}>S</div>
        </div>
      ) : (
        <div className={styles.logoutView}>
          <button onClick={() => redirect("/login")}>Login</button>
          <button onClick={() => redirect("/register")}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
