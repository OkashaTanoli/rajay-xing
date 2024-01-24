import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function TokenData() {

    const tableData = [
        {
            serID: "1",
            name: "John Doe",
            phone: "123-456-7890",
            cnic: "42101-1234567-1",
            vehicleNumber: "ABC-123",
            timeOfTokenIssue: "08:30 AM",
            driverDetails: "John's Driver",
            date: "01/23/2024"
        },
        {
            serID: "2",
            name: "Jane Smith",
            phone: "987-654-3210",
            cnic: "42101-7654321-2",
            vehicleNumber: "XYZ-789",
            timeOfTokenIssue: "09:15 AM",
            driverDetails: "Jane's Driver",
            date: "01/24/2024"
        },
        {
            serID: "3",
            name: "Alice Johnson",
            phone: "555-123-4567",
            cnic: "42101-1239876-3",
            vehicleNumber: "LMN-456",
            timeOfTokenIssue: "10:00 AM",
            driverDetails: "Alice's Driver",
            date: "01/25/2024"
        }
        // ... add more objects as needed
    ];

    return (
        <div className='mt-10'>
            <div className='block sm:flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-zinc-800'>Token Data</h1>
                <div className='flex gap-2 mt-3 sm:mt-0'>
                    <input type="text" placeholder='Name of Driver' className='w-[180px] flex-grow sm:w-auto text-sm sm:text-base bg-transparent border border-zinc-300 rounded-md py-2 px-4 text-zinc-800' name="" id="" />
                    <button className='bg-primary rounded-md py-2 px-4 text-white'>Search</button>
                </div>
            </div>
            <div className='flex justify-between items-center mt-3'>
                <h1 className='text-base sm:text-xl text-zinc-800'>Token Issued : 120</h1>
                <button className='bg-primary rounded-md py-2 px-4 text-white'>Add New</button>
            </div>
            <div className='mt-5 w-full overflow-auto'>
                <Table className='table-auto border w-[1200px] 2xl:w-full'>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader className='bg-primary'>
                        <TableRow className='grid grid-cols-[repeat(13,minmax(0,1fr))] hover:bg-inherit'>
                            <TableHead className="text-white h-auto col-span-1 flex items-center">Ser/ID</TableHead>
                            <TableHead className='text-white h-auto col-span-1 flex items-center'>Name / نام</TableHead>
                            <TableHead className='text-white h-auto col-span-1 flex items-center'>Phone</TableHead>
                            <TableHead className="text-white h-auto col-span-2 flex items-center">CNIC / شناختی کارڈ</TableHead>
                            <TableHead className="text-white h-auto col-span-1 flex items-center">Veh No / گاڑی کا نمبر</TableHead>
                            <TableHead className="text-white h-auto col-span-2 flex items-center">Time of Token Issue / ٹوکن ایشو کا وقت</TableHead>
                            <TableHead className="text-white h-auto col-span-2 flex items-center">Driver Details / ڈرائیور کی تفصیلات</TableHead>
                            <TableHead className="text-white h-auto col-span-1 flex items-center">Date / تاریخ</TableHead>
                            <TableHead className="text-white h-auto col-span-2 flex items-center">Action / عمل</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row, index) => (
                            <TableRow key={index} className='grid grid-cols-[repeat(13,minmax(0,1fr))]'>
                                <TableCell className="col-span-1">{row.serID}</TableCell>
                                <TableCell className='col-span-1'>{row.name}</TableCell>
                                <TableCell className='col-span-1'>{row.phone}</TableCell>
                                <TableCell className="col-span-2">{row.cnic}</TableCell>
                                <TableCell className="col-span-1">{row.vehicleNumber}</TableCell>
                                <TableCell className="col-span-2">{row.timeOfTokenIssue}</TableCell>
                                <TableCell className="col-span-2">{row.driverDetails}</TableCell>
                                <TableCell className="col-span-1">{row.date}</TableCell>
                                <TableCell className="col-span-2 flex gap-2 items-center">
                                    <button className='py-1 px-2 rounded-md bg-zinc-300'>Edit</button>
                                    <button className='py-1 px-2 rounded-md bg-red-400'>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    );
}

export default TokenData;