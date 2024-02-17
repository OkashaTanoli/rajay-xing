'use client'
import React, { useContext, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader } from '@/components/common';
import { Toaster, toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import EditForm from '@/components/tokendata/editFrom';
import { ContextApi } from '@/context/context';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';

function TokenData() {

    const { state } = useContext(ContextApi)

    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [tempSearch, setTempSearch] = useState(search ? search : '')
    const [deleteTokenId, setDeleteTokenId] = useState('')
    const [currentEntry, setCurrentEntry] = useState<any>()
    const [openEdit, setOpenEdit] = useState(false)
    const [currentTokenToPrint, setCurrentTokenToPrint] = useState<any>()
    const [openPrintToken, setOpenPrintToken] = useState(false)


    async function fetchData() {
        setLoading(true)
        try {
            const res = await fetch(`/api/token?search=${search ? search : ''}`)
            const data = await res.json()
            if (data.status === 'error') {
                throw new Error(data.message)
            }
            setData(data.data)
            console.log(data.data);
        }
        catch (err: any) {
            toast.error(err.message, {
                duration: 4000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
            });
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [search])


    const deleteEntry = async (id: string) => {
        try {
            setDeleteTokenId(id)
            let res = await fetch(`/api/token/${id}`, {
                method: 'DELETE'
            })
            let data = await res.json()
            if (data.status === 'error') {
                throw new Error(data.message)
            }
            toast.success(data.message, {
                duration: 3000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
            });
            fetchData()
        }
        catch (err: any) {
            toast.error(err.message, {
                duration: 4000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
            });
        }
        finally {
            setDeleteTokenId('')
        }
    }

    return (
        <div className='mt-10'>
            <Toaster />
            <div className='block sm:flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-zinc-800'>Token Data</h1>
                <div className='flex gap-2 mt-3 sm:mt-0'>
                    <input value={tempSearch} onChange={(e) => setTempSearch(e.target.value)} type="text" placeholder='Name of Driver' className='w-[180px] flex-grow sm:w-auto text-sm sm:text-base bg-transparent border border-zinc-300 rounded-md py-2 px-4 text-zinc-800' name="" id="" />
                    <Link href={`/tokendata?search=${tempSearch}`}><button className='bg-primary rounded-md py-2 px-4 text-white'>Search</button></Link>
                </div>
            </div>
            <div className='flex justify-between items-center mt-3'>
                <h1 className='text-base sm:text-xl text-red-500'>Token Issued : {!loading && data.length ? data.length : '-'}</h1>
            </div>
            <div className='mt-5 w-full overflow-auto'>
                {
                    loading ?
                        <div className='w-full flex justify-center items-center py-20'>
                            <Loader height='h-6' width='w-6' />
                        </div>
                        :
                        !data || !data.length ?
                            <div className='w-full flex justify-center items-center py-20'>
                                <h1 className='text-xl font-bold text-zinc-800'>No data found</h1>
                            </div>
                            :
                            <Table className='table-auto border w-[1200px] 2xl:w-full'>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader className='bg-primary'>
                                    <TableRow className='grid grid-cols-[repeat(17,minmax(0,1fr))] hover:bg-inherit'>
                                        <TableHead className="text-white h-auto col-span-1 flex items-center">Ser/ID</TableHead>
                                        <TableHead className='text-white h-auto col-span-2 flex items-center'>Name / نام</TableHead>
                                        <TableHead className="text-white h-auto col-span-3 flex items-center">CNIC / شناختی کارڈ</TableHead>
                                        <TableHead className="text-white h-auto col-span-2 flex items-center">Date of Token Issue / ٹوکن ایشو کا وقت</TableHead>
                                        <TableHead className="text-white h-auto col-span-2 flex items-center">Time of Token Issue / ٹوکن ایشو کا وقت</TableHead>
                                        <TableHead className="text-white h-auto col-span-3 flex items-center">Driver Details / ڈرائیور کی تفصیلات</TableHead>
                                        <TableHead className="text-white h-auto col-span-2 flex items-center">Regn No / درج نمبر</TableHead>
                                        <TableHead className="text-white h-auto col-span-2 flex items-center">Action / عمل</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((row: any, index) => (
                                        <TableRow key={index} className='grid grid-cols-[repeat(17,minmax(0,1fr))]'>
                                            <TableCell className="col-span-1">{index + 1}</TableCell>
                                            <TableCell className='col-span-2'>{row?.name}</TableCell>
                                            <TableCell className="col-span-3">{row?.cnic}</TableCell>
                                            <TableCell className="col-span-2">{row.createdAt ? dayjs(row.createdAt).format('DD-MM-YYYY') : '-'}</TableCell>
                                            <TableCell className="col-span-2">{row.createdAt ? dayjs(row.createdAt).format('H:mm A') : '-'}</TableCell>
                                            <TableCell className="col-span-3">{row?.driverName ? row?.driverName : '-'}</TableCell>
                                            <TableCell className="col-span-2">{row?.regnNo ? row?.regnNo : '-'}</TableCell>
                                            <TableCell className="col-span-2 flex flex-wrap gap-2 items-center">
                                                {
                                                    state.userDetails?.role === 'super-admin' &&
                                                    <>
                                                        <button onClick={() => {
                                                            setCurrentEntry(row)
                                                            setOpenEdit(true)
                                                        }} className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                                        <button disabled={!!deleteTokenId} onClick={() => deleteEntry(row._id)} className='py-1 px-2 rounded-md bg-red-400'>{deleteTokenId === row._id ? <Loader height='h-4' width='w-4' /> : 'Delete'} </button>
                                                    </>
                                                }
                                                {
                                                    state.userDetails?.role !== 'admin' &&
                                                    <button onClick={() => {
                                                        setCurrentTokenToPrint({ ...row, id: index + 1 })
                                                        setOpenPrintToken(true)
                                                    }} className='py-1 px-2 rounded-md bg-blue-400'>Print</button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                }
            </div>

            {
                currentEntry &&
                <EditForm
                    currentEntry={currentEntry}
                    setCurrentEntry={setCurrentEntry}
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    fetchData={fetchData}
                />
            }


            {
                currentTokenToPrint && openPrintToken &&
                <Dialog open={openPrintToken} onOpenChange={setOpenPrintToken}>
                    <DialogContent className='max-w-[500px] print:max-w-[300px] max-h-screen !overflow-auto'>
                        <X onClick={() => {
                            setCurrentEntry(null)
                            setOpenPrintToken(false)
                        }} className="absolute cursor-pointer print:hidden top-3 right-3 h-4 w-4" />
                        <DialogHeader>
                            <DialogTitle className='text-xl font-bold text-zinc-800 print:hidden'>Print Token</DialogTitle>
                            <DialogDescription>
                                <div className='mt-5 print:mt-1'>
                                    <div className='mt-5 print:mt-1 flex flex-col gap-5'>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-full hidden print:flex mb-8 justify-between items-center'>
                                                <Image src={'/logo.png'} alt='logo' className='w-[50px]' width={50} height={50} />
                                                <h1 className='text-base font-bold text-zinc-800'>RAJAY CROSSING</h1>
                                            </div>
                                            <div className=''>
                                                <div className='flex flex-col items-center'>
                                                    <Image src={currentTokenToPrint?.image} alt='image' className='h-full object-cover' width={200} height={200} />
                                                </div>
                                            </div>
                                            <div className='mt-3'>
                                                <QRCodeSVG size={150} value={`https://rajay-xing.vercel.app/irantopak?type=${currentTokenToPrint?.entry?.type}&search=${currentTokenToPrint?.entry?._id}`} />
                                            </div>
                                        </div>
                                        <div className='text-base flex flex-col gap-2 font-bold text-zinc-800'>
                                            <p><span className='text-primary'>Name:</span> {currentTokenToPrint?.name}</p>
                                            <p><span className='text-primary'>CNIC:</span> {currentTokenToPrint?.cnic}</p>
                                            <p><span className='text-primary'>Driver Name:</span> {currentTokenToPrint?.driverName ? currentTokenToPrint?.driverName : '-'}</p>
                                            <p><span className='text-primary'>Issued By:</span> {currentTokenToPrint?.createdBy?.name ?? '-'}</p>
                                            <p><span className='text-primary'>Token Number:</span> {currentTokenToPrint.id ?? '-'}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-end pt-5 border-t mt-5 print:hidden'>
                                        <button onClick={() => window.print()} className='w-[120px] py-3 font-semibold bg-primary text-white rounded-md'>Print</button>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            }


        </div>
    );
}

export default TokenData;