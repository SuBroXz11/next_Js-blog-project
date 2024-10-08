'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const {data: session}=useSession();
  const isUserLoggedIn=true;
  const [providers, setProviders]=useState(null);
  const [toggleDropDown, setToggleDropDown]=useState(false);

  useEffect(()=>{
    const setUpProviders= async ()=>{
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3 ml-10">
      <Link href="/" className='flex gap-2 flex-center' >
      <Image
        src="/assets/images/logo1.png"  // WE DO NOT NEED TO PROVIDE FULL PATH IF IN PUBLIC FOLDER
        alt='SubpromptX logo'
        height={70}
        width={70}
        className='object-contain'
      />
      <p className="logo_text">SubpromptX</p>
      </Link>

      {/* {alert(session?.user)} */}
      {/* {alert(providers)} */}

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
            Create Post
            </Link>
            <button type='button' onClick={signOut} className="outline_btn">Sign Out</button>

            <Link href='/profile'>
            <Image 
            src={session?.user?.image}
            className="rounded-full" 
            alt='profile'
            height={37}
            width={37}
            />
              </Link>
          </div>
        ):(
        <>
        {providers && Object.values(providers).map((provider)=>(
          <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>Sign In</button>
          ))}
        </>
        )
      }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
            src={session?.user?.image} 
            className="rounded-full" 
            alt='profile'
            height={37}
            width={37}
            onClick={()=>setToggleDropDown((prev)=>!prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link 
                className="dropdown_link" 
                href='/profile' 
                onClick={()=>setToggleDropDown(false)}
                >
                  My Profile
                  </Link>

                <Link 
                className="dropdown_link" 
                href='/create-prompt' 
                onClick={()=>setToggleDropDown(false)}
                >
                  Create Prompt
                  </Link>

                  <button 
                  type='button'
                  className="mt-5 w-full black_btn"
                  onClick={()=>{setToggleDropDown(false);
                  signOut();}}
                  >
                    Sign Out
                  </button>
              </div>
            )}
          </div>
        ):(
          <>
          {providers && Object.values(providers).map((provider)=>(
          <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
            Sign In
            </button>
          ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
