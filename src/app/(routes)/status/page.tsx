'use client'

import { BarChart, Loader } from "@/components/common";
import { FormEvent, useState } from "react"
import { Toaster, toast } from 'react-hot-toast';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const exportToCSV = (apiData: any, fileName: string) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}


const Page = () => {
    const [selected, setSelected] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState<any>()


    let data = [
        { title: 'Token Data', id: 'token' },
        { title: 'Fuel Trade Vehs', id: 'fuelTrade' },
        { title: 'Local Residents', id: 'local' },
    ]
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/entry/searchbetweendates', {
                method: "POST",
                body: JSON.stringify({ startDate, endDate, type: selected })
            })
            const data = await res.json()
            if (data.success === 'error') {
                throw new Error(data.message)
            }
            console.log(data.data);
            setFetchedData(data.data)
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


    const exportData = () => {
        exportToCSV(fetchedData, 'data')
    }


    return (
        <div className="mt-10">
            <Toaster />
            {
                !selected ?
                    <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-10">
                        {
                            data.map((item, i) => {
                                return (
                                    <div key={i} className="border flex flex-col gap-7 justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg p-7">
                                        <h1 className="text-2xl font-bold text-zinc-800">{item.title}</h1>
                                        <button onClick={() => {
                                            setSelected(item.id)
                                            setFetchedData(null)
                                        }} className="text-white text-sm bg-primary w-full py-3 px-3 rounded-lg font-semibold">SHOW DATA</button>
                                    </div>

                                )
                            })
                        }
                    </div>
                    :
                    <form className="flex flex-col items-start gap-5" onSubmit={onSubmit}>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="">
                                <h1 className="text-zinc-700 font-semibold">From Date</h1>
                                <input required onChange={(e) => setStartDate(e.target.value)} type="date" className="w-[300px] border py-3 px-5 border-zinc-300 rounded-md" />
                            </div>
                            <div className="">
                                <h1 className="text-zinc-700 font-semibold">To Date</h1>
                                <input required onChange={(e) => setEndDate(e.target.value)} type="date" className="w-[300px] border py-3 px-5 border-zinc-300 rounded-md" />
                            </div>
                        </div>
                        <button type="submit" className="py-4 w-[100px] bg-primary text-white font-semibold rounded-md">{loading ? <Loader height="h-4" width="w-4" /> : 'Submit'}</button>
                    </form>
            }
            {
                (fetchedData && fetchedData.length) ?
                    <div className="mt-10">
                        {
                            selected === 'token' ?
                                <div className="w-full lg:w-[70%]">
                                    <BarChart
                                        data={[fetchedData.filter((val: any) => val.type === 'local').length, fetchedData.filter((val: any) => val.type === 'fuelTrade').length]}
                                        labels={[
                                            'Local',
                                            'Fuel Trade'
                                        ]}
                                    />
                                </div>
                                :
                                <div className="w-full lg:w-[70%]">
                                    <BarChart
                                        data={[fetchedData.filter((val: any) => val.dateTimeOut).length, fetchedData.filter((val: any) => val.dateTimeIn).length]}
                                        labels={[
                                            'Pak to Iran',
                                            'Iran to Pak'
                                        ]}
                                    />
                                </div>
                        }
                        <button onClick={exportData} className="py-4 px-10 bg-primary text-white font-semibold rounded-md">Export CSV</button>
                    </div>
                    :
                    null
            }

            {
                fetchedData && !fetchedData.length ?
                    <h1 className="mt-10 text-lg font-bold text-zinc-800">No Data Found</h1>
                    :
                    null
            }
            {
                selected ?
                    <div className="mt-8 flex justify-end border-t py-5">
                        <button onClick={() => {
                            setSelected('')
                            setFetchedData(null)
                        }} className="text-white py-3 px-6 rounded-md bg-primary">Back</button>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Page