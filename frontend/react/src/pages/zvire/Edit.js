import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as Constants from "./Constants";
import {toast, ToastContainer} from "react-toastify";
import * as UmisteniConstants from "../umisteni/Constants";
import * as OsetrovateleConstants from "../osetrovatel/Constants";
import * as DruhConstants from "../druh/Constants";
import Select from "react-select";
import axios from "axios";

export default function EditZvire() {
    let navigate = useNavigate();

    const {id} = useParams();

    const [data, setData] = useState({
        druhId: "",
        nazev: "",
        jmeno: "",
        zemePuvodu: "",
        umisteni: {},
        osetrovatel: {},
        druh: {}
    });

    const [isLoading, setIsLoading] = useState(true);
    const [umisteniSelectChoices, setUmisteniSelectChoices] = useState([]);
    const [selectedUmisteniSelectValue, setSelectedUmisteniSelectValue] = useState({});

    const [osetrovateleSelectChoices, setOsetrovateleSelectChoices] = useState([]);
    const [selectedOsetrovatelSelectValue, setSelectedOsetrovateleSelectValue] = useState({});

    const [druhSelectChoices, setDruhSelectChoices] = useState([]);
    const [selectedDruhSelectValue, setSelectedDruhSelectValue] = useState({});

    useEffect(() => {
        loadData();
        loadUmisteni();
        loadOsetrovatele();
        loadDruh();
    }, []);


    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectIdUrl(id));
        setData(result.data);

        setSelectedUmisteniSelectValue(getSelectObjectFromEntityUmisteni(result.data.umisteni));
        setSelectedOsetrovateleSelectValue(getSelectObjectFromEntityOsetrovatel(result.data.osetrovatel));
        setSelectedDruhSelectValue(getSelectObjectFromEntityDruh(result.data.druh));
    };

    const loadUmisteni = async () => {
        const result = await axios.get(UmisteniConstants.apiSelectAllUrl);

        const choices = result.data.map((umisteni) => getSelectObjectFromEntityUmisteni(umisteni));

        setUmisteniSelectChoices(choices);
        setIsLoading(false);
    };

    const loadOsetrovatele = async () => {
        const result = await axios.get(OsetrovateleConstants.apiSelectAllUrl);

        const choices = result.data.map((osetrovatel) => getSelectObjectFromEntityOsetrovatel(osetrovatel));

        setOsetrovateleSelectChoices(choices);
        setIsLoading(false);
    };

    const loadDruh = async () => {
        const result = await axios.get(DruhConstants.apiSelectAllUrl);

        const choices = result.data.map((druh) => getSelectObjectFromEntityDruh(druh));

        setDruhSelectChoices(choices);
        setIsLoading(false);
    };

    const onInputChange = (e) => {
        if (e.target.name == "umisteni")
            setSelectedUmisteniSelectValue(getSelectObjectFromEntityUmisteni(e.target.value));
        if (e.target.name == "osetrovatel")
            setSelectedOsetrovateleSelectValue(getSelectObjectFromEntityOsetrovatel(e.target.value));
        if (e.target.name == "druh")
            setSelectedDruhSelectValue(getSelectObjectFromEntityDruh(e.target.value));

        setData({...data, [e.target.name]: e.target.value});
    };

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

    function getSelectObjectFromEntityUmisteni(entity) {
        return {
            target: {
                name: "umisteni",
                value: entity
            },
            value: entity.umisteniId,
            label: entity.nazev
        }
    }

    function getSelectObjectFromEntityOsetrovatel(entity) {
        return {
            target: {
                name: "osetrovatel",
                value: entity
            },
            value: entity.osetrovatelId,
            label: entity.jmeno + " " + entity.prijmeni
        }
    }

    function getSelectObjectFromEntityDruh(entity) {
        return {
            target: {
                name: "druh",
                value: entity
            },
            value: entity.druhId,
            label: entity.nazev
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <ToastContainer position={"top-center"}/>
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Úprava druhu</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="Nazev" className="form-label">
                                    Jméno zvířete
                                </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        name="nazev"
                                        value={data.nazev}
                                        name="jmeno"
                                        value={data.jmeno}
                                        onChange={(e) => onInputChange(e)}
                                    />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zemePuvodu" className="form-label">
                                    Země původu
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    name="zemePuvodu"
                                    value={data.zemePuvodu}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="umisteni" className="form-label">
                                    Umístění
                                </label>
                                <Select
                                    name="umisteni"
                                    isLoading={isLoading}
                                    options={umisteniSelectChoices}
                                    value={selectedUmisteniSelectValue}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="osetrovatel" className="form-label">
                                    Ošetřovatel
                                </label>
                                <Select
                                    name="osetrovatel"
                                    isLoading={isLoading}
                                    options={osetrovateleSelectChoices}
                                    value={selectedOsetrovatelSelectValue}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="druh" className="form-label">
                                    Druh
                                </label>
                                <Select
                                    name="druh"
                                    isLoading={isLoading}
                                    options={druhSelectChoices}
                                    value={selectedDruhSelectValue}
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