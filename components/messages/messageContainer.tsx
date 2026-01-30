
export function MessageContainer(){
    return (
        <div className="flex-1 overflow-y-auto flex flex-col relative gap-10 w-full p-5">
            <div className="flex justify-end w-full">
                <div className="max-w-[45%] flex justify-end px-4 py-2 rounded-lg bg-[#6236c8] text-white">
                    How are you feeling today? that's my first time doing such thing so i'm not used to things like that i hope it works normally
                </div>
            </div>


            <div className="flex justify-start w-full">
                <p className="max-w-[45%] h-auto px-4 py-2 bg-[#6236c8] rounded-lg flex items-center justify-center">How are you feeling today? that's my first time doing such thing so i'm not used to things like that  i hope it works noramlly</p>
            </div>

            <div className="flex justify-end w-full">
                <div className="max-w-[45%] flex justify-end px-4 py-2 rounded-lg bg-[#6236c8] text-white">
                    yeah
                </div>
            </div>
        </div>
    )
}