// Truncate Song Data Text In Club State Modal Accordion
export const TruncateText = (text: string, maxCharCount: number) => {

    if(!text || typeof text !== 'string')
    {
            return "GENRE";
    }
    else
    {
        if(text.length > maxCharCount)
        {
            return text.slice(0, maxCharCount) + '...';
        }
        return text;
    }   
}