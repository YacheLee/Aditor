export default function normaliseValue(value){
    const DEFAULT_VALUE = [
        {type: "paragraph"}
    ];
    if(value ===undefined || value === null){
        return DEFAULT_VALUE;
    }
    else if(Array.isArray(value) && value.length===0){
        return DEFAULT_VALUE;
    }
    return value;
}
