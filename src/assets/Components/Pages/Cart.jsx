import { FaPeopleArrows } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { VscArrowBoth } from "react-icons/vsc";
import { MdOutlineDiscount } from "react-icons/md";
import { PiDotsThreeOutline } from "react-icons/pi";

const Cart = ({ cartItems }) => {
    const tax = 5.0;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="bg-white w-full sm:w-1/4 mr-4 h-[84vh] flex flex-col justify-between">
            <div className="flex justify-between px-6 py-3 hidden lg:flex">
                <button><RiPagesLine className="text-2xl" />UT</button>
                <button><FaPeopleArrows className="text-2xl" />share</button>
                <button><VscArrowBoth className="text-2xl" />time</button>
                <button><MdOutlineDiscount className="text-2xl" />coupon</button>
                <button><PiDotsThreeOutline className="text-2xl" />menu</button>
            </div>

            <div className="bg-white p-4 rounded shadow-md w-full max-w-sm mx-auto flex-1 overflow-y-auto">
                <div className="flex flex-col space-y-4 border-b pb-4">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-12 h-12 bg-teal-400 rounded"></div>
                                <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.quantity}x</p>
                                </div>
                            </div>
                            <p className="text-sm font-bold">{item.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 text-sm space-y-2">
                <div className="flex justify-between">
                    <p>MVA</p>
                    <p>{tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Varer totalt</p>
                    <p>{totalItems}</p>
                </div>

                <div className="flex justify-between mt-4 text-lg font-semibold">
                    <p>Sum NOK</p>
                    <p>{totalAmount.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
