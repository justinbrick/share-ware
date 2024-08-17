'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { confirmAuthorization } from "../auth";


export default function Auth() {
    const router = useRouter();
    useEffect(() => {
        confirmAuthorization().then((token) => {
            localStorage.setItem("token", JSON.stringify(token));
            router.push("/");
        }).catch(e => {
            console.error(e);
        });
    });

}