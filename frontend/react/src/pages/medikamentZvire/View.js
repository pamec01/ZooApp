import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Constants from "./Constants";

export default function ViewMedikamentZvire() {
    const [data, setData] = useState({
        medikamentZvireId: "",
        datum: "",
        medikament: {},
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
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Zobrazení záznamu</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail záznamu:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Název medikamentu: </b>
                                    {data.medikament.nazev}
                                </li>
                                <li className="list-group-item">
                                    <b>Zvíře: </b>
                                    {data.zvire.jmeno}
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
