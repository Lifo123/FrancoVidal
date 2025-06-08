import { CloseBtn, DarkmodeDrop } from "@lifo123/library/components";
import { Loading } from "@lifo123/library/Stores";
import { useStore } from "@nanostores/react";
import { Auth } from "@Services/Auth";
import { $setting, ManageSetting } from "@Stores/Setting.store";

export default function Configuration() {
    const SETTING = useStore($setting)


    return (
        <section className={`setting-app f-col g-2 o-hidden fixed ${SETTING.isAnim ? 'visible' : 'delete'}`}>
            <div className={`setting-cont f-col g-2 mx-auto ${SETTING.isAnim ? 'visible' : 'delete'}`}>
                <div className="f-row f-justify-between f-align-center px-3" style={{ height: '50px' }}>
                    <span></span>
                    <CloseBtn size={26} onClick={() => ManageSetting.close()} />
                </div>
                <div className="f-col f-center">
                    <DarkmodeDrop storage="darkmode" />
                    <span className="text-default btn btn-third br-6 mt-3" onClick={() => {
                        Loading.promise(Auth.Logout, 'card_loading')
                    }}>Log out</span>
                </div>
            </div>
        </section >
    )
}