'use client'

import * as Graph from "@microsoft/microsoft-graph-types";
import { getAuthFetch, redirectForAuthorization } from "./auth";

async function getUserProfile() {
  const response = await getAuthFetch().fetch("https://graph.microsoft.com/v1.0/me?$select=displayName,userPrincipalName");
  return response.json() as Pick<Graph.User, "displayName" | "userPrincipalName">;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <button onClick={redirectForAuthorization}>
        Click me! (Authorize)
      </button>
      <button onClick={getUserProfile}>
        Click me! (Get User Profile)
      </button>
    </main>
  );
}
