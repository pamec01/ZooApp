import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import Select from "react-select";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ZvireConstants from "../zvire/Constants";
import * as OsetrovateleConstants from "../osetrovatel/Constants";

export default function AddNemocnost() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        druhId: "",
        nazev: "",
        datum: "",
        zvire: {},
    });

    const [isLoading, setIsLoading] = useState(true);
    const [zvireSelectChoices, setZvireSelectChoices] = useState([]);

    useEffect(() => {
        loadZvire();
    }, []);

    const loadZvire = async () => {
        const result = await axios.get(ZvireConstants.apiSelectAllUrl);

        const choices = result.data.map((zvire) => getSelectObjectFromEntity(zvire));

        setZvireSelectChoices(choices);
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
                name: "zvire",
                value: entity
            },
            value: entity.zvireId,
            label: entity.jmeno + ",druh: " + entity.druh.nazev
        }
    }

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Nový záznam o nemocnosti</h2>
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
                                <label htmlFor="Datum" className="form-label">
                                    Datum
                                </label>
                                <input
                                    type={"date"}
                                    className="form-control"
                                    name="datum"
                                    value={data.datum}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Zvire" className="form-label">
                                    Zvíře
                                </label>
                                <Select
                                    name="zvire"
                                    isLoading={isLoading}
                                    options={zvireSelectChoices}
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
