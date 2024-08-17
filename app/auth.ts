import { generateCodeVerifier, OAuth2Client, OAuth2Fetch, OAuth2Token } from "@badgateway/oauth2-client";
import * as authInfo from "../auth.json";

export const client = new OAuth2Client(authInfo);


export const getVerificationCode = () => {
    const code = localStorage.getItem("code_verifier");
    if (!code) {
        throw new Error("No code verifier found in local storage... malicious?");
    }

    return code;
}

export function getAuthUri() {
    return window.location.origin + "/auth";
}

export async function redirectForAuthorization() {
    const verification = await generateCodeVerifier();
    localStorage.setItem("code_verifier", verification);
    document.location = await client.authorizationCode.getAuthorizeUri({
        redirectUri: getAuthUri(),
        codeVerifier: verification,
        scope: ["User.Read", "Sites.Read.All"]
    });
}

export async function confirmAuthorization() {
    const verification = getVerificationCode();
    const authorization = await client.authorizationCode.getTokenFromCodeRedirect(document.location.href, {
        redirectUri: getAuthUri(),
        codeVerifier: verification
    });

    // localStorage.removeItem("code_verifier");
    return authorization;
}

let authFetch: OAuth2Fetch | null = null;

export function getAuthFetch(): OAuth2Fetch {
    if (!authFetch) {
        authFetch = new OAuth2Fetch({
            client: client,
            getNewToken: async () => {
                const verification = getVerificationCode();
                return await client.authorizationCode.getToken({
                    code: verification,
                    redirectUri: getAuthUri(),
                });
            },
            storeToken: (token: OAuth2Token) => {
                localStorage.setItem("token", JSON.stringify(token));
            },
            getStoredToken() {
                const token = localStorage.getItem("token");
                if (!token) {
                    return null;
                }

                return JSON.parse(token);
            },
        });
    }

    return authFetch;
}

