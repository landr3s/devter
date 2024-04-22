"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { GitHubIcon } from "./icons";
import { useEffect, useState } from "react";

export function AuthButton() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="flex items-center justify-end bg-gray-500/60 h-24 w-full p-4">
      {session === null ? (
        <button
          onClick={handleSignIn}
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-[#050708]/30 me-2 mb-2"
        >
          <GitHubIcon />
          Iniciar sesion con Github
        </button>
      ) : (
        <button onClick={handleSignOut}>Cerrar sesion</button>
      )}
    </header>
  );
}
