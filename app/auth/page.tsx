"use client";

import GhostBtn from "@/components/auth/buttons/ghostBtn";
import PrimaryBtn from "@/components/auth/buttons/primaryBtn";
import Field from "@/components/auth/fields/field";
import { useState } from "react";

export default function Auth() {
    const [active, setActive] = useState(false);

    return (
        <>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');`}</style>

        {/* ── Background ── */}
        <div className="
            min-h-screen flex items-center justify-center
            bg-linear-to-r from-[#e2e2e2] to-[#c9d6ff]
            font-['Montserrat',sans-serif]
            "
        >
            {/* ── Card ── */}
            <div className="relative overflow-hidden bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-3xl max-w-full min-h-120">

            {/* ── SIGN-UP ── */}
            {/* SIGN-UP */}
                <div className={`absolute inset-y-0 left-0 w-1/2 transition-all duration-700 ease-in-out z-1 opacity-0
                ${active ? "translate-x-full opacity-100 z-5 animate-slide-in" : ""}`}>
                    
                <form
                onSubmit={e => e.preventDefault()}
                className="bg-white h-full flex flex-col items-center justify-center px-10 gap-0"
                >
                <h1 className="text-[26px] font-bold text-gray-800">Create Account</h1>

                <SocialIcons />

                <span className="text-[12px] text-gray-500">or use your email for registeration</span>
                <Field type="text"     placeholder="Name" />
                <Field type="email"    placeholder="Email" />
                <Field type="password" placeholder="Password" />

                <PrimaryBtn>Sign Up</PrimaryBtn>
                </form>
            </div>

            {/* ── SIGN-IN ── */}
            <div className={`sign-in${active ? " translate-x-full" : ""} absolute inset-y-0 left-0 w-1/2 z-2 transition-all duration-700 ease-in-out`}>
                <form
                onSubmit={e => e.preventDefault()}
                className="bg-white h-full flex flex-col items-center justify-center px-10"
                >
                <h1 className="text-[26px] font-bold text-gray-800">Sign In</h1>

                <SocialIcons />

                <span className="text-[12px] text-gray-500">or use your email password</span>
                <Field type="email"    placeholder="Email" />
                <Field type="password" placeholder="Password" />
                <a href="#" className="text-[13px] text-gray-700 no-underline my-4 hover:underline">
                    Forget Your Password?
                </a>

                <PrimaryBtn>Sign In</PrimaryBtn>
                </form>
            </div>

            {/* ── TOGGLE PANEL ── */}
            <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-1000 transition-all duration-700 ease-in-out
            ${active ? "-translate-x-full rounded-[0_150px_100px_0]" : "rounded-[150px_0_0_100px]"}`}>

                <div className={`relative -left-full w-[200%] h-full bg-linear-to-r from-[#5c6bc0] to-[#512da8] text-white
                transition-transform duration-700 ease-in-out ${active ? "translate-x-1/2" : "translate-x-0"}`}>

                {/* Left panel — shown when active (welcome back) */}
                    <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-8
                    transition-all duration-700 ease-in-out ${active ? "translate-x-0" : "-translate-x-[200%]"}`}>
                        
                    <h1 className="text-2xl font-bold">Welcome Back!</h1>
                    <p className="text-[14px] leading-5 tracking-[0.3px] my-5">
                    Enter your personal details to use all of site features
                    </p>

                    <GhostBtn onClick={() => setActive(false)}>Sign In</GhostBtn>
                </div>

                {/* Right panel — shown by default (hello friend) */}
                    <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-8
                    transition-all duration-700 ease-in-out ${active ? "translate-x-[200%]" : "translate-x-0"}`}>
                        
                    <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                    <p className="text-[14px] leading-5 tracking-[0.3px] my-5">
                    Register with your personal details to use all of site features
                    </p>

                    <GhostBtn onClick={() => setActive(true)}>Sign Up</GhostBtn>
                </div>
                </div>
            </div>

            </div>
        </div>
        </>
    );
}

/* ── Sub-components ── */

function SocialIcons() {
    const brands = ["fa-google-plus-g", "fa-facebook-f", "fa-github", "fa-linkedin-in"];

    return (
        <div className="flex gap-2 my-5">
            {brands.map(b => (
                <a key={b} href="#"
                className="w-10 h-10 border border-[#ccc] rounded-[20%] inline-flex items-center justify-center text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                >
                <i className={`fa-brands ${b}`} />
                </a>
            ))}
        </div>
    );
}






