"use client";

import { login, logout } from '@/lib/auth-actions';
import { Github } from 'lucide-react';
import { Session } from 'next-auth';
import Image from "next/image";
import Link from "next/link";

function Navbar({ session }: { session: Session | null }) {

  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200  " >
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8 " >
        <Link href="/" className="flex items-center" >
        <Image src="/terra.png" alt="logo" width={50} height={50} />
        <span className="text-2xl font-bold text-gray-800  " >TerraQuest</span>
        </Link>

        <div className="flex items-center space-x-4" >
          { session ? (
            <>
            <Link href="/trips" className="text-slate-900 hover:text-sky-500" >My Trips</Link>
            <Link href="/globe" className="text-slate-900 hover:text-sky-500"  >Globe</Link>
            <button className="flex items-center gap-1.5 justify-center bg-gray-800 cursor-pointer hover:bg-gray-900 text-white p-2 rounded-sm " onClick={logout} >Sign Out</button>
            </>
          ) : (

          <button className="flex items-center gap-1.5 justify-center bg-gray-800 cursor-pointer hover:bg-gray-900 text-white p-2 rounded-sm " onClick={login} >Sign In <Github size={20}/> </button>
          ) }

        </div>
      </div>

    </nav>
  )
}

export default Navbar