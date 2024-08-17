'use client'

import Image from "next/image";
import { getAuthFetch } from "./auth";
import { redirectForAuthorization } from "./auth";

async function getUserProfile() {
  const response = await getAuthFetch().fetch("https://graph.microsoft.com/v1.0/me?$select=displayName,userPrincipalName");
  console.log(await response.json())
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <button onClick={redirectForAuthorization}>
        Click me! (Authorize)
      </button>
      <button onClick={getUserProfile}>
        Click me! (Get User Profile)
      </button>
    </main>
  );
}
