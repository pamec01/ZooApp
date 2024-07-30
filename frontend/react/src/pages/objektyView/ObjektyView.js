import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../../layout/dataTable/DataTable";
import {Link} from "react-router-dom";
import * as Constants from "./Constants";
import {toast, ToastContainer} from "react-toastify";

export default function ObjektyView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectAllUrl);
        setData(result.data);
    };

    const DeleteButton = (tableRow) => <></>

    const AddLink = <></>

    const ViewLink = (tableRow) => <></>

    const EditLink = (tableRow) => <></>

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div style={{marginTop: "10px", textAlign: "right"}}>{AddLink}</div>
            <div style={{width: "95vw", margin: "0 auto"}}>
                <div className="py-4">
                    <Datatable data={data} columns={Constants.columns}
                               DeleteButton={DeleteButton}
                               ViewLink={ViewLink}
                               EditLink={EditLink}/>
                </div>
            </div>
        </>
    );
}
