import { useContext } from "react";
import UserContext from "../Utils/UserContext";


const RestaurantCards = (props) => {

    const { resData } = props;
    const { cloudinaryImageId, name, avgRating, cuisines, costForTwo } = resData;
    const CDN_URL = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"

    const { LoggedInUser } = useContext(UserContext);

    return (
        <div className="m-4 w-[347px] rounded-lg bg-emerald-100 hover:bg-emerald-300 cursor-pointer">
            <img className='' src={CDN_URL + cloudinaryImageId} alt="FoodItems" />
            <div className="font-bold text-lg">{name}</div>
            <div>Rating: {avgRating}</div>
            <div>{cuisines.join(",")}</div>
            <div>{costForTwo}</div>
            <div className="font-bold">{LoggedInUser}</div>
        </div>

    )
}

export default RestaurantCards;