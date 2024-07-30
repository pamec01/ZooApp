import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../../layout/dataTable/DataTable";
import {Link} from "react-router-dom";
import * as Constants from "./Constants";
import {ToastContainer} from "react-toastify";

export default function Pece() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectAllUrl);
        setData(result.data);
    };

    const deleteEntityId = async (id) => {
        await axios.delete(Constants.apiDeleteUrl(id));
        await loadData();
    };

    const DeleteButton = (tableRow) =>
        <button className="btn btn-danger mx-2"
                onClick={() => deleteEntityId(tableRow.original.peceId)}
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
              to={Constants.guiViewPath(tableRow.original.peceId)}
        >
            Zobrazit
        </Link>;

    const EditLink = (tableRow) =>
        <Link className="btn btn-outline-primary mx-2"
              to={Constants.guiEditPath(tableRow.original.peceId)}
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
