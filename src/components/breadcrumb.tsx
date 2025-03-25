import { Link } from "react-router-dom"


export const BreadCrumb = () => {
    return (
        <div className="flex items-center gap-4  text-gray-500">
            <Link to={"/"} className="text-gray-800">Home</Link> /
            <p aria-disabled >Product details</p> 
        </div>
    )
}