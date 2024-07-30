import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import Select from "react-select";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as OsetrovateleConstants from "../osetrovatel/Constants";
import * as MedikamentZvireConstants from "../medikamentZvire/Constants";

export default function AddKrmeni() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        souborId: "",
        data: "",
        nazev: "",
        typ: "",
        medikamentZvire: {medikament: {}, zvire: {}},
        osetrovatel: {}
    });

    const [isLoading, setIsLoading] = useState(true);

    const [osetrovateleSelectChoices, setOsetrovateleSelectChoices] = useState([]);
    const [selectedOsetrovatelSelectValue, setSelectedOsetrovateleSelectValue] = useState({});

    const [medikamentZvireSelectChoices, setMedikamentZvireSelectChoices] = useState([]);
    const [selectedMedikamentZvireSelectValue, setSelectedMedikamentZvireSelectValue] = useState({});


    useEffect(() => {
        loadOsetrovatele();
        loadMedikamentZvire();
    }, []);

    const loadOsetrovatele = async () => {
        const result = await axios.get(OsetrovateleConstants.apiSelectAllUrl);

        const choices = result.data.map((osetrovatel) => getSelectObjectFromEntityOsetrovatel(osetrovatel));

        setOsetrovateleSelectChoices(choices);
        setIsLoading(false);
    };

    const loadMedikamentZvire = async () => {
        const result = await axios.get(MedikamentZvireConstants.apiSelectAllUrl);

        const choices = result.data.map((medikamentZvire) => getSelectObjectFromEntityMedikamentZvire(medikamentZvire));

        setMedikamentZvireSelectChoices(choices);
        setIsLoading(false);
    };


    const onInputChange = (e) => {
        if (e.target.name == "osetrovatel")
            setSelectedOsetrovateleSelectValue(getSelectObjectFromEntityOsetrovatel(e.target.value));
        if (e.target.name == "medikamentZvire")
            setSelectedMedikamentZvireSelectValue(getSelectObjectFromEntityMedikamentZvire(e.target.value));

        setData({...data, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        var imagefile = document.querySelector('#fileInput');

        var bodyFormData = new FormData();
        bodyFormData.append("data", imagefile.files[0]);
        bodyFormData.append("medikamentZvireId", data.medikamentZvire.medikamentZvireId);
        bodyFormData.append("osetrovatelId", data.osetrovatel.osetrovatelId);

        await axios.post(Constants.apiInsertUrl, bodyFormData, {headers: {"Content-Type": "multipart/form-data"}})
            .then(() => navigate(Constants.guiBasePath))
            .catch((error) => {
                if (error.code === "ERR_BAD_REQUEST")
                    toast.warn("Všechna pole nejsou vyplněna");

                if (error.response.data.errors === undefined)
                    toast.error(error.response.data);
                else
                    toast.error(error.response.data.errors.join(", "));
            });
    };

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

    function getSelectObjectFromEntityMedikamentZvire(entity) {
        return {
            target: {
                name: "medikamentZvire",
                value: entity
            },
            value: entity.medikamentZvireId,
            label: entity.medikament.nazev + " - " + entity.zvire.cip
        }
    }

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Nový soubor</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="fileInput" className="form-label">
                                    Soubor
                                </label>
                                <input
                                    type={"file"}
                                    className="form-control"
                                    name="data"
                                    id="fileInput"
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
                                <label htmlFor="medikamentZvire" className="form-label">
                                    Medikament-Zvíře
                                </label>
                                <Select
                                    name="medikamentZvire"
                                    isLoading={isLoading}
                                    options={medikamentZvireSelectChoices}
                                    value={selectedMedikamentZvireSelectValue}
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
