import { ButtonPromise } from "@lifo123/library";
import UI from "@lifo123/library/UI";
import { useStore } from "@nanostores/react";
import { $user } from "@Stores/User.store";
import React from "react";

export default function EnviarURL() {
    const USER = useStore($user);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const extractVideoId = (url: string): string | null => {
        const match = url.match(/video\/(\d+)/);
        return match ? match[1] : null;
    };

    const validateURL = async (url: string) => {
        const videoId = extractVideoId(url);
        if (!videoId) {
            UI.toast.error("URL inválida.");
            return;
        }

        //fetch endpont 
        const res = await fetch(`https://app-mroiudgeuq-uc.a.run.app/videos/?uid=${USER.uid}&save=true&vid=` + videoId);
        const DATA = await res.json();

        if (!DATA.videos.length) {
            UI.toast.error('No se encontró el video en la cuenta.');
            return;
        }
        UI.toast.show(DATA.msg);
        inputRef.current!.value = '';
    };


    return (
        <>
            <input
                type="text"
                placeholder="https://www.tiktok.com/@username/video/xxxxxxxxxxxxxxxxx"
                className="f-grow"
                ref={inputRef}
            />
            <ButtonPromise text="Enviar" onClick={async () => {
                if (!inputRef.current) return;
                if (!inputRef.current.value) {
                    UI.toast.error('URL no puede estar vacía');
                    return;
                }
                await validateURL(inputRef.current.value);
            }} />
        </>
    )
}