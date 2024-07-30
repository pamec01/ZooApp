import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import * as ZvireConstants from "../zvire/Constants";
import * as TypVodyConstants from "../typVody/Constants";
import {toast, ToastContainer} from "react-toastify";
import Select from "react-select";
import {apiSelectAllUrl} from "../typVody/Constants";

export default function AddVodni() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        id: "", typVody: {}, zvire: {},
    });

    const [isLoading, setIsLoading] = useState(true);
    const [zvireSelectChoices, setZvireSelectChoices] = useState([]);

    const [typVodySelectChoices, setTypVodySelectChoices] = useState([]);

    useEffect(() => {
        loadZvire();
        loadTypVody();
    }, []);

    const loadZvire = async () => {
        const result = await axios.get(ZvireConstants.apiSelectAllNotSuchoVodniUrl);

        const choices = result.data.map((zvire) => getSelectObjectFromEntity(zvire));

        setZvireSelectChoices(choices);
        setIsLoading(false);
    };

    const loadTypVody = async () => {
        const result = await axios.get(TypVodyConstants.apiSelectAllUrl);

        const choices = result.data.map((typVody) => getSelectObjectFromEntityTypVody(typVody));

        setTypVodySelectChoices(choices);
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

    function getSelectObjectFromEntityTypVody(entity) {
        return {
            target: {
                name: "typVody",
                value: entity
            },
            value: entity.typVodyId.typVodyId,
            label: entity.nazev
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
                            <div className="mb-3">
                                <label htmlFor="TypVody" className="form-label">
                                    Typ Vody
                                </label>
                                <Select
                                    name="typVody"
                                    isLoading={isLoading}
                                    options={typVodySelectChoices}
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
