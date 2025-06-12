const baseURL = import.meta.env.PUBLIC_BASE_URL || "";

import { map } from "nanostores";

interface UserProps {
    [key: string]: any;
}

export const $user = map<UserProps>();


if (typeof window !== "undefined") {
    const stored = localStorage.getItem("FV-User");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed) {
                $user.set(parsed);
                checkSession();
            } else {
                localStorage.removeItem("FV-User");
            }
        } catch (e) {
            console.warn("Invalid user data in localStorage");
            localStorage.removeItem("FV-User");
        }
    }

    $user.subscribe((user) => {
        if (user && Object.keys(user).length > 0) {
            localStorage.setItem("FV-User", JSON.stringify(user));
        }
    });

}

export function checkSession() {
    const user = $user.get();
    const now = Date.now();

    if (now > user.expires_in) {
        localStorage.removeItem("FV-User");
        window.location.href = `${baseURL}/auth/login`;
    } else {
        //console.log('keep');
    }
}

const logOut = () => {
    localStorage.removeItem("FV-User");
    window.location.reload();
}

export const User = {
    get: () => $user.get(),
    set: (user: Partial<UserProps>) => $user.set({ ...$user.get(), ...user }),
    checkSession,
    logOut
};
