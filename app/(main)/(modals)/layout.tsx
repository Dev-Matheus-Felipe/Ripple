
import React  from "react";

export default  function ModalsLayout({children, modal} : {children: React.ReactNode, modal: React.ReactNode}){
    return (
        <>
            {modal}
            {children}
        </>
    )
}