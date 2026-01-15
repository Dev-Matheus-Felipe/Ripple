import { X } from "lucide-react";
import { useState } from "react";

export function SearchComponent({popUp} : {popUp: string}){
    const [value, setValue] = useState(""); 
    return (
        <div className={`w-90 h-full border-r absolute border-[#363636] top-0 pt-8 px-3 duration-400 z-5 bg-(--primary-background)
        ${popUp === "/search" ? "left-22" : "-left-full"} rounded-2xl`}>
            <h1 className="text-2xl pb-10">Search</h1>

            <form className="relative">
                <input 
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-10 bg-(--secondary-button) rounded-lg border-0 outline-0 px-2 pr-9 text-sm" 
                    placeholder="to look for" />

                <div 
                    className={`w-5 h-5 bg-(--third-button) absolute top-[50%] left-[97%] translate-y-[-50%] translate-x-[-97%] 
                    flex items-center justify-center rounded-full cursor-pointer`}
                    onClickCapture={() => setValue("")} >
                    
                    <X size={12} />
                </div>
            </form>

            <div className="text-sm pt-10">
   
            </div>
        </div>
    )
}