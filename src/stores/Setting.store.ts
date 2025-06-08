import { deepMap } from "nanostores";


export const $setting = deepMap({
    isOpen: false,
    isAnim: false,
})


const set = (state: boolean) => {
    $setting.setKey(state ? 'isOpen' : 'isAnim', state)
    setTimeout(() => {
        $setting.setKey(state ? 'isAnim' : 'isOpen', state)
    }, 150)
}


export const ManageSetting = {
    set,
    open: () => set(true),
    close: () => set(false),
}
