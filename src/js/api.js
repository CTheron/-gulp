function post(url,params={}){
    return new Promise((resolve,reject)=>{
        $.post(url,params,(data)=>{
            if(data.code== 0){
                resolve(data.data||{})
            }else{
                reject(data)
            }
        },"json")
    })
}

function get(url){
    return new Promise((resolve,reject)=>{
        $.get(url,(data)=>{
            if(data.code==0){
                resolve(data.data||{})
            }else{
                reject(data)
            }
        },"json")
    })
}

export default {
    getlivestreamUrl:get(url),
    postlivestreamUrl:post(url,params)
}