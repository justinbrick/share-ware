'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { confirmAuthorization } from "../auth";


export default function Auth() {
    const router = useRouter();
    useEffect(() => {
        if (!document.location.pathname.startsWith("/auth")) {
            return;
        }

        const uri = document.location.toString();
        confirmAuthorization(uri).then((token) => {
            localStorage.setItem("token", JSON.stringify(token));
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            router.replace("/");
        });
    }, [router]);

    return (
        <main className="flex flex-col items-center p-8">
            <p className="text-6xl">Authorizing...</p>
        </main>
    );
}