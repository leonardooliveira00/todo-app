"use client";

import { useEffect, useState } from "react";

import { getMe } from "@/services/auth-service";

import styles from "./DashboardHeader.module.css";

export default function DashboardHeader() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, []);
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>TaskForce</h2>
      {user && <p>Olá, {user.name}.</p>}
      <button className={styles.logout}>Sair</button>
    </header>
  );
}
