import getAttrNameFromSelector from "@/utils/getAttrNameFromSelector";

const getParams = (element, dataAttrSelector) => {
        return JSON.parse(
            element.getAttribute(
                getAttrNameFromSelector(dataAttrSelector) //тут получаем чистое имя атрибуты, без квадратных скобок
            )
        )
}

export default getParams