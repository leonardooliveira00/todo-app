"use client";

import { useEffect, useState } from "react";

import { getMe } from "@/services/auth-service";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
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
    <header className="sticky flex justify-between p-6 bg-gray-900 text-white">
      <h2>TaskForce</h2>
      {user && <p>Olá, {user.name}.</p>}
      <Button className="bg-transparent">
        <LogOut /> Sair
      </Button>
    </header>
  );
}
