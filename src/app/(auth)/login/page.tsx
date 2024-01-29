'use client'

import { Loader } from "@/components/common";
import { ContextApi } from "@/context/context";
import { ISignInSchema, signInSchema } from "@/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'react-hot-toast';
import { MdSupervisorAccount } from "react-icons/md";

export default function Login() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { state, dispatch, Logout } = useContext(ContextApi)


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ISignInSchema>({
        resolver: zodResolver(signInSchema)
    })

    async function onSubmit(data: ISignInSchema) {
        try {
            setLoading(true)
            const response = await fetch('/api/login', {
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
                console.log("resData.role === >>> ", resData.data);
                router.push('/')
                dispatch({ type: 'LOGIN', payload: resData.data })
            }
        }
        catch (err: any) {
            setLoading(false)
            toast.error(err.message, {
                duration: 3000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
            });
        }
    }

    return (
        <>
            {
                loading &&
                <div className='absolute top-0 left-0 z-50 w-full h-full bg-[rgba(255,255,255,0.4)] backdrop-blur-sm flex justify-center items-center'>
                    <Loader height='h-8' width='w-8' />
                </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2">
                <Toaster />
                <div className="hidden md:flex flex-col justify-center items-center min-h-screen bg-primary">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white w-[90%] lg:w-[80%] text-center">WELCOME TO RAJAY XING</h1>
                    <Image src={'/logo.png'} alt='logo' className='w-[300px] mt-10' width={500} height={500} />
                </div>
                <div className="w-full flex justify-center items-center relative">
                    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center -z-10">
                        <Image src={'/logo.png'} alt="watermark" width={500} height={500} className="w-[500px] opacity-5" />
                    </div>
                    <div className='w-[90%] md:w-[80%] rounded-md mx-auto px-5 py-5'>
                        <div className="flex justify-center my-7">
                            <MdSupervisorAccount className="text-[150px] text-zinc-800" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-7'>
                            <input {...register("email")} type='email' placeholder='Email address' className={`text-sm ${errors.email && 'border border-red-500'} outline-none w-full py-4 px-5 rounded-md border border-zinc-300`} />
                            {
                                errors.email && <p className='text-sm text-red-500 -mt-4'>{errors.email.message}</p>
                            }
                            <input {...register("password")} type="password" placeholder='Password' className={`text-sm ${errors.password && 'border border-red-500'} outline-none w-full py-4 px-5 rounded-md border border-zinc-300`} />
                            {
                                errors.password && <p className='text-sm text-red-500 -mt-4'>{errors.password.message}</p>
                            }
                            {
                                loading ?
                                    <button type='button' className='text-white bg-primary font-bold rounded-md tracking-widest w-full h-[50px] text-center'>LOGIN</button>
                                    :
                                    <button type='submit' className='text-white bg-primary font-bold rounded-md tracking-widest w-full h-[50px] text-center'>LOGIN</button>
                            }
                            <div className='mt-3 py-3 border-t'>
                                <p className='text-sm text-main_dark'>Don&apos;t have an account? <Link href={'/signup'} className='text-blue-700' >signup</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
