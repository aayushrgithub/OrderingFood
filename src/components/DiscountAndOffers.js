import { useDispatch } from "react-redux";
import { addItem } from "../Utils/cartSlice";

const DiscountAndOffers = (props) => {
    const { newItem } = props;
    const { header, couponCode, description } = newItem;
    const dispatch = useDispatch();

    const handleClick = (header) => {
        dispatch(addItem(header));
    }

    return (
        <div className="mt-2 border-b-8">
            <div className="flex">
                <div className="text-red-500 font-bold mx-10">{header}</div>
                <button className="border border-black" onClick={() => handleClick(header)}>Add Item</button>
            </div>
            <div>{couponCode}</div>
            <div className="font-bold">{description}</div>
        </div>
    )
}

export default DiscountAndOffers;