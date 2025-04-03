import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../ui/button';

export default function TableSurroundings({
    data=[],
    handleClickDeleteSurrounding
}) {
  return (
    <div className='w-full my-2'>
        <h1 className='font-bold '>Alrededores</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre del lugar</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data?.map((item, idx)=>(
                        <TableRow key={idx}>
                            <TableCell>{item}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={()=>handleClickDeleteSurrounding(idx)}
                                    variant="ghost"
                                >
                                    <DeleteIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}