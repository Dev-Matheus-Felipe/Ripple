"use client"

import { useState } from "react"

export function DescriptionPost({description, tags} : {description: string, tags: string[]}) {
    const [viewMore, setViewMore] = useState<boolean>(false);
    const decs = description + " This is my description Test"
    return (
        <div className="flex justify-between pt-1 px-4 w-full ">
            <p 
                className={`text-sm ${viewMore ? "h-auto" : "h-6"} overflow-hidden w-40 cursor-pointer pb-2`} 
                onClick={()=> setViewMore(prev => !prev)}>

                {
                    viewMore 
                        ? decs 
                        : <>{decs.slice(0,20)}<span>...</span></>
                }
            </p>
            
            <div className="flex justify-end gap-2 text-sm text-[#6236c8]  w-60  overflow-hidden h-5">
                {
                    tags.map((tag: string, index: number) => (
                        <p key={index}>#{tag}</p>
                    ))
                }
            </div>
        </div>
    )
}