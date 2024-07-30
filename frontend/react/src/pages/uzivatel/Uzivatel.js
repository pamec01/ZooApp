import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../../layout/dataTable/DataTable";
import {Link} from "react-router-dom";
import * as Constants from "./Constants";
import {toast, ToastContainer} from "react-toastify";

export default function Uzivatel() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await axios.get(Constants.apiSelectAllUrl)
            .then((result) => setData(result.data))
            .catch(() => {
                toast.error("Chyba při načítání dat")
            });
    };

    const deleteEntityId = async (id) => {
        await axios.delete(Constants.apiDeleteUrl(id))
            .then(async (response) => {
                await loadData()
                toast.info(response.data);
            })
            .catch((error) => {
                if (error.response.data !== null && error.response.data !== '')
                    toast.error(error.response.data)
                else
                    toast.error("Nastala chyba během odstraňování záznamu")
            });
    };

    const DeleteButton = (tableRow) =>
        <button className="btn btn-danger mx-2"
                onClick={() => deleteEntityId(tableRow.original.uzivatelId)}
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
              to={Constants.guiViewPath(tableRow.original.uzivatelId)}
        >
            Zobrazit
        </Link>;

    const EditLink = (tableRow) =>
        <Link className="btn btn-outline-primary mx-2"
              to={Constants.guiEditPath(tableRow.original.uzivatelId)}
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
