import { Dropdown, Icon } from "@lifo123/library";
import { useStore } from "@nanostores/react";
import { $user, User } from "@Stores/User.store";

interface HeaderRightProps {

}

export default function HeaderRight() {
    const USER = useStore($user)

    return (
        <>
            <Dropdown custom={<img src={USER.avatar_url_100} className="icon-btn br-50" height={44} width={44} />}
                items={[[
                    { text: "Logout", onClick: User.logOut }
                ]]}
            />
        </>
    )
}