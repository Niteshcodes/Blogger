import { Blog } from "../../pages/Home";

export default function HandleSearch(text: string, data: Blog[]) {   
    const regexPattern = new RegExp(text, "i");
    const filteredData = data.filter((item) => regexPattern.test(item.title));
    return filteredData
}
