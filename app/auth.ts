import { generateCodeVerifier, OAuth2Client, OAuth2Fetch, OAuth2Token } from "@badgateway/oauth2-client";
import * as Graph from "@microsoft/microsoft-graph-types";
import * as authInfo from "../auth.json";


export const client = new OAuth2Client(authInfo);


/**
 * Returns a code verifier, which is the code that was used to validate and prevent CSRF attacks.
 * @returns The code verifier from local storage.
 */
export function getVerificationCode(): string {
    const code = localStorage.getItem("code_verifier");
    if (!code) {
        throw new Error("No code verifier found in local storage... malicious?");
    }

    return code;
}

/**
 * gets the URI to redirect to for authorization, so that we can give it to Microsoft.
 * @returns The URI to redirect to for authorization.
 */
export function getAuthUri(): string {
    return window.location.origin + "/auth";
}

/**
 * Check if the user is authorized by checking if the token is present and not expired.
 * @returns true if the user is authorized, false otherwise.
 */
export function isAuthorized(): boolean {
    const token = localStorage.getItem("token");
    return !!token && ((JSON.parse(token) as OAuth2Token).expiresAt ?? 0) > Date.now();
}

/**
 * Sign out the user by removing the token from local storage.
 */
export function signOutUser() {
    // yes, i know this does not sign out the microsoft account.
    // this is intentional. i do not like web apps that actually sign out users from their accounts...
    localStorage.removeItem("token");
    localStorage.removeItem("code_verifier");
}

export async function redirectForAuthorization() {
    const verification = await generateCodeVerifier();
    localStorage.setItem("code_verifier", verification);
    document.location = (await client.authorizationCode.getAuthorizeUri({
        redirectUri: getAuthUri(),
        codeVerifier: verification,
        scope: ["User.Read", "Sites.Read.All"]
    })) + "&prompt=select_account";
}

export async function confirmAuthorization(uri: string) {
    const verification = getVerificationCode();
    const authorization = await client.authorizationCode.getTokenFromCodeRedirect(uri, {
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
                    redirectUri: getAuthUri()
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
            }
        });
    }

    return authFetch;
}

export async function getUserProfile(): Promise<Graph.User> {
    const response = await getAuthFetch().fetch("https://graph.microsoft.com/v1.0/me");
    return await response.json() as Graph.User;
}

