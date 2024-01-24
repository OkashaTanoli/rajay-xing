'use client'

import { ImStatsBars } from "react-icons/im";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlineCompareArrows } from "react-icons/md";
import { useState } from "react";
import { BarChart } from "@/components/common";

const Page = () => {
  let [active, setActive] = useState(0)
  let data = [
    { title: 'DAILY STATE', icon: <ImStatsBars className="text-[60px] text-zinc-800" /> },
    { title: 'UPLOAD EXCEL NOBAT LIST', icon: <SiMicrosoftexcel className="text-[60px] text-zinc-800" /> },
    { title: 'UPLOAD EXCEL LOCAL RESIDENTS', icon: <SiMicrosoftexcel className="text-[60px] text-zinc-800" /> },
    // { title: 'COMPARISON OLD NOBATS', icon: <MdOutlineCompareArrows className="text-[60px] text-zinc-800" /> },
  ]
  return (
    <div className="mt-10">
      {
        active === 1 ?
          <div>
            <h1 className='text-2xl font-bold text-zinc-800'>Daily State</h1>
            <div className="w-full lg:w-[70%]">
              <BarChart />
            </div>
            {/* <div className="mt-10 flex flex-col gap-5">
              <div className="text-lg font-bold py-4 px-5 rounded-md border shadow-[0_0_10px_rgba(0,0,0,0.2)]">TOKEN ISSUED : 123</div>
              <div className="text-lg font-bold py-4 px-5 rounded-md border shadow-[0_0_10px_rgba(0,0,0,0.2)]">LOCAL RESIDENTS CROSSED FROM PAK TO IRAN : 123</div>
              <div className="text-lg font-bold py-4 px-5 rounded-md border shadow-[0_0_10px_rgba(0,0,0,0.2)]">LOCAL RESIDENTS CROSSED FROM IRAN TO PAK : 123</div>
              <div className="text-lg font-bold py-4 px-5 rounded-md border shadow-[0_0_10px_rgba(0,0,0,0.2)]">FUEL VEH - PAK TO IRAN : 123</div>
              <div className="text-lg font-bold py-4 px-5 rounded-md border shadow-[0_0_10px_rgba(0,0,0,0.2)]">FUEL VEH - IRAN TO PAK : 123</div>
            </div> */}
          </div>
          :
          active === 2 ?
            <div>
              <h1 className='text-2xl font-bold text-zinc-800'>UPLOAD EXCEL NOBAT LIST</h1>
              <div className="mt-10">
                <div>
                  <label htmlFor="file" className="w-[300px] h-[70px] text-zinc-800 font-bold border-2 border-dashed rounded-2xl bg-zinc-100 flex justify-center items-center">
                    Browse File
                  </label>
                  <input type="file" id="file" hidden />
                  <p className="mt-2">No file selected</p>
                </div>
                <button className="py-3 px-10 mt-5 rounded-lg bg-primary text-white">Submit</button>
              </div>
            </div>
            :
            active === 3 ?
              <div>
                <h1 className='text-2xl font-bold text-zinc-800'>UPLOAD EXCEL LOCAL RESIDENTS</h1>
                <div className="mt-10">
                  <div>
                    <label htmlFor="file" className="w-[300px] h-[70px] text-zinc-800 font-bold border-2 border-dashed rounded-2xl bg-zinc-100 flex justify-center items-center">
                      Browse File
                    </label>
                    <input type="file" id="file" hidden />
                    <p className="mt-2">No file selected</p>
                  </div>
                  <button className="py-3 px-10 mt-5 rounded-lg bg-primary text-white">Submit</button>
                </div>
              </div>
              :
              active === 4 ?
                <div>
                  <h1 className='text-2xl font-bold text-zinc-800'>COMPILED NOBAT LIST</h1>
                  <div className="mt-10">
                    <div>
                      <label htmlFor="file" className="w-[300px] h-[70px] text-zinc-800 font-bold border-2 border-dashed rounded-2xl bg-zinc-100 flex justify-center items-center">
                        Browse File
                      </label>
                      <input type="file" id="file" hidden />
                      <p className="mt-2">No file selected</p>
                    </div>
                    <button className="py-3 px-10 mt-5 rounded-lg bg-primary text-white">Submit</button>
                  </div>
                </div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-10">
                  {
                    data.map((item, i) => {
                      return (
                        <div key={i} className="border flex flex-col gap-5 justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg p-7 ">
                          <span>{item.icon}</span>
                          <button onClick={() => setActive(i + 1)} className="text-white text-sm bg-primary w-full py-2 px-3 rounded-lg font-semibold">{item.title}</button>
                        </div>
                      )
                    })
                  }
                </div>
      }
      {
        active ?
          <div className="mt-8 flex justify-end border-t py-5">
            <button onClick={() => setActive(0)} className="text-white py-3 px-6 rounded-md bg-primary">Back</button>
          </div>
          :
          null
      }
    </div>
  )
}

export default Page