import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as Constants from "./Constants";

export default function ViewSoubor() {
    const [data, setData] = useState({
        souborId: "",
        data: "",
        nazev: "",
        typ: "",
        medikamentZvire: {medikament: {}, zvire: {}},
        osetrovatel: {}
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
                    <h2 className="text-center m-4">Zobrazení Souboru</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail Souboru:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Název: </b>
                                    {data.nazev}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Typ: </b>
                                    {data.typ}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Název medikamentu: </b>
                                    {data.medikamentZvire.medikament.nazev}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Čip zvířete: </b>
                                    {data.medikamentZvire.zvire.cip}
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Ošetřovatel: </b>
                                    {data.osetrovatel.jmeno + " " + data.osetrovatel.prijmeni}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <a className="btn btn-outline-primary my-2" href={Constants.apiDownloadUrl(data.souborId)}>
                        Stáhnout
                    </a> {"   "}
                    <Link className="btn btn-primary my-2" to={Constants.guiBasePath}>
                        Zpět
                    </Link>
                </div>
            </div>
        </div>
    );
}
