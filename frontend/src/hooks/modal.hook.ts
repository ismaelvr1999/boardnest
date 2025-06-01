import { useState,type MouseEventHandler } from "react";
const useModal = ()=>{
    const [isHidden,setIsHidden] = useState(true);
    const handleClose:MouseEventHandler = (e)=>{
        e.preventDefault();    
        setIsHidden(true);
    }
    const handleOpen:MouseEventHandler = (e)=>{
        e.preventDefault();
        setIsHidden(false);
    }

    return {isHidden,handleClose,handleOpen}
}
export default useModal;