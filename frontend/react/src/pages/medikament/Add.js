import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import Select from "react-select";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as OsetrovateleConstants from "../osetrovatel/Constants";

export default function AddMedikament() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        druhId: "",
        nazev: "",
        osetrovatel: {},
    });

    const [isLoading, setIsLoading] = useState(true);
    const [osetrovateleSelectChoices, setOsetrovateleSelectChoices] = useState([]);

    useEffect(() => {
        loadOsetrovatele();
    }, []);

    const loadOsetrovatele = async () => {
        const result = await axios.get(OsetrovateleConstants.apiSelectAllUrl);

        const choices = result.data.map((osetrovatel) => getSelectObjectFromEntity(osetrovatel));

        setOsetrovateleSelectChoices(choices);
        setIsLoading(false);
    };

    const onInputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(Constants.apiInsertUrl, data)
            .then(() => navigate(Constants.guiBasePath))
            .catch((error) => {
                if (error.response.data.errors === undefined)
                    toast.error(error.response.data);
                else
                    toast.error(error.response.data.errors.join(", "));
            });
    };

    function getSelectObjectFromEntity(entity) {
        return {
            target: {
                name: "osetrovatel",
                value: entity
            },
            value: entity.osetrovatelId,
            label: entity.jmeno + " " + entity.prijmeni
        }
    }

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Nový medikament</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="Nazev" className="form-label">
                                    Název medikamentu
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
                                <label htmlFor="Osetrovatel" className="form-label">
                                    Ošetřovatel
                                </label>
                                <Select
                                    name="osetrovatel"
                                    isLoading={isLoading}
                                    options={osetrovateleSelectChoices}
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
        </>
    );
}
