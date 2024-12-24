import styles from "./home.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../env";

interface Plan {
  id: number;
  type: string;
  name: string;
  storage_in_mb: number;
  ram_in_mb: number;
  cpu_cores: number;
  has_redis: boolean;
  has_mysql: boolean;
  monthly_fee_in_usd: number;
}


// Fetch a specific plan by ID
const fetchPlanById = async (planId: number): Promise<Plan> => {
  try {
    const response = await axios.get<Plan>(`${BACKEND_URL}/plans/${planId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data; // Handle API errors
    }
    throw new Error('Failed to fetch plan');
  }
}

const getFeaturesPlan = async (planId : number): Promise<string[]> => {
  const plan = await fetchPlanById(planId);

  return [
    'Node.js', // Assuming this is fixed
    `${plan.cpu_cores} CPU core${plan.cpu_cores > 1 ? 's' : ''}`,
    `${plan.ram_in_mb} MB RAM`,
    `${plan.storage_in_mb} MB storage`,
  ];
};

function Home() {
  const navigate = useNavigate();

  const handleRedirect = (_plan_id : number) => { 
    navigate(`/plans/setup/${_plan_id}`);
  }

  const [features_plan_1, set_features_plan_1] = useState([] as string[])
  const [features_plan_2, set_features_plan_2] = useState([] as string[])
  const [features_plan_3, set_features_plan_3] = useState([] as string[])

  useEffect(() => {
    const fetchFeatures = async () => {
      const [a, b, c] = await Promise.all([
        getFeaturesPlan(1),
        getFeaturesPlan(2),
        getFeaturesPlan(3),
      ]);

      set_features_plan_1(a);
      set_features_plan_2(b);
      set_features_plan_3(c);
    }

    fetchFeatures();
  });

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