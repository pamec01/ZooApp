import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as Constants from "./Constants";

export default function ViewZvire() {
    const [data, setData] = useState({
        druhId: "",
        nazev: "",
        jmeno: "",
        zemePuvodu: "",
        umisteni: {},
        osetrovatel: {},
        druh: {}
    });

    const {id} = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectIdUrl(id));
        setData(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Zobrazení zvířete</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail Zvířete:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Jméno: </b>
                                    {data.jmeno}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Země původu: </b>
                                    {data.zemePuvodu}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Umístění: </b>
                                    {data.umisteni.nazev}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Ošetřovatel: </b>
                                    {data.osetrovatel.jmeno + " " + data.osetrovatel.prijmeni}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Druh: </b>
                                    {data.druh.nazev}
                                </li>
                            </ul>
                        </div>
                        <Link className="btn btn-primary my-2" to={Constants.guiBasePath}>
                            Zpět
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}