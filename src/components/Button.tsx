import type { DetailedHTMLProps, ButtonHTMLAttributes } from "react"
type ButtonProps ={
    small? : boolean
    gray? : boolean
    className? : string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button({small, gray, className="", ...props}: ButtonProps){
    const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 fontbold";
    const colorClasses = gray ? "bg-gray-400 hover:bg-gray-300 bg-gray-400 focus-visible:bg-gray-300 bg-gray-500" : "bg-purple-500 hover:bg-purple-400 bg-gray-500 focus-visible:bg-purple-400";
    return <button className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 text-white ${sizeClasses} ${colorClasses} ${className}`} {...props}></button>
}