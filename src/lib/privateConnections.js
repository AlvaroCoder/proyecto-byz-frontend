'use client'

const URL_SUNAT_DNI=process.env.NEXT_PUBLIC_URL_DNI;
const TOKEN_SUNAT = process.env.NEXT_PUBLIC_TOKEN_API_DNI_SUNAT;

export async function fetchDataSunatByDNI(dni) {
    
    const dataSunat = await fetch(URL_SUNAT_DNI+dni+"?token="+TOKEN_SUNAT,{method : 'GET'});
    if (!dataSunat.ok) {
        return {
            error : true,
            value : "Sucedio un error"
        }
    }
    const jsonDataSunat = await dataSunat.json();
    if (!jsonDataSunat?.success) {
        return {
            error : true,
            value : jsonDataSunat?.message
        }
    }
    
    return {
        error : false,
        value : {
            dni,
            nombre : jsonDataSunat?.nombres,
            apellido : jsonDataSunat?.apellidoPaterno + " " + jsonDataSunat?.apellidoMaterno
        }
    }
}