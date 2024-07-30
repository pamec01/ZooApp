import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Constants from "./Constants";
import {toast} from "react-toastify";

export default function ViewKrmeni() {
    const [data, setData] = useState({
        uzivatelId: "",
        jmeno: "",
        prijmeni: "",
        email: "",
        heslo: "",
        role: {}
    });

    const { id } = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await axios.get(Constants.apiSelectIdUrl(id))
            .then((result) => setData(result.data))
            .catch(() => {
                toast.error("Chyba při načítání dat")
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Zobrazení uživatele</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail uživatele:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Jméno: </b>
                                    {data.jmeno}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Příjmení: </b>
                                    {data.prijmeni}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Email: </b>
                                    {data.email}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Heslo: </b>
                                    {data.heslo}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Role: </b>
                                    {data.role.nazev}
                                </li>
                            </ul>

                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={Constants.guiBasePath}>
                        Zpět
                    </Link>
                </div>
            </div>
        </div>
    );
}
