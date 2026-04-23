import Link from "next/link";
import { useState } from "react";

export default function Nav({
    href,
    text,
    children
} : {
    href: string,
    text: string,
    children: React.ReactNode
}){

    const [active, setActive] = useState(false);

    return (
        <Link 
            href={href} 
            onMouseLeave={() => setActive(false)}
            className={`md:w-full h-12.5 flex items-center px-2 gap-3 rounded-md  duration-300
            ${active ? "bg-(--p-button-hover) cursor-pointer" : "cursor-default"}`}
        >
            <div className="p-1 rounded-md cursor-pointer" onMouseEnter={() => {setActive(true); console.log("HOVER ACTIVED")}}>
                {children}
            </div>

            <p className={`max-md:hidden text-sm duration-300 ${active ? "opacity-100 pl-0" : "opacity-0 pl-5"}`}>{text}</p>
        </Link>
    )
}