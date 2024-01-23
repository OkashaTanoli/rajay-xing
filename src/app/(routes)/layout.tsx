'use client'

import { Header } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { usePathname } from 'next/navigation'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    let [open, setOpen] = useState(false)
    const pathname = usePathname()

    const links = [
        { href: '/', text: 'Home' },
        { href: '/tokendata', text: 'Token Data' },
        { href: '/paktoiran', text: 'Pak TO Iran' },
        { href: '/irantopak', text: 'Iran TO Pak' },
        { href: '/status', text: 'Status' },
        { href: '/manualentry', text: 'Manual Entry' } // Update href as needed
    ];

    const isActive = (href: string) => href === pathname;



    return (
        <div className="flex w-full">
            <div className={`${open ? 'left-0' : '-left-[250px]'}  lg:left-0 absolute lg:relative transition-all z-50 w-[250px] pt-5 shrink-0 flex flex-col min-h-screen bg-primary overflow-auto`}>
                <div className="absolute top-5 right-5 block lg:hidden" onClick={() => setOpen(false)}>
                    <RxCross1 className="text-white text-lg font-bold cursor-pointer" />
                </div>
                <div className="flex flex-col gap-5 justify-center items-start px-6">
                    <Image src={'/logo.png'} alt='logo' className='w-[80px] rotate-animation' width={100} height={100} />
                    {/* <h1 className='text-xl font-bold text-white'>RAJAY CROSSING</h1> */}
                </div>
                <ul className="mt-7">
                    {links.map((link, index) => (
                        <Link href={link.href} key={index}>
                            <li className={`py-3 px-6 text-white hover:bg-[#00000025] border-b border-zinc-200 cursor-pointer font-semibold ${isActive(link.href) ? 'bg-[#00000040] hover:bg-[#00000040]' : ''}`}>
                                {link.text}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="custom_width">
                <div className='w-full flex items-center justify-between py-5 px-5 sm:px-10 border-b'>
                    <div className="flex gap-5 items-center">
                        <IoIosMenu className="block lg:hidden cursor-pointer text-2xl text-zinc-800" onClick={() => setOpen(true)} />
                        <h1 className='text-base sm:text-2xl font-bold text-zinc-800'>RAJAY CROSSING</h1>
                    </div>
                    <div className='flex items-center gap-1 sm:gap-3'>
                        <div className='w-[30px] h-[30px] rounded-full border border-zinc-800 flex justify-center items-center'>
                            <FaRegUser className='text-zinc-800' />
                        </div>
                        <p className='text-zinc-800 uppercase text-sm sm:text-base'>Logout</p>
                    </div>
                </div>
                <div className="px-5 sm:px-10 pb-5">{children}</div>
            </div>
        </div>
    );
}
