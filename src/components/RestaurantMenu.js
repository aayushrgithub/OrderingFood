import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiscountAndOffers from "./DiscountAndOffers";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {

    const [resinfo, setresinfo] = useState(null);
    const [discount, setdiscount] = useState([]);
    const [showItem, setshowItem] = useState(false);
    const { resId } = useParams();

    useEffect(() => {
        fetchMenu();
    }, [])

    const handleClick = () => {
        setshowItem(!showItem);
    }

    const MENU_URL = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId="
    const CDN_URL = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"

    const fetchMenu = async () => {
        const data = await fetch(MENU_URL + resId);
        const json = await data.json();
        setresinfo(json?.data.cards[0]?.card?.card?.info);
        setdiscount(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers);
        console.log(discount);
    }

    if (resinfo === null) return <Shimmer />
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwoMessage } = resinfo;

    return (
        <div className="text-center flex flex-col items-center">
            <img className="w-72" src={CDN_URL + cloudinaryImageId} alt="FoodImages" />
            <div className="font-bold text-3xl mt-10">{name}</div>
            <div className="text-xl mt-7">{cuisines.join(",")}</div>
            <div className="text-xl mt-2">{avgRating}</div>
            <div className="font-bold text-xl text-amber-500 mt-2">{costForTwoMessage}</div>
            <div className="font-bold text-emerald-300 mt-2 cursor-pointer underline" onClick={handleClick}>Discounts</div>
            {showItem && discount.map((item) => (<DiscountAndOffers newItem={item?.info} />))}
        </div>
    )

}

export default RestaurantMenu;