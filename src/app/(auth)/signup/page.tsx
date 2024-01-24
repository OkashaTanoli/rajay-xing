'use client'

import { Loader } from '@/components/common';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { ISignUpSchema, signUpSchema } from '@/utils/zodschema';
import Image from 'next/image';
import { MdSupervisorAccount } from 'react-icons/md';

function SignUp() {



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ISignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    const router = useRouter()

    async function onSubmit(data: ISignUpSchema) {
        console.log(data);
    }



    return (
        <>
            <Toaster />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:flex flex-col justify-center items-center min-h-screen bg-primary">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white w-[90%] lg:w-[80%] text-center">WELCOME TO RAJAY XING</h1>
                    <Image src={'/logo.png'} alt='logo' className='w-[300px] mt-10' width={500} height={500} />
                </div>
                <div className='w-full flex justify-center items-center relative'>
                    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center -z-10">
                        <Image src={'/logo.png'} alt="watermark" width={500} height={500} className="w-[500px] opacity-5" />
                    </div>
                    <div className='w-[90%] md:w-[80%] rounded-md mx-auto px-5 py-5'>
                        <div className="flex justify-center">
                            <MdSupervisorAccount className="text-[150px] text-zinc-800" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-7'>
                            <input {...register("name")} type="text" placeholder='Full name' className={`text-sm ${errors.name && 'border border-red-500'} outline-none w-full py-4 px-5 rounded-md border border-zinc-300`} />
                            {
                                errors.name && <p className='text-sm text-red-500 -mt-4'>{errors.name.message}</p>
                            }
                            <input {...register("email")} type='email' placeholder='Email address' className={`text-sm ${errors.email && 'border border-red-500'} outline-none w-full py-4 px-5 rounded-md border border-zinc-300`} />
                            {
                                errors.email && <p className='text-sm text-red-500 -mt-4'>{errors.email.message}</p>
                            }
                            <input {...register("password")} type="password" placeholder='Password' className={`text-sm ${errors.password && 'border border-red-500'} outline-none w-full py-4 px-5 rounded-md border border-zinc-300`} />
                            {
                                errors.password && <p className='text-sm text-red-500 -mt-4'>{errors.password.message}</p>
                            }

                            {
                                isSubmitting ?
                                    <button type='button' className='text-white bg-primary font-bold rounded-md tracking-widest w-full h-[50px] text-center'>{isSubmitting ? <Loader height='h-4' width='w-4' /> : 'SIGNUP'}</button>
                                    :
                                    <button type='submit' className='text-white bg-primary font-bold rounded-md tracking-widest w-full h-[50px] text-center'>{isSubmitting ? <Loader height='h-4' width='w-4' /> : 'SIGNUP'}</button>
                            }
                            <div className='mt-3 py-3 border-t'>
                                <p className='text-sm text-main_dark'>Already have an account? <Link href={'/login'} className='text-blue-700' >Login</Link></p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}




export default SignUp