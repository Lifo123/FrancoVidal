
import { ButtonPromise } from "@lifo123/library";
import { Loading } from "@lifo123/library/Stores";
import { toast } from "@lifo123/library/Toast";
import { Auth } from "@Services/Auth";
import React from "react";

interface AuthBTNProps {
    type: string; // "Login" o "Register"
}

export default function AuthBTN({ type }: AuthBTNProps) {


    const handleClick = async () => {
        const INPUTS = document.querySelectorAll("[data-input-type]") as NodeListOf<HTMLInputElement>;
        const username = INPUTS[0]?.value?.trim();
        const password = INPUTS[1]?.value?.trim();
        const password2 = INPUTS[2]?.value?.trim();
        const phone = INPUTS[3]?.value?.trim();

        if (!username) {
            toast.show("Username is required");
            return;
        }
        if (!password) {
            toast.show("Password is required");
            return;
        }


        if (type === "Register") {
            if (!password2) {
                toast.show("Repeat password is required");
                return;
            }
            if (password !== password2) {
                toast.show("Passwords don't match");
                return;
            }
            if (phone.length !== 9) {
                toast.show("Phone must be 9 digits");
                return;
            }
            //Register
            const resRegister = await Auth.Register(username, password, phone);
            if (!resRegister.status) {
                INPUTS.forEach((input) => input.value = "");
            }
        } else {
            //Validate Login
            const resLogin = await Auth.Login(username, password);
            if (!resLogin.status) {
                INPUTS[1].value = "";
            }

        }
    };

    React.useEffect(() => {
        const INPUTS = document.querySelectorAll("[data-input-type]") as NodeListOf<HTMLInputElement>;
        INPUTS.forEach((input) => input.addEventListener("input", () => toast.dismiss()));
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                const target = e.target as HTMLElement;
                if (target.matches("[data-input-type]")) {
                    e.preventDefault();
                    toast.dismiss();
                    handleClick();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            INPUTS.forEach((input) => input.removeEventListener("input", () => toast.dismiss()));
        }
    }, []);

    return (
        <>
            <ButtonPromise text={type} className="btn btn-primary br-6 mt-3 mb-1 fs-3" onClick={async () => {
                await Loading.promise(async () => await handleClick(), 'card_loading')
            }} />
        </>
    );
}
