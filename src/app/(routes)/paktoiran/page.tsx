'use client'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
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

import { useSearchParams, useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast';
import { Loader } from '@/components/common';
import dayjs from 'dayjs';
import EditForm from '@/components/irantopak/editFrom';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import Webcam from "react-webcam";
import Image from 'next/image';
import { X } from 'lucide-react';
import { ContextApi } from '@/context/context';

function PakToIran() {

    const { state } = useContext(ContextApi)

    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const router = useRouter()

    // const [type, setType] = useState('local')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [tokenLengthLoading, setTokenLengthLoading] = useState(true)
    const [tokenLoading, setTokenLoading] = useState(false)
    const [deleteEntryId, setDeleteEntryId] = useState('')
    // const [search, setSearch] = useState('')
    const [tempSearch, setTempSearch] = useState(search ? search : '')
    const [currentEntry, setCurrentEntry] = useState<any>()
    const [openEdit, setOpenEdit] = useState(false)
    const [openPrintToken, setOpenPrintToken] = useState(false)
    const [openWebcam, setOpenWebcam] = useState(false)
    const [image, setImage] = useState('')
    const [tokenLength, setTokenLength] = useState<any>('')

    const [videoDevices, setVideoDevices] = useState<any>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>({});
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [deleteBulkLoading, setDeleteBulkLoading] = useState(false)


    const [inEntry, setInEntry] = useState('')

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                navigator.mediaDevices.enumerateDevices()
                    .then(devices => {
                        const videoInputs = devices.filter(device => device.kind === 'videoinput');
                        setVideoDevices(videoInputs);
                        if (videoInputs.length > 0) {
                            setSelectedDevice(videoInputs[0]);
                        }
                    });
            })
            .catch(error => {
                // Handle the case where the user denies access or no camera is available
            });
    }, []);

    // useEffect(() => {
    //     navigator.mediaDevices.enumerateDevices()
    //         .then(devices => {
    //             const videoInputs = devices.filter(device => device.kind === 'videoinput');
    //             setVideoDevices(videoInputs);
    //             if (videoInputs.length > 0) {
    //                 setSelectedDevice(videoInputs[0]);
    //             }
    //         });
    // }, []);

    const webcamRef: any = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setOpenWebcam(false)
        console.log(imageSrc);

    }, [webcamRef]);

    const handleDeviceChange = (event: any) => {
        const selectedDeviceId = event.target.value;
        const device = videoDevices.find((device: any) => device.deviceId === selectedDeviceId);
        setSelectedDevice(device);
    };

    const videoConstraints = {
        width: 1280,
        height: 720,
        deviceId: selectedDevice ? { exact: selectedDevice.deviceId } : undefined
    };


    // const printRef: any = useRef();
    // const printDiv = () => {
    //     // const printContents = printRef.current.innerHTML;
    //     const printWindow: any = window.open('', '', 'height=600,width=800');

    //     // Include Tailwind CSS for styling
    //     printWindow.document.write(`
    //       <html>
    //         <head>
    //           <title>Print</title>
    //           <link href="path_to_your_tailwind_css" rel="stylesheet">
    //         </head>
    //         <body>
    //           ${'<h1>hello</h1>'}
    //         </body>
    //       </html>
    //     `);

    //     printWindow.document.close();
    //     printWindow.onload = function () {
    //         printWindow.focus();
    //         printWindow.print();
    //         // printWindow.close();
    //     };
    // };



    async function fetchData() {
        setLoading(true)
        try {
            const res = await fetch(`/api/entry?forPage=pti&type=${type}&search=${search ? search : ''}`)
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
            router.push(`/paktoiran?type=local`)
        }
        if ((state.userDetails && state.userDetails.role === 'user-out-local') && type === 'fuelTrade') {
            router.push(`/paktoiran?type=local`)
        }
        if ((state.userDetails && state.userDetails.role === 'user-out-fuel-trade') && type === 'local') {
            router.push(`/paktoiran?type=fuelTrade`)
        }
        else if (state.userDetails && state.userDetails.role === 'user-in-out-local' && type === 'fuelTrade') {
            router.push(`/paktoiran?type=local`)
        }
        else {
            if (state.userDetails && ((state.userDetails?.role === 'user-out-local' && type === 'local') || (state.userDetails.role === 'user-out-fuel-trade' && type === 'fuelTrade') || state.userDetails.role === 'super-admin' || state.userDetails.role === 'admin' || (state.userDetails?.role === 'user-in-out-local' && type === 'local'))) {
                fetchData()
            }
        }
    }, [type, search, state.userDetails])

    async function getTokenLength() {
        try {
            setTokenLengthLoading(true)
            const res = await fetch('/api/token/gettokenlength', { cache: 'no-store' })
            const data = await res.json()
            if (data.status === 'error') {
                throw new Error(data.message)
            }
            setTokenLength(data.data.token_length)
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
            setTokenLengthLoading(false)
        }
    }
    useEffect(() => {
        getTokenLength()
    }, [])


    const changeType = (value: string) => {
        setSelectedOptions([])
        router.push(`/paktoiran?type=${value}&search=${search ? search : ''}`)
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

    const deleteEntries = async (ids: string[]) => {
        setDeleteBulkLoading(true)
        try {
            // Assuming your API endpoint can accept an array of IDs for deletion
            const res = await fetch(`/api/entry/bulk`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids }), // Send the array of IDs as a JSON payload
            });

            const data = await res.json();

            if (data.status === 'error') {
                throw new Error(data.message);
            }

            // Display success message
            toast.success(data.message, {
                duration: 3000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",
                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            });

            // Refetch data to update the UI after deletion
            fetchData();
        } catch (err: any) {
            // Handle any errors that occurred during the deletion process
            toast.error(err.message, {
                duration: 4000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",
                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            });
        } finally {
            // Reset any related state or perform cleanup as necessary
            setDeleteEntryId(''); // Adjust accordingly if managing deletion IDs state
            setDeleteBulkLoading(false)
            setSelectedOptions([])
        }
    };


    async function createToken() {
        try {
            setTokenLoading(true)
            let data = {
                entryId: currentEntry?._id,
                type: currentEntry?.type,
                name: currentEntry?.name,
                driverName: currentEntry?.driverName ?? '',
                image: image,
                cnic: currentEntry?.cnic,
                regnNo: currentEntry?.regnNo ? currentEntry?.regnNo : ''
            }
            const response = await fetch(`/api/token`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const resData = await response.json()
            if (resData.status === 'error') {
                throw new Error(resData.message)
            }
            if (resData.status === 'success') {
                toast.success(`${resData.message}`, {
                    duration: 2000,
                    position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                    style: {
                        backgroundColor: '#d9d9d9',
                        padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                        fontSize: '14px',
                        fontWeight: 'bold'
                    },
                });
                window.print()
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
            setTokenLoading(false)
        }

    }


    const addOutEntry = async (row: any) => {
        try {
            setInEntry(row._id)
            const response = await fetch(`/api/entry/${row._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ ...row, dateTimeOut: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000) })
            })
            const resData = await response.json()
            if (resData.status === 'error') {
                throw new Error(resData.message)
            }
            if (resData.status === 'success') {
                toast.success(`${'User Out successfully'}`, {
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



    // Handle checkbox change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOptions((prev) => {
            if (prev.includes(value)) {
                // Remove the item from the array if it is already selected
                return prev.filter((item) => item !== value);
            } else {
                // Add the item to the array if it is not already selected
                return [...prev, value];
            }
        });
    };



    const handleSelectAll = () => {
        setSelectedOptions(data.map((entry: any) => entry._id));
    };


    return (
        <div className='mt-10'>
            <div className='print:hidden'>
                <Toaster />
            </div>
            <div className='block sm:flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-zinc-800'>Pak to Iran</h1>
                <div className='flex gap-2 mt-3 sm:mt-0'>
                    <input value={tempSearch} onChange={(e) => setTempSearch(e.target.value)} type="text" placeholder='Search' className='w-[180px] flex-grow sm:w-auto text-sm sm:text-base bg-transparent border border-zinc-300 rounded-md py-2 px-4 text-zinc-800' name="" id="" />
                    <Link href={`/paktoiran?type=${type}&search=${tempSearch}`}><button className='bg-primary rounded-md py-2 px-4 text-white'>Search</button></Link>
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
            {
                selectedOptions.length && data.length && state.userDetails && state.userDetails.role === 'super-admin' ?
                    <div className='mt-5 flex gap-3'>
                        <button onClick={() => deleteEntries(selectedOptions)} className='w-[120px] h-[40px] flex justify-center items-center font-semibold  bg-red-400 rounded-md border-none'>{deleteBulkLoading ? <Loader height='h-4' width='w-4' /> : 'Delete'} </button>
                        <button onClick={() => handleSelectAll()} className='w-[120px] h-[40px] flex justify-center items-center font-semibold  bg-blue-400 rounded-md border-none'>Select All</button>
                    </div>
                    :
                    null
            }
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
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Date Out / جانے کی تاریخ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-2'>Time Out / جانے کا وقت</TableHead>
                                            <TableHead className="pl-2 h-auto text-white col-span-2">Date In / آنے کی تاریخ</TableHead>
                                            <TableHead className='pl-2 h-auto text-white col-span-2'>Time In / آنے کا وقت</TableHead>
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
                                                <TableCell className="pl-2 col-span-1 break-words flex items-center">
                                                    {
                                                        state.userDetails && state.userDetails.role === 'super-admin' &&
                                                        <input
                                                            type="checkbox"
                                                            id={row._id}
                                                            value={row._id}
                                                            checked={selectedOptions.includes(row._id)}
                                                            onChange={handleChange}
                                                            className='mr-2'
                                                        />
                                                    }
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.name}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.fName}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.cnic}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.address}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.vehsType}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.dateTimeOut ? dayjs(row.dateTimeOut).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.dateTimeOut ? dayjs(row.dateTimeOut).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.dateTimeIn ? dayjs(row.dateTimeIn).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.dateTimeIn ? dayjs(row.dateTimeIn).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.guestName}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.cnicOfGuest}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.addressOfGuest}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.childrenNos}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.accompanyingFamilyMembersName}</TableCell>
                                                <TableCell className="pl-2 col-span-3 break-words">{row.cnicOfFamilyMembers}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.relation}</TableCell>
                                                <TableCell className="pl-2 col-span-3 flex flex-wrap gap-2 items-center">
                                                    {
                                                        (state.userDetails?.role === 'super-admin' || state.userDetails?.role === 'user-out-local') &&
                                                        <>
                                                            <button onClick={() => {
                                                                setCurrentEntry(row)
                                                                setOpenEdit(true)
                                                            }} className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                                        </>
                                                    }
                                                    {
                                                        state.userDetails?.role === 'super-admin' &&
                                                        <button disabled={!!deleteEntryId} onClick={() => deleteEntry(row._id)} className='py-1 px-2 rounded-md bg-red-400'>{deleteEntryId === row._id ? <Loader height='h-4' width='w-4' /> : 'Delete'} </button>
                                                    }
                                                    {
                                                        state.userDetails?.role !== 'admin' &&
                                                        <button onClick={() => addOutEntry(row)} className='py-1 px-2 rounded-md bg-blue-400'>{inEntry === row._id ? <Loader height='h-4' width='w-4' /> : 'Out'} </button>
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
                                            <TableRow key={index} className='grid grid-cols-[repeat(18,minmax(0,1fr))] hover:bg-inherit'>
                                                <TableCell className="pl-2 col-span-1 break-words">
                                                    {
                                                        state.userDetails && state.userDetails.role === 'super-admin' &&
                                                        <input
                                                            type="checkbox"
                                                            id={row._id}
                                                            value={row._id}
                                                            checked={selectedOptions.includes(row._id)}
                                                            onChange={handleChange}
                                                            className='mr-2'
                                                        />
                                                    }
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.name}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.fName}</TableCell>
                                                <TableCell className="pl-2 col-span-2 break-words">{row.cnic}</TableCell>
                                                <TableCell className='pl-2 col-span-2 break-words'>{row.address}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.driverName}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.secondSeater}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.chassisNumber}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.engineNumber}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.dateTimeOut ? dayjs(row.dateTimeOut).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.dateTimeOut ? dayjs(row.dateTimeOut).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.dateTimeIn ? dayjs(row.dateTimeIn).format('DD-MM-YYYY') : '-'}</TableCell>
                                                <TableCell className='pl-2 col-span-1 break-words'>{row.dateTimeIn ? dayjs(row.dateTimeIn).format('H:mm A') : '-'}</TableCell>
                                                <TableCell className="pl-2 col-span-1 break-words">{row.regnNo}</TableCell>
                                                <TableCell className="pl-2 col-span-2 flex flex-wrap gap-2 items-center">
                                                    {
                                                        (state.userDetails?.role === 'super-admin' || state.userDetails?.role === 'user-out-fuel-trade') &&
                                                        <>
                                                            <button onClick={() => {
                                                                setCurrentEntry(row)
                                                                setOpenEdit(true)
                                                            }} className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                                        </>
                                                    }
                                                    {
                                                        state.userDetails?.role === 'super-admin' &&
                                                        <button disabled={!!deleteEntryId} onClick={() => deleteEntry(row._id)} className='py-1 px-2 rounded-md bg-red-400'>{deleteEntryId === row._id ? <Loader height='h-4' width='w-4' /> : 'Delete'} </button>
                                                    }
                                                    {
                                                        state.userDetails?.role !== 'admin' &&
                                                        <button onClick={() => {
                                                            setOpenPrintToken(true)
                                                            setCurrentEntry(row)
                                                            getTokenLength()
                                                        }} className='py-1 px-2 rounded-md bg-blue-400'>Out </button>
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

            {
                openPrintToken && currentEntry &&
                <Dialog open={openPrintToken} onOpenChange={setOpenPrintToken}>
                    <DialogContent className='max-w-[500px] print:max-w-[270px] max-h-screen print:max-h-[650px] !overflow-auto'>
                        <X onClick={() => {
                            setCurrentEntry(null)
                            setOpenWebcam(false)
                            setImage('')
                            setOpenPrintToken(false)
                        }} className="absolute cursor-pointer print:hidden top-3 right-3 h-4 w-4" />
                        {
                            tokenLengthLoading ?
                                <div className='my-10 flex justify-center'>
                                    Loading Tokens Length ...
                                </div>
                                :
                                !String(tokenLength) ?
                                    <div className='my-10 flex justify-center'>
                                        Failed to load token length. try again
                                    </div>
                                    :
                                    <DialogHeader>
                                        <DialogTitle className='text-xl font-bold text-zinc-800 print:hidden'>Print Token</DialogTitle>
                                        <DialogDescription>
                                            <div className='mt-5 print:mt-1'>
                                                {
                                                    openWebcam ?
                                                        <div>
                                                            <Webcam height={600} width={600} ref={webcamRef} videoConstraints={videoConstraints} />
                                                            <select onChange={handleDeviceChange}>
                                                                {videoDevices.map((device: any) => (
                                                                    <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
                                                                ))}
                                                            </select>
                                                            <button onClick={capture} className='text-white mt-5 bg-primary py-3 px-5 rounded-md'>Capture photo</button>
                                                        </div>
                                                        :

                                                        <div className='mt-5 print:mt-1 flex flex-col gap-5'>
                                                            <div className='flex flex-col items-center'>
                                                                <div className='w-full hidden print:flex mb-8 justify-between items-center'>
                                                                    <Image src={'/logo.png'} alt='logo' className='w-[50px]' width={50} height={50} />
                                                                    <h1 className='text-sm font-bold text-zinc-800'>RAJAY CROSSING</h1>
                                                                </div>
                                                                <div className=''>
                                                                    {
                                                                        image ?
                                                                            <div className='flex flex-col items-center'>
                                                                                <Image src={image} alt='image' className='h-full object-cover' width={200} height={200} />
                                                                                <button onClick={() => {
                                                                                    setOpenWebcam(true)
                                                                                    setImage('')
                                                                                }} className='text-white bg-primary py-3 px-5 rounded-md mt-2 print:hidden'>Re-take Picture</button>
                                                                            </div>
                                                                            :
                                                                            <div className=''>
                                                                                <button onClick={() => setOpenWebcam(true)} className='text-white bg-primary py-3 px-5 rounded-md print:hidden'>Take Picture</button>
                                                                            </div>
                                                                    }
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <QRCodeSVG size={150} value={`http://192.168.0.148:3000/irantopak?type=${currentEntry?.type}&search=${currentEntry._id}`} />
                                                                </div>
                                                            </div>
                                                            <div className='text-base flex flex-col gap-2 font-bold text-zinc-800'>
                                                                <p><span className='text-primary'>Name:</span> {currentEntry?.name}</p>
                                                                <p><span className='text-primary'>CNIC:</span> {currentEntry?.cnic}</p>
                                                                <p><span className='text-primary'>Driver Name:</span> {currentEntry?.driverName ?? '-'}</p>
                                                                <p><span className='text-primary'>Reg No:</span> {currentEntry?.regnNo ? currentEntry?.regnNo : '-'}</p>
                                                                <p><span className='text-primary'>Issued By:</span> {state.userDetails?.name ?? '-'}</p>
                                                                <p><span className='text-primary'>Token Number:</span> {tokenLength + 1 ?? '-'}</p>
                                                            </div>
                                                        </div>
                                                }

                                                {
                                                    !openWebcam &&
                                                    <div className='flex justify-end pt-5 border-t mt-5 print:hidden'>
                                                        <button onClick={createToken} disabled={tokenLoading} className='w-[120px] py-3 font-semibold bg-primary text-white rounded-md'>{tokenLoading ? <Loader height='h-4' width='w-4' /> : 'Print'}</button>
                                                    </div>
                                                }
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                        }
                    </DialogContent>
                </Dialog>

            }

        </div>
    );
}

export default PakToIran;

