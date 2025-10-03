import { get } from "lodash";

export default function getFaIcon(string = '') {
    const icons = {
        "Close": "fa-solid fa-xmark",
        "CaretDown": "fa-solid fa-caret-down",
        "Phone": "fa-solid fa-phone",
        "Bars": "fa-solid fa-bars",
    };

    return get(icons, string, '');
}