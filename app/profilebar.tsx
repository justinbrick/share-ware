import * as Graph from "@microsoft/microsoft-graph-types";
import Image from "next/image";

export interface IProfileBarProps {
    user?: Graph.User;
    signOut?: () => void;
    signIn?: () => void;
}

export default function ProfileBar(props: IProfileBarProps) {
    const { user, signIn, signOut } = props;
    const clickAction = () => {
        if (user) {
            signOut?.();
        } else {
            signIn?.();
        }
    };

    return (
        <div className="flex flex-row justify-between px-8 py-4 text-xl bg-slate-50 w-screen items-center">
            <p>
                {!!user ? `You are signed in as ${user.displayName} (${user.userPrincipalName})` : "Please sign in"}
            </p>
            <button onClick={clickAction} className="bg-white hover:bg-slate-300 rounded border-slate-500 border-2 p-2 flex flex-row">
                {!!user ? "Sign Out" : "Sign In"}
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/512px-Microsoft_icon.svg.png" width={35} height={30} alt="Microsoft" className="pl-2" />
            </button>
        </div>
    );
}