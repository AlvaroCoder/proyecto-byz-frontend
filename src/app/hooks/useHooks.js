'use client'
import { getSession } from "@/authentication/lib";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export function useSession() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSession, setDataSession] = useState(null);
    useEffect(()=>{
        async function getSessionData() {
            try {
                const session = await getSession();
                const token = session?.user?.access_token;
                
            
                const decode_jwt = jwt.decode(token);

                setDataSession(decode_jwt);
            } catch (err) {
                setError(err);
            }finally{
                setLoading(false);
            }
        }
        getSessionData();
    },[]);
    return {dataSession, loading, error}
};

export function useFetch(URL="") {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    useEffect(()=>{
        async function fetchData() {
            try {
                const session = await getSession();
                const response = session ? await fetch(URL, {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${session?.user?.access_token}`,
                    }
                }) :  await fetch(URL);

                if (!response.ok) {
                    const jsonResponse = await response.json();
                    setError(jsonResponse?.detail);
                    return;
                }

                const jsonResponse = await response.json();          
                      
                setData(jsonResponse);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[]);
    return {loading, error, data};
}