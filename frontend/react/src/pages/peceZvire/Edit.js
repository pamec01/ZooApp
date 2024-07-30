import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as Constants from "./Constants";

export default function EditPeceZvire() {
    let navigate = useNavigate();

    const {id} = useParams();

    const [data, setData] = useState({
        peceZvireId: "",
        druhId: "",
        nazev: "",
    });

    const onInputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        loadData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(Constants.apiUpdateUrl, data);
        navigate(Constants.guiBasePath);
    };

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectIdUrl(id));
        setData(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Úprava druhu</h2>
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
