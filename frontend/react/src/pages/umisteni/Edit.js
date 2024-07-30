import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as Constants from "./Constants";
import Umisteni from "./Umisteni";
import {toast} from "react-toastify";

export default function EditUmisteni() {
    let navigate = useNavigate();

    const {id} = useParams();

    const [data, setData] = useState({
        umisteniId: "",
        nazev: "",
        velikost: "",
    });

    const onInputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        loadData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(Constants.apiUpdateUrl, data)
            .then(() => navigate(Constants.guiBasePath))
            .catch((error) => {
                if (error.response.data.errors === undefined)
                    toast.error(error.response.data);
                else
                    toast.error(error.response.data.errors.join(", "));
            });
    };

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectIdUrl(id));
        setData(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Úprava umístění</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Nazev" className="form-label">
                                Název
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                name="nazev"
                                value={data.nazev}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Velikost" className="form-label">
                                Velikost
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                name="velikost"
                                value={data.velikost}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Uložit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to={Constants.guiBasePath}>
                            Zpět
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
