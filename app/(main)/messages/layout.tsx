export default function MessagesLayout({children, conversation} : {children: React.ReactNode, conversation: React.ReactNode}){
    
    return (
        <div className="flex w-full h-screen">
            {children}

            {conversation}
            
        </div>
    )
}