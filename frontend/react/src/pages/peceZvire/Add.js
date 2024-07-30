import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import Select from "react-select";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as PeceConstants from "../pece/Constants";
import * as ZvireConstants from "../zvire/Constants";

export default function AddPeceZvire() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        peceZvireId: "",
        pece: {},
        zvire: {},
    });

    const [isLoading, setIsLoading] = useState(true);
    const [peceSelectChoices, setPeceSelectChoices] = useState([]);
    const [zvireSelectChoices, setZvireSelectChoices] = useState([]);


    useEffect(() => {
        loadPece();
        loadZvire();
    }, []);

    const loadPece = async () => {
        const result = await axios.get(PeceConstants.apiSelectAllUrl);

        const choices = result.data.map((pece) => getSelectObjectFromEntityPece(pece));

        setPeceSelectChoices(choices);
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

    function getSelectObjectFromEntityPece(entity) {
        return {
            target: {
                name: "pece",
                value: entity
            },
            value: entity.peceId,
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
                                <label htmlFor="Pece" className="form-label">
                                    Péče
                                </label>
                                <Select
                                    name="pece"
                                    isLoading={isLoading}
                                    options={peceSelectChoices}
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
