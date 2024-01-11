import { ReactNode } from "react";

export interface IDropdownProps{
    children: ReactNode;
    btnVariant?: "text" | "outlined" | "contained" | undefined;
    btnText: string;
    btnStyle: string
}