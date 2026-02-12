'use client'
import { getSession } from "@/authentication/lib";

const URL_UPLOAD_IMAGE = process.env.NEXT_PUBLIC_UPLOAD_IMAGE;
const URL_CREATE_PROJECT = process.env.NEXT_PUBLIC_CREATE_PROJECT;
const URL_CREATE_PROPERTY = process.env.NEXT_PUBLIC_CREATE_PROPERTY
const URL_SAVE_REAL_AGENT = process.env.NEXT_PUBLIC_SAVE_REAL_AGENT_DATA;
const URL_SAVE_FORM_CLIENT= process.env.NEXT_PUBLIC_SAVE_FORM_CLIENT;
const URL_UPDATE_PROJECT = process.env.NEXT_PUBLIC_UPDATE_PROJECT_DATA;
const URL_UPDATE_PROPERTY = process.env.NEXT_PUBLIC_UPDATE_PROPERTY_DATA;
const URL_SAVE_COMPLAINENT_BOOK = process.env.NEXT_PUBLIC_SAVE_COMPLAINENT_BOOK;

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

export async function UPDATE_DATA_PROJECT(data=null) {
    const session = await getSession();
    return await fetch(URL_UPDATE_PROJECT, {
        method : "PUT",
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
}

export async function UPDATE_DATA_PROPERTY(data=null) {
    const session = await getSession();
    return await fetch(URL_UPDATE_PROPERTY,{
        method : 'PUT',
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
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

export async function CREATE_PROPERTY(data=null) {
    const session = await getSession();
    return await fetch(URL_CREATE_PROPERTY, {
        method : "POST",
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
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
export async function SAVE_FORM_CLIENT(data) {
    return await fetch(URL_SAVE_FORM_CLIENT,{
        method : "POST",
        headers : {
            'Content-Type' : 'application/json',
        },
        mode : "cors",
        body : JSON.stringify(data)
    })
}

export async function SAVE_COMPLAINENT_BOOK(data) {
    return await fetch(URL_SAVE_COMPLAINENT_BOOK,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        mode : 'cors',
        body : JSON.stringify(data)
    });
}