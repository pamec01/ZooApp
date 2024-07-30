import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import Select from "react-select";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as KrmeniConstants from "../krmeni/Constants";
import * as ZvireConstants from "../zvire/Constants";

export default function AddKrmeniZvire() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        zvireKrmeniId: "",
        krmeni: {},
        zvire: {},
    });

    const [isLoading, setIsLoading] = useState(true);
    const [krmeniSelectChoices, setKrmeniSelectChoices] = useState([]);
    const [zvireSelectChoices, setZvireSelectChoices] = useState([]);


    useEffect(() => {
        loadKrmeni();
        loadZvire();
    }, []);

    const loadKrmeni = async () => {
        const result = await axios.get(KrmeniConstants.apiSelectAllUrl);

        const choices = result.data.map((krmeni) => getSelectObjectFromEntity(krmeni));

        setKrmeniSelectChoices(choices);
        setIsLoading(false);
    };

    const loadZvire = async () => {
        const result = await axios.get(ZvireConstants.apiSelectAllUrl);

        const choices = result.data.map((zvire) => getSelectObjectFromEntityZvire(zvire));

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
                name: "krmeni",
                value: entity
            },
            value: entity.krmeniId,
            label: entity.nazev
        }
    }

    function getSelectObjectFromEntityZvire(entity) {
        return {
            target: {
                name: "zvire",
                value: entity
            },
            value: entity.zvireId,
            label: entity.jmeno + ", druh: " + entity.druh.nazev
        }
    }

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Nový záznam</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="Krmeni" className="form-label">
                                    Krmení
                                </label>
                                <Select
                                    name="krmeni"
                                    isLoading={isLoading}
                                    options={krmeniSelectChoices}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Zvire" className="form-label">
                                    Zvire
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
