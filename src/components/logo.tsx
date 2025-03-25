
import { Link } from "react-router-dom"
import LogoImg from "../assets/logo.png"

export {
    LogoImg
}

export const Logo = () => {
    return (
        <Link to={"/"} className="">
            <img src={LogoImg} alt="" className="max-w-[80px] object-cover" />
        </Link>
    )
}