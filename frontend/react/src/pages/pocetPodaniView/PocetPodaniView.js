import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../../layout/dataTable/DataTable";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import {toast, ToastContainer} from "react-toastify";
import Select from "react-select";
import * as ZvireConstants from "../zvire/Constants";
import Button from "bootstrap/js/src/button";

export default function PocetPodaniView() {
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
