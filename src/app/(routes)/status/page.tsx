'use client'

import { useState } from "react"

const Page = () => {
    const [selected, setSelected] = useState('')
    let data = [
        { title: 'Token Data' },
        { title: 'Fuel Trade Vehs' },
        { title: 'Local Residents' },
    ]
    return (
        <div className="mt-10">
            {
                !selected ?
                    <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-10">
                        {
                            data.map((item, i) => {
                                return (
                                    <div key={i} className="border flex flex-col gap-7 justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg p-7">
                                        <h1 className="text-2xl font-bold text-zinc-800">{item.title}</h1>
                                        <button onClick={() => setSelected(item.title)} className="text-white text-sm bg-primary w-full py-3 px-3 rounded-lg font-semibold">SHOW DATA</button>
                                    </div>

                                )
                            })
                        }
                    </div>
                    :
                    <div className="flex flex-col items-start gap-5">
                        <div className="">
                            <h1 className="text-zinc-700 font-semibold">Select Date</h1>
                            <input type="date" className="w-[300px] border py-3 px-5 border-zinc-300 rounded-md" />
                        </div>
                        <button className="py-4 px-10 bg-primary text-white font-semibold rounded-md">Submit</button>
                    </div>
            }
            {
                selected ?
                    <div className="mt-8 flex justify-end border-t py-5">
                        <button onClick={() => setSelected('')} className="text-white py-3 px-6 rounded-md bg-primary">Back</button>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Page