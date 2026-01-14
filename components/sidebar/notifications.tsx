export function NotificationsComponent({popUp} : {popUp: string}){
    return (
        <div className={`w-90 h-full border-r absolute border-[#363636] top-0 pt-8 px-3 duration-600 z-5 bg-(--primary-background)
        ${popUp === "/notifications" ? "left-22" : "-left-full"} rounded-2xl`}>
            <h1 className="text-2xl pb-10">Notifications</h1>
        </div>
    )
}