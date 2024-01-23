import Image from 'next/image';
import React from 'react';
import { FaRegUser } from "react-icons/fa6";

function Header() {
    return (
        <div className='w-full flex items-center justify-between py-2 px-10 bg-primary'>
            <Image src={'/logo.png'} alt='logo' className='w-[50px]' width={100} height={100} />
            <h1 className='text-2xl font-bold text-white'>RAJAY CROSSING</h1>
            <div className='flex items-center gap-3'>
                <div className='w-[30px] h-[30px] rounded-full border border-white flex justify-center items-center'>
                    <FaRegUser className='text-white' />
                </div>
                <p className='text-white uppercase'>Logout</p>
            </div>
        </div>
    );
}

export default Header;