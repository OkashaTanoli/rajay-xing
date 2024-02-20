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
import { useSearchParams, useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast';
import { Loader } from '@/components/common';
import dayjs from 'dayjs';
import EditForm from '@/components/irantopak/editFrom';
import Link from 'next/link';
import { ContextApi } from '@/context/context';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function IranToPak() {

    const { state } = useContext(ContextApi)
    console.log(state)

    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const router = useRouter()

    // const [type, setType] = useState('local')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteEntryId, setDeleteEntryId] = useState('')
    // const [search, setSearch] = useState('')
    const [tempSearch, setTempSearch] = useState(search ? search : '')
    const [currentEntry, setCurrentEntry] = useState<any>()
    const [openEdit, setOpenEdit] = useState(false)

    const [inEntry, setInEntry] = useState('')


    async function fetchData() {
        setLoading(true)
        try {
            const res = await fetch(`/api/entry?forPage=itp&type=${type}&search=${search ? search : ''}`)
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
        if (type !== 'local' && type !== 'fuelTrade') {
            router.push(`/irantopak?type=local`)
        }
        else if ((state.userDetails && state.userDetails.role === 'user-in-local') && type === 'fuelTrade') {
            router.push(`/irantopak?type=local`)
        }
        else if ((state.userDetails && state.userDetails.role === 'user-in-fuel-trade') && type === 'local') {
            router.push(`/irantopak?type=fuelTrade`)
        }
        else if (state.userDetails && state.userDetails.role === 'user-in-out-local' && type === 'fuelTrade') {
            router.push(`/irantopak?type=local`)
        }
        else {
            if (state.userDetails && ((state.userDetails?.role === 'user-in-local' && type === 'local') || (state.userDetails.role === 'user-in-fuel-trade' && type === 'fuelTrade') || state.userDetails.role === 'super-admin' || state.userDetails.role === 'admin' || (state.userDetails?.role === 'user-in-out-local' && type === 'local'))) {
                fetchData()
            }
        }
    }, [type, search, state.userDetails])


    const changeType = (value: string) => {
        router.push(`/irantopak?type=${value}&search=${search ? search : ''}`)
    }

    const deleteEntry = async (id: string) => {
        try {
            setDeleteEntryId(id)
            let res = await fetch(`/api/entry/${id}`, {
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
            setDeleteEntryId('')
        }
    }


    const addInEntry = async (row: any) => {
        try {
            setInEntry(row._id)
            const response = await fetch(`/api/entry/${row._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ ...row, dateTimeIn: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000), isIn: true })
            })
            const resData = await response.json()
            if (resData.status === 'error') {
                throw new Error(resData.message)
            }
            if (resData.status === 'success') {
                toast.success(`${'User In successfully'}`, {
                    duration: 2000,
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
            setInEntry('')
        }
    }



    function isDateMoreThanAMonthAgo(dateString: Date) {
        const date = new Date(dateString);
        const currentDate = new Date(); // Step 1: Get current date
        const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()); // Step 2: Subtract a month
        return date < oneMonthAgo; // Step 3: Compare the dates
    }


    return (
        <div className='mt-10'>
            <Toaster />
            <div className='block sm:flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-zinc-800'>Iran to Pak</h1>
                <div className='flex gap-2 mt-3 sm:mt-0'>
                    <input value={tempSearch} onChange={(e) => setTempSearch(e.target.value)} type="text" placeholder='Search' className='w-[180px] flex-grow sm:w-auto text-sm sm:text-base bg-transparent border border-zinc-300 rounded-md py-2 px-4 text-zinc-800' name="" id="" />
                    <Link href={`/irantopak?type=${type}&search=${tempSearch}`}><button className='bg-primary rounded-md py-2 px-4 text-white'>Search</button></Link>
                </div>
            </div>
            <div className='flex justify-between items-center mt-3'>
                <h1 className='text-base sm:text-xl text-red-500'>Crossed Vehs : {!loading && data.length ? data.length : '-'}</h1>
                <div className='flex gap-2'>
                    {
                        (state.userDetails?.role === 'super-admin' || state.userDetails?.role === 'admin') &&
                        <select value={type!} onChange={(e) => changeType(e.target.value)} className='py-2 px-4 text-sm text-zinc-800 shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-md border-2 border-zinc-500'>
                            <option value="local">Local</option>
                            <option value="fuelTrade">Fuel Trade</option>
                        </select>
                    }
                    {
                        state.userDetails?.role === 'super-admin' &&
                        <Link href={'/manualentry'}><button className='bg-primary rounded-md py-2 px-4 text-white'>Add New</button></Link>
                    }
                </div>
            </div>
            <div className='mt-5 w-full overflow-auto'>
                {
                    loading ?
                        <div className='w-full flex justify-center items-center py-20'>
                            <Loader height='h-6' width='w-6' />
                        </div>
                        :
                        !data.length ?
                            <div className='w-full flex justify-center items-center py-20'>
                                <h1 className='text-xl font-bold text-zinc-800'>No data found</h1>
                            </div>
                            :
                            type === 'local' ?
                                <Table className='table-auto border w-[2200px]'>
                                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                    <TableHeader className='bg-primary'>
                                        <TableRow className=' grid grid-cols-[repeat(35,minmax(0,1fr))] hover:bg-inherit'>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Ser/ID</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-1'>Name / نام</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Father Name / والد کا نام</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">CNIC / شناختی کارڈ</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Address / پتہ</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Veh Type / گاڑی کی قسم</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-2'>Date Out / آنے کا وقت</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Time Out / آنے کی تاریخ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-2'>Date In / جانے کا وقت</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Time In / جانے کی تاریخ</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Guest Name / مہمان کا نام</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Guest CNIC / شناختی نمبر مہمان کا</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Guest Address / مہمان کا پتہ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-2'>Children Nos / بچوں کی تعداد</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Family Member Name / ھمرا کا نام</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-3">Family CNIC / خاندان کا شناختی کارڈ</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Relation / ر شتہ</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-3">Action / عمل</TableHead>
                                        </TableRow>

                                    </TableHeader>
                                    <TableBody>
                                        {data.map((row: any, index) => (
                                            <TableRow key={index} className='grid grid-cols-[repeat(35,minmax(0,1fr))] hover:bg-inherit'>
                                                <TableCell className="pl-2 col-span-1 break-words">{index + 1}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.name}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.fName}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.cnic}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.address}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.vehsType}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.dateTimeOut ? dayjs.utc(row.dateTimeOut).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.dateTimeOut ? dayjs.utc(row.dateTimeOut).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.dateTimeIn ? dayjs.utc(row.dateTimeIn).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.dateTimeIn ? dayjs.utc(row.dateTimeIn).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.guestName}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.cnicOfGuest}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.addressOfGuest}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.childrenNos}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.accompanyingFamilyMembersName}</TableCell>
                                                <TableCell className="pl-2 col-span-3 break-words">{row.cnicOfFamilyMembers}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.relation}</TableCell>
                                                <TableCell className="pl-2 col-span-3 flex flex-wrap gap-2 items-center">
                                                    {
                                                        state.userDetails?.role === 'super-admin' &&
                                                        <>
                                                            <button onClick={() => {
                                                                setCurrentEntry(row)
                                                                setOpenEdit(true)
                                                            }} className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                                            <button disabled={!!deleteEntryId} onClick={() => deleteEntry(row._id)} className='py-1 px-2 rounded-md bg-red-400'>{deleteEntryId === row._id ? <Loader height='h-4' width='w-4' /> : 'Delete'} </button>
                                                        </>
                                                    }
                                                    {
                                                        state.userDetails?.role !== 'admin' &&
                                                        <button onClick={() => addInEntry(row)} className='py-1 px-2 rounded-md bg-blue-400'>{inEntry === row._id ? <Loader height='h-4' width='w-4' /> : 'In'}</button>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                                :
                                <Table className='table-auto border w-[2000px]'>
                                    <TableHeader className='bg-primary'>
                                        <TableRow className='grid grid-cols-[repeat(18,minmax(0,1fr))] hover:bg-inherit'>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Ser No</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-1'>Name / نام</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Father Name / والد کا نام</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">CNIC / شناختی کارڈ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-2'>Address / پتہ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-1'>Driver Name / گاڈی چلانے والے کا نام</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Second Seater / دوسری ثیٹر</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Chassis Number / باڈی نمبر</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Engine Number / انجن نامبر</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Date Out / جانے کی تاریخ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-1'>Time Out / جانے کا وقت</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Date In / آنے کی تاریخ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-1'>Time In / آنے کا وقت</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-1">Regn No / درج نمبر</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Action / عمل</TableHead>
                                        </TableRow>

                                    </TableHeader>
                                    <TableBody>
                                        {data.map((row: any, index) => (
                                            <TableRow key={index} className={`${isDateMoreThanAMonthAgo(row.dateTimeOut) && 'bg-red-100'} grid grid-cols-[repeat(18,minmax(0,1fr))] hover:bg-inherit`}>
                                                <TableCell className="pl-2 col-span-1 break-words">{index + 1} {isDateMoreThanAMonthAgo(row.dateTimeOut) && <span className='text-red-500 ml-2 font-semibold'>Expired</span>}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.name}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.fName}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.cnic}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.address}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.driverName}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.secondSeater}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.chassisNumber}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.engineNumber}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.dateTimeOut ? dayjs.utc(row.dateTimeOut).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.dateTimeOut ? dayjs.utc(row.dateTimeOut).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.dateTimeIn ? dayjs.utc(row.dateTimeIn).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.dateTimeIn ? dayjs.utc(row.dateTimeIn).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.regnNo}</TableCell>
                                                <TableCell className="pl-2 col-span-2 flex gap-2 items-center">
                                                    {
                                                        state.userDetails?.role === 'super-admin' &&
                                                        <>
                                                            <button onClick={() => {
                                                                setCurrentEntry(row)
                                                                setOpenEdit(true)
                                                            }} className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                                            <button disabled={!!deleteEntryId} onClick={() => deleteEntry(row._id)} className='py-1 px-2 rounded-md bg-red-400'>{deleteEntryId === row._id ? <Loader height='h-4' width='w-4' /> : 'Delete'} </button>
                                                        </>
                                                    }
                                                    {
                                                        state.userDetails?.role !== 'admin' &&
                                                        <button onClick={() => addInEntry(row)} className='py-1 px-2 rounded-md bg-blue-400'>{inEntry === row._id ? <Loader height='h-4' width='w-4' /> : 'In'}</button>
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
                    type={type}
                    fetchData={fetchData}
                />
            }

        </div>
    );
}

export default IranToPak;