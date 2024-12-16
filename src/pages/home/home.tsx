import styles from "./home.module.css";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleRedirect = (_plan_id : number) => { 
    navigate(`/plans/setup/${_plan_id}`);
  }
  
  const features_plan_1 = {
    'language': 'Node.js',
    'cpu': '1 CPU core',
    'ram': '250 MB RAM',
    'storage': '300 MB storage'
  }
  
  const features_plan_2 = {
    'language': 'Node.js',
    'cpu': '1 CPU core',
    'ram': '500 MB RAM',
    'storage': '500 MB storage',
    'database': 'MySQL database'
  };

  const features_plan_3 = {
    'language': 'Node.js',
    'cpu': '2 CPU core',
    'ram': '600 MB RAM',
    'storage': '1GB storage',
    'database': 'MySQL database',
    'cache': 'Redis'
  }
   
  return (
    <section className={styles.pricing}>
      <h1>Choose plan for your application</h1>
      <p>Some plan that help your choice is easier</p>
      <div className={styles['pricing-cards']}>
        <div className={styles.card}>
          <h1 style={{color: "black"}}>Plan 1</h1>
          <h3 style={{color: "black"}}>Normally</h3>
          <button className={styles.button} onClick={() => handleRedirect(1)}>Subscribe Now</button>
          <div className={styles["feature-list"]}>
          {Object.entries(features_plan_1).map(([, value], index) => (
              <div key={index} className={styles["feature-item"]}>
                <span className={styles["check-icon"]}>✔</span>
                {value} {}
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.card} ${styles["highlighted"]}`}>
          <h1 style={{color: "black"}}>Plan 2</h1>
          <h3 style={{color: "black"}}>Advanced</h3>
          <button className={styles.button} onClick={() => handleRedirect(2)}>Subscribe Now</button>
          <div className={styles["feature-list"]}>
            {Object.entries(features_plan_2).map(([, value], index) => (
              <div key={index} className={styles["feature-item"]}>
                <span className={styles["check-icon"]}>✔</span>
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <h1 style={{color: "black"}}>Plan 3</h1>
          <h3 style={{color: "black"}}>Great</h3>
          <button className={styles.button} onClick={() => handleRedirect(3)}>Subscribe now</button>
          <div className={styles["feature-list"]}>
            {Object.entries(features_plan_3).map(([, value], index) => (
              <div key={index} className={styles["feature-item"]}>
                <span className={styles["check-icon"]}>✔</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;