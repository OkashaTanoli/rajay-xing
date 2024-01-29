'use client'

import React, { createContext, ReactHTMLElement, ReactNode, useEffect, useReducer } from "react";
import { useRouter, usePathname } from 'next/navigation'

import Reducer from "./reducer";

export type IData = {
    loading: boolean,
    userDetails: any
}



let initialState: IData = {
    loading: true,
    userDetails: null
}


export const ContextApi = createContext<{ state: IData, dispatch: React.Dispatch<any>, Logout: () => void }>({ state: initialState, dispatch: () => null, Logout: () => null });

export const CreateContext = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(Reducer, initialState);
    const router = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await fetch('/api/whoami')
                if (!res.ok) {
                    throw new Error('something went wrong')
                }
                const { userDetails } = await res.json()
                dispatch({ type: 'LOGIN', payload: userDetails })
            }
            catch (err: any) {
                dispatch({ type: 'LOGOUT', payload: null })
                console.log(err.message);
            }
        }
        if (pathname !== '/login') {
            getDetails()
        }
        else {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [])


    const Logout = async () => {
        const res = await fetch('/api/logout', { cache: 'no-store' })
        const data = await res.json()
        console.log(data);
        // if (data.data === 'true') {
        window.location.replace('/login')
        dispatch({ type: 'LOGOUT', payload: null })
        // }
    }

    return (
        <ContextApi.Provider value={{ state, dispatch, Logout }}>
            {children}
        </ContextApi.Provider>
    )
}