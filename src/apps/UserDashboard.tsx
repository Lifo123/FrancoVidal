import { TabContent, TabItem, TabList, TabMenu } from "@lifo123/library";
import { useEffect, useState } from "react";

interface UserDashboardProps {

}

export default function UserDashboard() {

    return (
        <>
            <TabMenu default="1">
                <TabList>
                    <TabItem id="1" text="Enviar link" />
                    <TabItem id="2" text="En revision" />
                    <TabItem id="3" text="Mis videos" />
                </TabList>
                <TabContent id="1">
                    <div >
                        después de postear el video.
                    </div>
                </TabContent>
                <TabContent id="2">
                </TabContent>
                <TabContent id="3" children={<Wasa />} />
            </TabMenu>
        </>
    )
}

const Wasa = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);



    return (
        <div>
            idk
        </div>
    )
}