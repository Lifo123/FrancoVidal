import { $user } from "@lifo123/library/Stores";
import { TabContent, TabItem, TabList, TabMenu } from "@lifo123/library/Tabs";
import { useStore } from "@nanostores/react";
import CliperoEnviar from "./Clipero/CliperoEnviar";
import CliperoClips from "./Clipero/CliperoClips";

interface GeneralDashboardProps {
    type: 'admin' | 'controller' | 'clipero';
}

export default function GeneralDashboard(props: GeneralDashboardProps) {
    const USER = useStore($user)

    return (
        <TabMenu default="1" className="dashboard g-2 f-col">
            <TabList className="f-row f-justify-between">
                <div className="f-row g-2">
                    <TabItem id="1" text="Clips" />
                    <TabItem id="2" text="Enviar" />
                </div>
                <div className="f-row g-2">
                    {(props.type === 'controller' || props.type === 'admin') && (
                        <TabItem id="3" text="Moderador" />
                    )}

                    {props.type === 'admin' && (
                        <TabItem id="4" text="Admin" />
                    )}
                </div>

            </TabList>

            <TabContent id="1" className="dash-content mt-1 px-1" children={<CliperoClips />} />
            <TabContent id="2" className="dash-content mt-1 px-1" children={<CliperoEnviar />} />
            {(props.type === 'controller' || props.type === 'admin') && (
                <TabContent id="3" className="dash-content mt-1 px-1" children={'Moderador'} />
            )}
            {props.type === 'admin' && (
                <TabContent id="4" className="dash-content mt-1 px-1" children={'Admin'} />
            )}
        </TabMenu>
    )
}