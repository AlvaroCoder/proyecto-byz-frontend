'use client'
import { getSession } from "@/authentication/lib";

const URL_UPLOAD_IMAGE = process.env.NEXT_PUBLIC_UPLOAD_IMAGE;
const URL_CREATE_PROJECT = process.env.NEXT_PUBLIC_CREATE_PROJECT;
const URL_SAVE_REAL_AGENT = process.env.NEXT_PUBLIC_SAVE_REAL_AGENT_DATA;

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

export async function SAVE_REAL_AGENT_INFORMATION(data=null) {
    const session = await getSession();
    return await fetch(URL_SAVE_REAL_AGENT,{
        method : "POST",
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
}