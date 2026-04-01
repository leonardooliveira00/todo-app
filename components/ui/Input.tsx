"use client";

import styles from "./Input.module.css";

type Props = {
  icon: React.ReactNode;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export default function Input({
  icon,
  type,
  id,
  value,
  onChange,
  label,
}: Props) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        {icon}

        <input
          className={styles.input}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder=" "
          required
        />

        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}
