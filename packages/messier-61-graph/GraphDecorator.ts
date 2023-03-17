export function textLable(label: string): any {
    let text = label
    if(text.length >= 5 && text.length < 10){
        text = text.substring(0, 4) + '\n' + text.substring(4, 10);
    }else {
        text = text.substring(0, 4) + '...'
    }
    return text;
}