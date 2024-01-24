'use client'

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function IranToPak() {
    const [type, setType] = useState('local')

    const officialData = [
        {
            name: "Azhar Abbas",
            fatherName: "Zahir Shah",
            cnic: "23991-0912345-1",
            driverName: "Asif Janjua",
            secondSeater: "Zubair Ahmed",
            address: "Faisal Colony, Dalbandin",
            chassisNumber: "NYP-22300145",
            engineNumber: "1y-231245-M2",
            dateOut: "19/1/2024",
            timeOut: "1430",
            dateIn: "20/1/2024",
            timeIn: "1320",
            regnNo: "1190",
            serNo: "1"
        },
        {
            name: "Sara Khan",
            fatherName: "Imran Khan",
            cnic: "23345-0987654-2",
            driverName: "Rahim Ali",
            secondSeater: "Nadia Ali",
            address: "Model Town, Quetta",
            chassisNumber: "XYZ-45678910",
            engineNumber: "2z-987654-N1",
            dateOut: "21/1/2024",
            timeOut: "0900",
            dateIn: "22/1/2024",
            timeIn: "1700",
            regnNo: "2345",
            serNo: "2"
        },
        {
            name: "Ali Raza",
            fatherName: "Kamran Raza",
            cnic: "21234-5678901-3",
            driverName: "Umer Farooq",
            secondSeater: "Sana Umer",
            address: "Jinnah Road, Karachi",
            chassisNumber: "ABCD-1234EF56",
            engineNumber: "3x-654321-C4",
            dateOut: "23/1/2024",
            timeOut: "1000",
            dateIn: "24/1/2024",
            timeIn: "1800",
            regnNo: "5678",
            serNo: "3"
        }
    ];

    const localResidentData = [
        {
            timeIn: 1200,
            dateIn: "20/1/2024",
            timeOut: 1100,
            dateOut: "19/1/2024",
            vehsType: "Toyota Single Cabin (S/C)",
            addressOfGuest: "Gwalishtap",
            cnicOfGuest: "12345-112234-1",
            guestName: "asif",
            childrenNos: 2,
            cnicOfFamilyMembers: "22331-123456-2",
            relation: "Brother",
            accompanyingFamilyMembersName: "Sajjad",
            address: "Rajay killi",
            cnic: "55331-112345-2",
            fatherName: "Hoobyar",
            name: "Asfand",
            serNo: 1
        },
        {
            timeIn: 1300,
            dateIn: "21/1/2024",
            timeOut: 1200,
            dateOut: "20/1/2024",
            vehsType: "Honda Civic",
            addressOfGuest: "Zarghoon Town",
            cnicOfGuest: "23456-223344-2",
            guestName: "bilal",
            childrenNos: 1,
            cnicOfFamilyMembers: "33444-234567-3",
            relation: "Cousin",
            accompanyingFamilyMembersName: "Farhan",
            address: "Samungli Road",
            cnic: "44556-234567-4",
            fatherName: "Khalid",
            name: "Noman",
            serNo: 2
        },
    ]


    const tableData = [
        {
            serID: "1",
            name: "John Doe",
            phone: "123-456-7890",
            cnic: "42101-1234567-1",
            vehicleNumber: "ABC-123",
            crossingTime: "08:30 AM",
            driverDetails: "John's Driver",
            date: "01/23/2024"
        },
        {
            serID: "2",
            name: "Jane Smith",
            phone: "987-654-3210",
            cnic: "42101-7654321-2",
            vehicleNumber: "XYZ-789",
            crossingTime: "09:15 AM",
            driverDetails: "Jane's Driver",
            date: "01/24/2024"
        },
        {
            serID: "3",
            name: "Alice Johnson",
            phone: "555-123-4567",
            cnic: "42101-1239876-3",
            vehicleNumber: "LMN-456",
            crossingTime: "10:00 AM",
            driverDetails: "Alice's Driver",
            date: "01/25/2024"
        }
        // ... add more objects as needed
    ];

    return (
        <div className='mt-10'>
            <div className='block sm:flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-zinc-800'>Iran To Pak</h1>
                <div className='flex gap-2 mt-3 sm:mt-0'>
                    <input type="text" placeholder='Name of Driver' className='w-[180px] flex-grow sm:w-auto text-sm sm:text-base bg-transparent border border-zinc-300 rounded-md py-2 px-4 text-zinc-800' name="" id="" />
                    <button className='bg-primary rounded-md py-2 px-4 text-white'>Search</button>
                </div>
            </div>
            <div className='flex justify-between items-center mt-3'>
                <h1 className='text-base sm:text-xl text-zinc-800'>Crossed Vehs : 120</h1>
                <div className='flex gap-2'>
                    <select value={type} onChange={(e) => setType(e.target.value)} className='py-2 px-4 text-sm text-zinc-800 rounded-md border border-zinc-300'>
                        <option value="local">Local</option>
                        <option value="fuelTrade">Fuel Trade</option>
                    </select>
                    <button className='bg-primary rounded-md py-2 px-4 text-white'>Add New</button>
                </div>
            </div>
            <div className='mt-5 w-full overflow-auto'>
                {
                    type === 'local' ?
                        <Table className='table-auto border w-[2200px]'>
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            <TableHeader className='bg-primary'>
                                <TableRow className=' grid grid-cols-[repeat(34,minmax(0,1fr))] hover:bg-inherit'>
                                    <TableHead className="pl-2 h-auto text-white col-span-1">Ser/ID</TableHead>
                                    <TableHead className='pl-2 h-auto text-white col-span-1'>Name / نام</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Father Name / والد کا نام</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">CNIC / شناختی کارڈ</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Address / پتہ</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Veh Type / گاڑی کی قسم</TableHead>
                                    <TableHead className='pl-2 h-auto text-white col-span-2'>Time In / آنے کا وقت</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Date In / آنے کی تاریخ</TableHead>
                                    <TableHead className='pl-2 h-auto text-white col-span-2'>Time Out / جانے کا وقت</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Date Out / جانے کی تاریخ</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Guest Name / مہمان کا نام</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Guest CNIC / شناختی نمبر مہمان کا</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Guest Address / مہمان کا پتہ</TableHead>
                                    <TableHead className='pl-2 h-auto text-white col-span-2'>Children Nos / بچوں کی تعداد</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Family Member Name / ھمرا کا نام</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-3">Family CNIC / خاندان کا شناختی کارڈ</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-1">Relation / ر شتہ</TableHead>
                                    <TableHead className="pl-2 h-auto text-white col-span-2">Action / عمل</TableHead>
                                </TableRow>

                            </TableHeader>
                            <TableBody>
                                {localResidentData.map((row, index) => (
                                    <TableRow key={index} className='grid grid-cols-[repeat(34,minmax(0,1fr))] hover:bg-inherit'>
                                        <TableCell className="pl-2 col-span-1">{row.serNo}</TableCell>
                                        <TableCell className='pl-2 col-span-1'>{row.name}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.fatherName}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.cnic}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.address}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.vehsType}</TableCell>
                                        <TableCell className='pl-2 col-span-2'>{row.timeIn}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.dateIn}</TableCell>
                                        <TableCell className='pl-2 col-span-2'>{row.timeOut}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.dateOut}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.guestName}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.cnicOfGuest}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.addressOfGuest}</TableCell>
                                        <TableCell className='pl-2 col-span-2'>{row.childrenNos}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.accompanyingFamilyMembersName}</TableCell>
                                        <TableCell className="pl-2 col-span-3">{row.cnicOfFamilyMembers}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.relation}</TableCell>
                                        <TableCell className="pl-2 col-span-2 flex gap-2 items-center">
                                            <button className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                            <button className='py-1 px-2 rounded-md bg-red-400'>Delete</button>
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
                                {officialData.map((row, index) => (
                                    <TableRow key={index} className='grid grid-cols-[repeat(18,minmax(0,1fr))] hover:bg-inherit'>
                                        <TableCell className="pl-2 col-span-1">{row.serNo}</TableCell>
                                        <TableCell className='pl-2 col-span-1'>{row.name}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.fatherName}</TableCell>
                                        <TableCell className="pl-2 col-span-2">{row.cnic}</TableCell>
                                        <TableCell className='pl-2 col-span-2'>{row.address}</TableCell>
                                        <TableCell className='pl-2 col-span-1'>{row.driverName}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.secondSeater}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.chassisNumber}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.engineNumber}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.dateOut}</TableCell>
                                        <TableCell className='pl-2 col-span-1'>{row.timeOut}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.dateIn}</TableCell>
                                        <TableCell className='pl-2 col-span-1'>{row.timeIn}</TableCell>
                                        <TableCell className="pl-2 col-span-1">{row.regnNo}</TableCell>
                                        <TableCell className="pl-2 col-span-2 flex gap-2 items-center">
                                            <button className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                            <button className='py-1 px-2 rounded-md bg-red-400'>Delete</button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>

                }

            </div>
        </div>
    );
}

export default IranToPak;