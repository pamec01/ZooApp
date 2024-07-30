import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";

export default function AddVodniTyp() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        typVodyId: "",
        nazev: "",
    });

    const onInputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(Constants.apiInsertUrl, data);
        navigate(Constants.guiBasePath);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Nový typ vody</h2>
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
