'use client'

import { Loader } from '@/components/common';
import { IFormSchema, formSchema } from '@/utils/zodschema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';

function ManualEntry() {

    // const [type, setType] = useState('local')
    const [loading, setLoading] = useState(false)


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "local",
            name: "",
            fName: "",
            cnic: "",
            address: "",
            // dateTimeOut: "",
            // dateTimeIn: "",

            // Fields specific to 'local' type
            vehsType: "",
            accompanyingFamilyMembersName: "",
            cnicOfFamilyMembers: "",
            relation: "",
            guestName: "",
            cnicOfGuest: "",
            addressOfGuest: "",
            childrenNos: "",

            // Fields specific to 'fuelTrade' type
            driverName: "",
            secondSeater: "",
            chassisNumber: "",
            engineNumber: "",
            regnNo: "",
        }
    })


    async function onSubmit(data: IFormSchema) {
        try {
            setLoading(true)
            const response = await fetch('/api/entry', {
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
            }
            reset()
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


    return (
        <div className='mt-10'>
            <Toaster />
            <h1 className='text-2xl font-bold text-zinc-800'>Manual Entry</h1>
            <div className='mt-10'>
                <form action="" onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="select" className='text-sm text-zinc-700 font-semibold'>Select / منتخب کریں۔</label>
                            <select id="select" {...register("type")} className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base'>
                                <option value="local">Local</option>
                                <option value="fuelTrade">Fuel Trade</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='text-sm text-zinc-700 font-semibold'>Name / نام</label>
                            <input {...register("name")} type="text" id='name' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="fName" className='text-sm text-zinc-700 font-semibold'>Father Name / والد کا نام</label>
                            <input {...register("fName")} type="text" id='fName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="cnic" className='text-sm text-zinc-700 font-semibold'>CNIC / شناختی کارڈ</label>
                            <input {...register("cnic")} type="text" id='cnic' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="address" className='text-sm text-zinc-700 font-semibold'>Address / پتہ</label>
                            <input {...register("address")} type="text" id='address' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        {/* <div className='flex flex-col gap-1'>
                            <label htmlFor="dateTimeOut" className='text-sm text-zinc-700 font-semibold'>Date Time Out / آنے کی تاریخ اور وقت</label>
                            <input {...register("dateTimeOut")} type="datetime-local" id='dateTimeOut' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="dateTimeIn" className='text-sm text-zinc-700 font-semibold'>Date Time In / آنے کی تاریخ اور وقت</label>
                            <input {...register("dateTimeIn")} type="datetime-local" id='dateTimeIn' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div> */}
                        {
                            watch().type === 'local' ?
                                <>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="vehsType" className='text-sm text-zinc-700 font-semibold'>Vehicle Type / گاڑی کی قسم</label>
                                        <input {...register("vehsType")} type="text" id='vehsType' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="accompanyingFamilyMembersName" className='text-sm text-zinc-700 font-semibold'>Accompanying Family Members Name / ھمرا کا نام</label>
                                        <input {...register("accompanyingFamilyMembersName")} type="text" id='accompanyingFamilyMembersName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="cnicOfFamilyMembers" className='text-sm text-zinc-700 font-semibold'>CNIC of Family Members / خاندان کا شناختی کارڈ</label>
                                        <input {...register("cnicOfFamilyMembers")} type="text" id='cnicOfFamilyMembers' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="relation" className='text-sm text-zinc-700 font-semibold'>Relation / ر شتہ</label>
                                        <input {...register("relation")} type="text" id='relation' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="guestName" className='text-sm text-zinc-700 font-semibold'>Guest Name / مہمان کا نام</label>
                                        <input {...register("guestName")} type="text" id='guestName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="cnicOfGuest" className='text-sm text-zinc-700 font-semibold'>CNIC of Guest / شناختی نمبر مہمان کا</label>
                                        <input {...register("cnicOfGuest")} type="text" id='cnicOfGuest' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="addressOfGuest" className='text-sm text-zinc-700 font-semibold'>Address of Guest / مہمان کا پتہ</label>
                                        <input {...register("addressOfGuest")} type="text" id='addressOfGuest' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="childrenNos" className='text-sm text-zinc-700 font-semibold'>Number of Children / بچوں کی تعداد</label>
                                        <input {...register("childrenNos")} type="text" id='childrenNos' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                </>

                                :
                                <>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="driverName" className='text-sm text-zinc-700 font-semibold'>Driver Name / گاڈی چلانے والے کا نام</label>
                                        <input {...register("driverName")} type="text" id='driverName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="secondSeater" className='text-sm text-zinc-700 font-semibold'>Second Seater / دوسری ثیٹر</label>
                                        <input {...register("secondSeater")} type="text" id='secondSeater' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="chassisNumber" className='text-sm text-zinc-700 font-semibold'>Chassis Number / باڈی نمبر</label>
                                        <input {...register("chassisNumber")} type="text" id='chassisNumber' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="engineNumber" className='text-sm text-zinc-700 font-semibold'>Engine Number / انجن نامبر</label>
                                        <input {...register("engineNumber")} type="text" id='engineNumber' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="regnNo" className='text-sm text-zinc-700 font-semibold'>Regn No / درج نمبر</label>
                                        <input {...register("regnNo")} type="text" id='regnNo' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                </>

                        }

                    </div>

                    <div className="mt-8 flex justify-end border-t py-5">
                        <button disabled={loading} type='submit' className="text-white w-[100px] h-[50px] rounded-md bg-primary">{loading ? <Loader height='h-4' width='w-4' /> : 'Submit'}</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default ManualEntry;