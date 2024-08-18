'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { confirmAuthorization } from "../auth";


export default function Auth() {
    const router = useRouter();
    useEffect(() => {
        // i cannot, for the life of me, get this out of my dev environment on firefox... i'm hoping this is a bug in the browser.
        // it's not an issue if this can't be fixed, since it's authcode flow and the code is only valid once, but still annoying.
        // TODO: verify this is a bug in the browser on a website with non-localhost domain
        const uri = document.location.href;
        window.history.replaceState({}, "", "/");
        confirmAuthorization(uri).then((token) => {
            localStorage.setItem("token", JSON.stringify(token));
            router.replace("/");
        }).catch(e => {
            console.error(e);
        });
    });

    return (
        <main className="flex flex-col items-center p-8">
            <p className="text-6xl">Authorizing...</p>
        </main>
    );
}