import { useRouter } from "next/router";
import { confirmAuthorization } from "../auth";

export default function Auth() {
    confirmAuthorization().then(() => {
        useRouter().push("/", "/");
    }).catch(e => {
        console.error(e);
    });
}