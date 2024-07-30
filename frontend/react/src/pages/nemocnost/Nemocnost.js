import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../../layout/dataTable/DataTable";
import {Link} from "react-router-dom";
import * as Constants from "./Constants";
import {toast, ToastContainer} from "react-toastify";

export default function Nemocnost() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectAllUrl);
        setData(result.data);
    };

    const deleteEntityId = async (id) => {
        await axios.delete(Constants.apiDeleteUrl(id))
            .then(async () => await loadData())
            .catch((error) => {
                toast.error(error.response.data)
            });
    };

    const DeleteButton = (tableRow) =>
        <button className="btn btn-danger mx-2"
                onClick={() => deleteEntityId(tableRow.original.nemocnostId)}
        >
            Odstranit
        </button>;

    const AddLink =
        <Link className="btn btn-outline-primary mx-2"
              to={Constants.guiAddPath}
        >
            Přidat nový záznam
        </Link>;

    const ViewLink = (tableRow) =>
        <Link className="btn btn-primary mx-2"
              to={Constants.guiViewPath(tableRow.original.nemocnostId)}
        >
            Zobrazit
        </Link>;

    const EditLink = (tableRow) =>
        <Link className="btn btn-outline-primary mx-2"
              to={Constants.guiEditPath(tableRow.original.nemocnostId)}
        >
            Upravit
        </Link>

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
