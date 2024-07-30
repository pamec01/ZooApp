import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as Constants from "./Constants";
import * as Auth from "../../utils/Auth";
import {useSharedState} from "../../utils/SharedStateContext";

export default function ViewOsetrovatel() {
    const [isAdmin, setIsAdmin] = useState(false);
    const {sharedState} = useSharedState();

    const [data, setData] = useState({
        osetrovatelId: "",
        jmeno: "",
        prijmeni: "",
        plat: "",
        email: "",
        manazerId: {}
    });

    const { id } = useParams();

    useEffect(() => {
        loadData();

        Auth.isAdmin().then(data => setIsAdmin(data));
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectIdUrl(id));
        setData(result.data);
    };

    let adminComponents;
    if (isAdmin && !sharedState) {
        adminComponents = <>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <b>Plat: </b>
                    {data.plat}
                </li>
            </ul>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <b>Email: </b>
                    {data.email}
                </li>
            </ul>
        </>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Zobrazení ošetřovatele</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail ošetřovatele:
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
                            {adminComponents}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Manažer: </b>
                                    {(data.manazerId?.jmeno ?? "") + " " + (data.manazerId?.prijmeni ?? "")}
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
