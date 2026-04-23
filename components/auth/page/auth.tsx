"use client"

import GhostBtn from "@/components/auth/buttons/ghostBtn";
import RegisterForm from "@/components/auth/forms/register";
import LoginForm from "@/components/auth/forms/login";
import { useState } from "react";

export const inputStyles = "bg-(--input-background-color) border-none my-2 py-2.5 px-3.75 text-[13px] rounded-lg w-full outline-none focus:ring-1 focus:ring-[#374151] transition-all"

export default function AuthPage() {
    const [active, setActive] = useState(false);

    return (
        <>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');`}</style>

        {/* ── Background ── */}
        <div className=" min-h-screen flex items-center justify-center p-[4%]">

            {/* ── Card ──  */}
            <div className={`relative  bg-(--p-ll-background-color) rounded-[30px]  overflow-hidden
            shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-3xl max-w-full sm:min-h-120 min-h-130`}>

                {/* SIGN-UP */}
                <RegisterForm active={active} setActive={setActive} />

                {/* ── SIGN-IN ── */}
                <LoginForm active={active} setActive={setActive} />
            {/* ── TOGGLE PANEL ── */}
            <div className={`max-md:hidden w-full h-full absolute top-0 overflow-hidden rounded-2xl before:rounded-[150px_150px_75px_75px] before:ease-in-out
            before:content-[''] before:w-[300%] before:h-full before:absolute before:bg-linear-to-r before:from-[#5c6bc0] before:z-10
            before:to-[#512da8] before:duration-800 ${active ? "before:left-[-250%]" : "before:left-[50%]"}`}>
                
                <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-8
                transition-all duration-700 ease-in-out ${active ? "translate-x-0" : "-translate-x-[200%]"}  delay-200 z-10`}>
                        
                        <h1 className="text-2xl font-bold">Welcome Back!</h1>

                        <p className="text-[14px] leading-5 tracking-[0.3px] my-5">
                        Enter your personal details to use all of site features
                        </p>

                    <GhostBtn onClick={() => setActive(false)}>Sign In</GhostBtn>
                </div>

                <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-8 z-10
                transition-all duration-700 ease-in-out ${active ? "translate-x-[200%]" : "translate-x-0"} delay-200`}>
                    
                    <h1 className="text-2xl font-bold">Ripple</h1>
                    <p className="text-[14px] leading-5 tracking-[0.3px] my-5">
                    Don't have an accoount? Register with your personal details to use all of site features
                    </p>

                    <GhostBtn onClick={() => setActive(true)}>Sign Up</GhostBtn>
                </div>
            
            </div>
            
            </div>
        </div>
        </>
    );
}


/**

 */

/* ── Sub-components ── */

export function SocialIcons() {
    const brands = ["fa-google-plus-g", "fa-facebook-f", "fa-github", "fa-linkedin-in"];

    return (
        <div className="flex gap-2 my-5">
            {brands.map(b => (
                <a 
                key={b} 
                href="#"
                className={`w-10 h-10 border border-[#ccc] rounded-[20%] inline-flex items-center 
                justify-center text-(--s-text-color) text-sm hover:bg-(--icons-hover) transition-colors`}>
                    <i className={`fa-brands ${b}`} />
                </a>
            ))}
        </div>
    );
}