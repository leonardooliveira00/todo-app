import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

//styles
import styles from "./auth.module.css";

export default function AuthPage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.left}>
          <LoginForm />
        </div>

        <div className={styles.right}>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
