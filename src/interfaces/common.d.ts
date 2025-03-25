import { ReactNode } from "react";

interface ButtonProps {
    type?: string,
    title: string,
    icon: ReactNode,
    backgroundColor: string,
    color: string,
    border: string,
    fullWidth: boolean,
    handleClick?: () => void
}