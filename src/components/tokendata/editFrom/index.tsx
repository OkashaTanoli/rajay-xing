import { ITokenSchema, tokenSchema } from "@/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader } from "@/components/common";
import { X } from "lucide-react";

function EditForm({ currentEntry, setCurrentEntry, openEdit, setOpenEdit, fetchData }: any) {

    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ITokenSchema>({
        resolver: zodResolver(tokenSchema),
        defaultValues: {
            type: currentEntry && currentEntry.type,
            name: currentEntry && currentEntry.name,
            cnic: currentEntry && currentEntry.cnic,
            driverName: currentEntry && currentEntry.driverName
        }
    })

    async function onSubmit(data: ITokenSchema) {
        try {
            setLoading(true)
            const response = await fetch(`/api/token/${currentEntry._id}`, {
                method: 'PATCH',
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
                toast.success(`${resData.message}`, {
                    duration: 2000,
                    position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                    style: {
                        backgroundColor: '#d9d9d9',
                        padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                        fontSize: '14px',
                        fontWeight: 'bold'
                    },
                });
                setCurrentEntry('')
                fetchData()
                setOpenEdit(false)
            }
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

    return (
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent
                onOpenAutoFocus={e => e.preventDefault()}
                className='max-w-full lg:max-w-[1000px] max-h-screen !overflow-auto'
            >
                <X onClick={() => {
                    setCurrentEntry('')
                    setOpenEdit(false)
                }} className="absolute cursor-pointer print:hidden top-3 right-3 h-4 w-4" />
                <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                </DialogHeader>
                <div>
                    <form action="" onSubmit={handleSubmit(onSubmit)} >
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="name" className='text-sm text-zinc-700 font-semibold'>Name / نام</label>
                                <input {...register("name")} type="text" id='name' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="cnic" className='text-sm text-zinc-700 font-semibold'>CNIC / شناختی کارڈ</label>
                                <input {...register("cnic")} type="text" id='cnic' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="driverName" className='text-sm text-zinc-700 font-semibold'>Driver Name / گاڈی چلانے والے کا نام</label>
                                <input {...register("driverName")} type="text" id='driverName' className='border border-zinc-300 text-zinc-800 focus:outline-none py-3 px-4 rounded-lg text-base' />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end border-t py-5">
                            <button disabled={loading} type='submit' className="text-white w-[100px] h-[50px] rounded-md bg-primary">{loading ? <Loader height='h-4' width='w-4' /> : 'Submit'}</button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default EditForm;