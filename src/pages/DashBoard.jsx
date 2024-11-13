import React, { useEffect, useState } from "react";
import { decrement, increment } from "../sheard/Pgination";
import { postRequest } from "../api/axiosCalls";
import { apiEndPoint } from "../api/ApiEndPoints";
import { useNavigate } from "react-router-dom";
import downloadPDF from "../sheard/PdfDownload";
import Navbar from "../components/NavBar";
import "../styles/DashBord.css"

const DashBord = () => {
    const [number, setNumber] = useState(1);
    const [data, setData] = useState([])
    const navigate = useNavigate();

    let number2 = number;
    useEffect(() => {
        postRequest(apiEndPoint.getOffSet, { ofSet: number })
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => console.error(error))
    }, [number]);

    const generateDocument = (code) => {
        postRequest(apiEndPoint.getSpecificUser, { itemCode: code })
            .then((response) => {downloadPDF(response.data)})
            .catch((error) => console.error(error))
    }

    const serchItem = (e) => {
        e.preventDefault();
        const code = e.target.value
        postRequest(apiEndPoint.getSpecificUser, { itemCode: code })
            .then((response) => setData(response.data))
            .catch((error) => console.error(error))
    }

    const chageState = (code, state) => {
        postRequest(apiEndPoint.editItemState, { itemCode: code, state: state })
            .then(navigate("/dashboard"))
            .catch((error) => console.error(error))
    }

    return (
        <>
            <Navbar />
            <div className="search input-group">
                <input type="text" className="form-control p-3" placeholder="SEARCH ITEM CODE" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={serchItem} />
            </div>
            <div className="dashbord-main-container">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Item Code</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Final Price</th>
                            <th scope="col">Material</th>
                            <th scope="col">Material Type</th>
                            <th scope="col">State</th>
                            <th scope="col">Report</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.itemCode}</td>
                                <td>{item.itemName}</td>
                                <td>{item.finalPrice}</td>
                                <td>{item.materialName}</td>
                                <td>{item.materialType}</td>
                                <td>
                                    <select className="form-control btn btn-secondary" id="validationCustom01" onChange={(e) => chageState(item.itemCode, e.target.value)}>

                                        <option value="">{item.itemStatus}</option>
                                        {item.itemStatus === "SALE" ? (
                                            <>
                                                <option value="STOCK CLEARING">STOCK CLEARING</option>
                                                <option value="ON HAND">ON HAND</option>
                                            </>
                                        ) : item.itemStatus === "STOCK CLEARING" ? (
                                            <>
                                                <option value="SALE">SALE</option>
                                                <option value="ON HAND">ON HAND</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="SALE">SALE</option>
                                                <option value="STOCK CLEARING">STOCK CLEARING</option>
                                            </>
                                        )}

                                    </select>
                                </td>
                                <td><button type="button" className="btn btn-secondary" onClick={() => generateDocument(item.itemCode)}>Document</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-data-buttons">
                {number2 > 1 ? <ul className="pagination-previous text-dark" onClick={() => decrement(setNumber, number)}>Previous</ul> : ""}
                <ul className="pagination-next text-dark" onClick={() => increment(setNumber, number)}>Next</ul>
            </div>
        </>
    );
};

export default DashBord;