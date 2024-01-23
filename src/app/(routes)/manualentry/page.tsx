'use client'

import React, { useState } from 'react';

function ManualEntry() {

    const [type, setType] = useState('local')

    return (
        <div className='mt-10'>
            <h1 className='text-2xl font-bold text-zinc-800'>Manual Entry</h1>
            <div className='mt-10'>
                {/* <form action="" >
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="select" className='text-sm text-zinc-700 font-semibold'>Select</label>
                            <select name="" id="select" className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base'>
                                <option value="Local">Local</option>
                                <option value="Official">Official</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='text-sm text-zinc-700 font-semibold'>Name</label>
                            <input type="text" id='name' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="fName" className='text-sm text-zinc-700 font-semibold'>Father Name</label>
                            <input type="text" id='fName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="vehsMake" className='text-sm text-zinc-700 font-semibold'>Vehs Make</label>
                            <select name="" id="vehsMake" className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base'>
                                <option value="Owner">Owner</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="cnic" className='text-sm text-zinc-700 font-semibold'>CNIC</label>
                            <input type="text" id='cnic' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phone" className='text-sm text-zinc-700 font-semibold'>Phone No.</label>
                            <input type="text" id='phone' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phone2" className='text-sm text-zinc-700 font-semibold'>Phone No. 2</label>
                            <input type="text" id='phone2' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="vehsNo" className='text-sm text-zinc-700 font-semibold'>Vehs No</label>
                            <input type="text" id='vehsNo' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="vehsname" className='text-sm text-zinc-700 font-semibold'>Vehs Name</label>
                            <input type="text" id='vehsname' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="dateTimeIn" className='text-sm text-zinc-700 font-semibold'>Date Time In</label>
                            <input type="date" id='dateTimeIn' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="dateTimeOut" className='text-sm text-zinc-700 font-semibold'>Date Time Out</label>
                            <input type="date" id='dateTimeOut' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        <div className='flex flex-col gap-1 col-span-1 sm:col-span-2 md:col-span-3'>
                            <label htmlFor="address" className='text-sm text-zinc-700 font-semibold'>Address</label>
                            <textarea name="" className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' id="address" rows={3}></textarea>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end border-t py-5">
                        <button type='button' className="text-white py-3 px-6 rounded-md bg-primary">Submit</button>
                    </div>
                </form> */}
                <form action="">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="select" className='text-sm text-zinc-700 font-semibold'>Select</label>
                            <select name="" id="select" value={type} onChange={(e) => setType(e.target.value)} className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base'>
                                <option value="local">Local</option>
                                <option value="official">Official</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='text-sm text-zinc-700 font-semibold'>Name</label>
                            <input type="text" id='name' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="fName" className='text-sm text-zinc-700 font-semibold'>Father Name</label>
                            <input type="text" id='fName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="cnic" className='text-sm text-zinc-700 font-semibold'>CNIC</label>
                            <input type="text" id='cnic' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="address" className='text-sm text-zinc-700 font-semibold'>Address</label>
                            <textarea id="address" className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' rows={1}></textarea>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="dateTimeOut" className='text-sm text-zinc-700 font-semibold'>Date Time Out</label>
                            <input type="datetime-local" id='dateTimeOut' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="dateTimeIn" className='text-sm text-zinc-700 font-semibold'>Date Time In</label>
                            <input type="datetime-local" id='dateTimeIn' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                        </div>
                        {
                            type === 'local' ?
                                <>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="vehsType" className='text-sm text-zinc-700 font-semibold'>Vehicle Type</label>
                                        <input type="text" id='vehsType' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="addressOfGuest" className='text-sm text-zinc-700 font-semibold'>Address of Guest</label>
                                        <input type="text" id='addressOfGuest' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="cnicOfGuest" className='text-sm text-zinc-700 font-semibold'>CNIC of Guest</label>
                                        <input type="text" id='cnicOfGuest' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="guestName" className='text-sm text-zinc-700 font-semibold'>Guest Name</label>
                                        <input type="text" id='guestName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="childrenNos" className='text-sm text-zinc-700 font-semibold'>Number of Children</label>
                                        <input type="number" id='childrenNos' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="cnicOfFamilyMembers" className='text-sm text-zinc-700 font-semibold'>CNIC of Family Members</label>
                                        <input type="text" id='cnicOfFamilyMembers' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="relation" className='text-sm text-zinc-700 font-semibold'>Relation</label>
                                        <input type="text" id='relation' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="accompanyingFamilyMembersName" className='text-sm text-zinc-700 font-semibold'>Accompanying Family Members Name</label>
                                        <input type="text" id='accompanyingFamilyMembersName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                </>

                                :
                                <>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="driverName" className='text-sm text-zinc-700 font-semibold'>Driver Name</label>
                                        <input type="text" id='driverName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="secondSeater" className='text-sm text-zinc-700 font-semibold'>Second Seater</label>
                                        <input type="text" id='secondSeater' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="chassisNumber" className='text-sm text-zinc-700 font-semibold'>Chassis Number</label>
                                        <input type="text" id='chassisNumber' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="engineNumber" className='text-sm text-zinc-700 font-semibold'>Engine Number</label>
                                        <input type="text" id='engineNumber' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="regnNo" className='text-sm text-zinc-700 font-semibold'>Regn No</label>
                                        <input type="text" id='regnNo' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                                    </div>
                                </>

                        }

                    </div>

                    <div className="mt-8 flex justify-end border-t py-5">
                        <button type='submit' className="text-white py-3 px-6 rounded-md bg-primary">Submit</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default ManualEntry;