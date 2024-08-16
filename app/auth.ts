import { generateCodeVerifier, OAuth2Client, OAuth2Fetch, OAuth2Token } from "@badgateway/oauth2-client";
import * as authInfo from "../auth.json";

export const redirectUri = window.location.origin + "/auth";

export const client = new OAuth2Client(authInfo);

export async function redirectForAuthorization() {
    const verification = await generateCodeVerifier();
    localStorage.setItem("code_verifier", verification);
    document.location = await client.authorizationCode.getAuthorizeUri({
        redirectUri: redirectUri,
        codeVerifier: verification,
        scope: [""]
    });
}

export async function confirmAuthorization() {
    const verification = localStorage.getItem("code_verifier");
    if (!verification) {
        // no bueno...
        throw new Error("Tried to verify code with no code verifier... malicious?");
    }

    const authorization = await client.authorizationCode.getTokenFromCodeRedirect(document.location.href, {
        redirectUri: redirectUri,
        codeVerifier: verification
    });

    localStorage.removeItem("code_verifier");

    return authorization;
}

export const authFetch = new OAuth2Fetch({
    client: client,
    getNewToken: async () => {

        return await client.authorizationCode.
    }
})