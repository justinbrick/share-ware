import * as Graph from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { getAuthFetch } from "./auth";

export interface ISizeNavigatorProps {
    /**
     * the user, used to verify that the user is signed in
     */
    user?: Graph.User;
}

export default function SizeNavigator(props: ISizeNavigatorProps) {
    const [sites, setSites] = useState<Graph.Site[]>([]);

    useEffect(() => {
        if (!props.user) {
            return;
        }

        const getSites = async () => {
            const authFetch = getAuthFetch();
            const sites = await authFetch.fetch("https://graph.microsoft.com/v1.0/sites?search=*");
            setSites((await sites.json()).value as Graph.Site[]);
        };

        getSites();
    }, [props.user]);

    if (!props.user) {
        return (
            <main className="flex flex-col items-center p-8">
                <h1>You are not signed in.</h1>
                <h2>Before you can proceed, you must sign in on the Entra account you plan to check SharePoint statistics on.</h2>
            </main>
        )
    }

    return (
        <div className="flex flex-col items-center p-8">
            {sites.map(site => { return (<h1>{site.displayName}</h1>) })}
        </div>
    );
}