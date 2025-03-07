import { getSession } from "@/authentication/lib";

const URL_UPLOAD_IMAGE="http://127.0.0.1:8000/create/image/";
const URL_CREATE_PROJECT="http://127.0.0.1:8000/create/project/";
export async function UPLOAD_IMAGE(data=null) {
    const session = await getSession();
    return await fetch(URL_UPLOAD_IMAGE,{
        method : 'POST',
        headers : {
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : data
    })
}

export async function CREATE_PROJECT(data=null) {
    const session = await getSession();
    return await fetch(URL_CREATE_PROJECT,{
        method : 'POST',
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    });
}