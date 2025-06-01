import { type JSX, type MouseEventHandler } from "react";
export interface ModalProps {
    children: JSX.Element;
    handleClose:MouseEventHandler;
    isHidden: boolean;
  }
  