import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Constants from "./Constants";
import Medikament from "./Medikament";

export default function ViewMedikament() {
    const [data, setData] = useState({
        medikamentId: "",
        nazev: "",
        osetrovatel: "",
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
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Zobrazení medikamentu</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail medikamentu:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Název medikamentu: </b>
                                    {data.nazev}
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
                    <Link className="btn btn-primary my-2" to={Constants.guiBasePath}>
                        Zpět
                    </Link>
                </div>
            </div>
        </div>
    );
}
