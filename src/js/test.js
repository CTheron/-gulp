import api from "./api";
api.getlivestreamUrl().then((res)=>{
    console.log(res)
})
api.postlivestreamUrl(params).then((res)=>{
    console.log(res)
})
