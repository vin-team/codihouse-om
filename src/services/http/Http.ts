const headers = {
    "Content-Type": "application/json",
    //"Access-Control-Allow-Origin": "*"
};
export const HttpBasic ={
    async fetch(url:string){
        let result:{status:number,data:any}={status:200,data:null}
        await fetch(url)
        .then(response => {
            result.status=response.status
            return  response.json()
        })
        .then(data => {
            result.data=data
        })
        .catch(error => {
            console.error('Error:', error);
            return  Promise.reject(error.response !== undefined ? error.response : error)
        });
        return result
    }
}