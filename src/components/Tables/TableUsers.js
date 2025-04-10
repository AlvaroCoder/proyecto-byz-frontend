'use client'
import React, { useMemo, useState } from 'react'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { FormAddUser } from '../Forms'
import { CardUsuario } from '../Cards'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { SAVE_REAL_AGENT_INFORMATION, UPLOAD_IMAGE } from '@/lib/apiConnections'

export default function TableUsers({
    dataUsuarios=[],
    dataRoles=[]
}) {
    const [query, setQuery] = useState("");
    const [usuariosData, setUsuariosData] = useState(dataUsuarios || []);
    const filterData= useMemo(()=>{
        return usuariosData?.filter(item=>{
            const nameCompleted = item?.first_name?.trim() + " " + item?.last_name?.trim();
            return nameCompleted?.toUpperCase().includes(query?.toUpperCase());
        })
    },[usuariosData, query]);

    // Funcion de atrapar los cambios del input
    const handleChangeInput=(evt)=>{
        setQuery(evt.target.value);
    }
    // Funcion de agregar el usuario
    const handleClickAddUsuario=async(dataUsuario)=>{
        let url_image = "";
        if (dataUsuario?.filePhoto) {
            const formData = new FormData();
            formData.append("image", dataUsuario?.filePhoto);

            const url_imageCloud = await UPLOAD_IMAGE(formData);
            if (!url_imageCloud.ok) {
                console.log(await url_imageCloud.json());
                alert("Surgio un error");
                return;
            }
            url_image = (await url_imageCloud.json())?.url;
        }
        const newDataToSave = {
            ...dataUsuario,
            photo : url_image
        };
        console.log(newDataToSave);
        
        const response = await SAVE_REAL_AGENT_INFORMATION(newDataToSave);
        if (!response.ok) {
            console.log(await response.json());
            alert("Surgio un error");
            return;
        }
        setUsuariosData([
            dataUsuario,
            ...usuariosData
        ]);
    }
  return (
    <div className='w-full'>
        <section className='my-4 flex flex-row justify-center'>
            <Input
                placeholder="Buscar usuario ..."
                onChange={handleChangeInput}
            />
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="mx-4 w-fit px-4 cursor-pointer bg-naranja text-white hover:bg-naranja border-2 border-naranja"
                    >
                        <span>Agregar Usuario</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        <h1 className='font-bold'>Nuevo Usuario</h1>
                    </DialogTitle>
                    <FormAddUser
                        dataRoles={dataRoles}
                        handleClickAddMember={handleClickAddUsuario}
                    />
                </DialogContent>
            </Dialog>
        </section>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Nombre de usuario</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Email Personal</TableHead>
                    <TableHead>Email Profesional</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filterData?.map((item)=><CardUsuario key={item?.id} dataUsuario={item} />)
                }
            </TableBody>
        </Table>
    </div>
  )
}
