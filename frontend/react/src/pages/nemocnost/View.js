import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Constants from "./Constants";
import Nemocnost from "./Nemocnost";
import {ToastContainer} from "react-toastify";

export default function ViewNemocnost() {
    const [data, setData] = useState({
        nemocnostId: "",
        nazev: "",
        datum: "",
        zvire: {},
    });

    const { id } = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectIdUrl(id));
        setData(result.data);
    };

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Zobrazení nemocnosti</h2>
                        <div className="card">
                            <div className="card-header">
                                Detail nemocnosti:
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Název medikamentu: </b>
                                        {data.nazev}
                                    </li>
                                </ul>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Datum: </b>
                                        {data.datum}
                                    </li>
                                </ul>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Zvíře: </b>
                                        {data.zvire.jmeno + " - " + data.zvire.cip}
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
        </>
    );
}
