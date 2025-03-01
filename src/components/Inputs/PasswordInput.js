import React, { useState } from 'react'

import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function PasswordInput({value,onChange, error=null}) {
    const [visibilityPassword, setVisibilityPassword] = useState(false);

    const handleChangeVisibility=()=>{
        setVisibilityPassword(!visibilityPassword);
    }
  return (
    <div className={`flex flex-row items-center justify-center bg-white  px-4 py-2 border-b border-b-gris w-96 ${error?.idError === 1 && 'bg-red-100'}`} >
        <LockIcon
            className='text-gris'
        />
        <input
            type={visibilityPassword ? 'text' : 'password'}
            className="h-9 mx-2 w-full px-3 py-1 bg-transparent text-gris outline-none shadow-none border-none rounded-none border-b-2 "
            name="password"
            value={value}
            onChange={onChange}
        />
        {
            visibilityPassword ? 
                <p onClick={handleChangeVisibility}><VisibilityOffIcon className='text-gris'/></p> : 
                <p onClick={handleChangeVisibility}><RemoveRedEyeIcon className='text-gris'/></p>
        }
    </div>
  )
}
