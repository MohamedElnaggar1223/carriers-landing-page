'use client'

import { signOut } from "next-auth/react"

export default async function LogoutBtn() 
{
    return (
        <button
            onClick={() => signOut({ 'redirect': true, callbackUrl: '/' })}
            className='text-main-red'
        >
            Log out
        </button>
    )
}