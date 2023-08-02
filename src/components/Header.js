import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

const Header = () => {

    const onlinestatus = useOnlineStatus();
    const { LoggedInUser } = useContext(UserContext);
    const cartItems = useSelector((store) => store.cart.items);

    return (
        <div className="flex items-center justify-between mx-4 bg-gradient-to-b from-emerald-300 to-emerald-100">
            <div className='w-32'>
                <img src="https://seeklogo.com/images/F/food-logo-59E5A73AFD-seeklogo.com.png" alt="FoodLogo" />
            </div>
            <div>
                <ui className='flex list-none'>
                    <li className="mx-7">Online Status: {onlinestatus ? "🍏" : "🍎"}</li>
                    <Link to='/'><li className="mx-7">Home</li></Link>
                    <Link to="/about"> <li className="mx-7">About Us</li></Link>
                    <li className="mx-7 font-bold">Cart-[{cartItems.length} items]</li>
                    <Link to='/contact'><li className="mx-7">Contact Us</li></Link>
                    <li className="mx-7 cursor-pointer font-bold">{LoggedInUser}</li>
                </ui>
            </div>
        </div>
    )
}
export default Header;