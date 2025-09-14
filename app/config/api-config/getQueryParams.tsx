export default function getQueryParams(params:any){    
    let finalParam:string = ''
    for(const key in params){
        finalParam = finalParam + key + '=' + params[key] + '&'
    }
    return finalParam   
}