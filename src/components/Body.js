import { useContext, useEffect, useState } from "react";
import RestaurantCards from "./RestaurantCards";
import Shimmer from "./Shimmer"
import { Link } from "react-router-dom";
import UserContext from "../Utils/UserContext";


const Body = () => {

    const [ListOfRestaurant, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setfilteredRestaurant] = useState([]);
    const [searchtext, setsearchtext] = useState("");
    const { LoggedInUser, setUserName } = useContext(UserContext);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setListOfRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }


    return (
        <div className="Body">
            <div className="flex m-10">
                <div className="mx-10">
                    <input className="rounded-md shadow-md" value={searchtext} onChange={(e) => { setsearchtext(e.target.value) }} />
                    <button onClick={() => {
                        const filteredList = ListOfRestaurant.filter((res) => res.info.name.toLowerCase().includes(searchtext.toLowerCase()));
                        setfilteredRestaurant(filteredList);
                    }} className="rounded-md bg-emerald-100 px-4 mx-4">Search</button>
                </div>

                <div>
                    <button className="rounded-md bg-emerald-100 px-4" onClick={() => {
                        const filteredList = ListOfRestaurant.filter((res) => res.info.avgRating > 4);
                        setfilteredRestaurant(filteredList);
                    }}>Click here for top rated restaurants in your locality</button>
                </div>

                <div>
                    <label className="mx-10"> Enter the UserName:</label>
                    <input className="border border-emerald-300" value={LoggedInUser} onChange={(e) => setUserName(e.target.value)} />
                </div>
            </div>


            <div className="flex flex-wrap">
                {filteredRestaurant?.map((restaurant) => (<Link key={restaurant?.info.id} to={"/restaurants/" + restaurant?.info.id}><RestaurantCards resData={restaurant?.info} /></Link>))};
            </div>
        </div>
    )
}

export default Body;