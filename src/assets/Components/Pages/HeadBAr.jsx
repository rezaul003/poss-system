import { FaBarcode } from "react-icons/fa";
import { HiOutlineSignal } from "react-icons/hi2";
import { LuPrinter } from "react-icons/lu";
import { TfiBarChart } from "react-icons/tfi";
import logo from '../../images/logo.png'
import { CgProfile } from "react-icons/cg";
import { IoFileTrayOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";
import { SlCalender, SlNotebook } from "react-icons/sl";

const HeadBAr = () => {
    return (
        <div className="flex justify-between mx-6  pb-2 bg-white">
            <div className="flex gap-8">
                <button className="text-2xl"><TfiBarChart /></button>
                <button className="text-2xl text-green-600"><HiOutlineSignal /></button>
                <button className="text-2xl text-red-900"><LuPrinter></LuPrinter></button>
                <button className="text-2xl text-red-800"><FaBarcode /></button>
            </div>

            <div className="flex">
                <button ><img className="w-20" src={logo} alt="" /></button>
            </div>

            <div className="flex gap-8">
                <button className="text-3xl"><AiOutlineDollar /></button>
                <button className="text-2xl"><SlCalender /></button>
                <button className="text-2xl"><IoFileTrayOutline /></button>
                <button className="text-2xl"><SlNotebook /></button>
                <button className="text-2xl"><CgProfile /></button>
            </div>
        </div>
    );
};

export default HeadBAr;