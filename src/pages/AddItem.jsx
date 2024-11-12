import React, { useEffect, useState } from "react";
import { apiEndPoint } from "../api/ApiEndPoints";
import { getRequest, postRequest } from "../api/axiosCalls";
import Navbar from "../components/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddItem.css"
import { useNavigate } from "react-router-dom";

const AddItem = () => {

    const [itemName, setItemName] = useState("");
    const [material, setMaterial] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [pricePerItem, setPricePertem] = useState("");
    const [materialType, setMaterialType] = useState("");
    const [itemType, setItemType] = useState("");
    const [newBuyerCheck, setNewBuyerCheck] = useState(0);
    const [dropDownList, setDropDownList] = useState([]);
    const [buyerState, setBuyerState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getRequest(apiEndPoint.dropDownList)
        .then((response) => {setDropDownList(response.data)})
        .catch((error) => console.error(error))
    },[])

    const buyerHanddle = (e) => {
        e.preventDefault();
        const input = e.target.value
        setSupplierName(input)
        setBuyerState(input === "input")
        input === "input" ? setNewBuyerCheck(1) : setNewBuyerCheck(0)
    }

    const submiHandle = (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem("userId");
        postRequest(apiEndPoint.addItem, { 
            itemName : itemName,
            material : material,
            supplierName : supplierName,
            pricePerItem : pricePerItem,
            materialType : materialType,
            itemType : itemType,
            newBuyerCheck : newBuyerCheck,
            userId : userId
        })
        .then((response) => {
            console.log("RESPONSE IS: ",response.data);
            response.data.status === "Success" ?
                (toast.success("Add Successfully "),
                    setTimeout(() => 
                        navigate("/dashbord")
                    , 3500))
             : toast.error("!Unsuccessful");})
        .catch((error) => console.error(error))
    }
    return (
        <>
            <Navbar />
            <div className="additem-main-container">
                <form className="row g-3 needs-validation" noValidate onSubmit={submiHandle}>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom01" className="form-label"> Item Name</label>
                        <input type="text" className="form-control" id="validationCustom01" onChange={(e) => setItemName(e.target.value)} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom01" className="form-label"> Item Type</label>
                        <select className="form-control" id="validationCustom01" onChange={(e) => setItemType(e.target.value)} required>
                            <option value="">Own/Buy</option>
                            <option value="own">Own Item</option>
                            <option value="buy">Buy Item</option>
                        </select>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    {itemType === "buy" ?
                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label"> Buyer</label>
                            <select className="form-control" id="validationCustom01" onChange={buyerHanddle} required>
                                <option value="">Own/Buy</option>
                                {dropDownList.map((item, index) => (
                                    <option key={index} value={item.buyerId}>{item.buyerName}</option>
                                ))}
                                <option value="input">New Buyer</option>
                            </select>
                            {buyerState ?
                                <>
                                    <label htmlFor="validationCustombuyer" className="form-label">New Buyer</label>
                                    <input type="text" className="form-control" id="validationCustombuyer" onChange={(e) => setSupplierName(e.target.value)}></input>
                                </>
                                : ""}
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        : ""}
                    <div className="col-md-4">
                        <label htmlFor="validationCustom02" className="form-label">Material</label>
                        <input type="text" className="form-control" id="validationCustom02" onChange={(e) => setMaterial(e.target.value)} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Price per Item $</label>
                        <input type="number" className="form-control" id="validationCustom03" onChange={(e) => setPricePertem(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Material Type</label>
                        <input type="text" className="form-control" id="validationCustom03" onChange={(e) => setMaterialType(e.target.value)} required />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </>
    );
};

export default AddItem;