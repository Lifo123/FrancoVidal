import { Icon } from "@lifo123/library";
import { useStore } from "@nanostores/react";
import { $setting, ManageSetting } from "@Stores/Setting.store";
import Setting from "@Apps/Settings/Setting";

interface HeaderRightProps {

}

export default function HeaderRight() {
    const SETTING = useStore($setting)

    return (
        <>
            <span className="fs-custom-15">{JSON.parse(localStorage.getItem('FV-User') || "{}").user}</span>
            <Icon icon="setting" size={30} onClick={() => ManageSetting.open()} stroke="1" className="icon-btn br-6"/>
            {SETTING.isOpen && <Setting />}
        </>
    )
}