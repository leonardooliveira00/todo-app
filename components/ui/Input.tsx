"use client";

type Props = {
  icon: React.ReactNode;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

import { CheckCircle, XCircle } from "lucide-react";

export default function Input({
  icon,
  type,
  id,
  value,
  onChange,
  label,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-1">
      <div
        className={
          "group flex relative items-center border-b-2 border-slate-300 bg-transparent focus-within:border-blue-600"
        }
      >
        <span className="group-focus-within:text-blue-600 pointer-events-none absolute left-3 text-slate-400 transition-colors">
          {icon}
        </span>

        <input
          className="peer w-full placeholder-transparent bg-transparent outline-0 border-none pl-10 pt-1.5 pb-1.5"
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder=" "
          required
        />

        <label
          htmlFor={id}
          className="pointer-events-none absolute transition-all left-10 top-1/2  text-slate-500 peer-placeholder-shown:text-base -translate-y-1/2 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
