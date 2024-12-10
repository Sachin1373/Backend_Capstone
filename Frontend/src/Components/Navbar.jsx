import styles from "../Styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import rec1 from "/public/Rectangle1.png";
import rec2 from "/public/Rectangle2.png";
import { AuthContext } from "../Context/AuthContext";
import rec3 from "/public/Rectangle3.png";
import { useContext } from "react";

const Navbar = ({ onLogut }) => {
  const redirect = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className={styles.nav}>
      {/* Rectangles Positioned Inside Navbar */}
      <img src={rec1} alt="Rectangle 1" className={styles.rectangle1} />
      <img src={rec2} alt="Rectangle 2" className={styles.rectangle2} />
      <img src={rec3} alt="Rectangle 3" className={styles.rectangle3} />

      <h3 className={styles.title}>Jobfinder</h3>
      {isLoggedIn ? (
        <div className={styles.loginView}>
          <span onClick={logout}>
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
