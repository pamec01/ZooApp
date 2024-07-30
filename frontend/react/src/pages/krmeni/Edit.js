import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Select from 'react-select'
import * as Constants from "./Constants";
import * as OsetrovateleConstants from "../osetrovatel/Constants";
import {toast, ToastContainer} from "react-toastify";

export default function EditKrmeni() {
    let navigate = useNavigate();

    const {id} = useParams();

    const [data, setData] = useState({
        krmeniId: "",
        nazev: "",
        osetrovatel: {},
    });
    const [isLoading, setIsLoading] = useState(true);
    const [osetrovateleSelectChoices, setOsetrovateleSelectChoices] = useState([]);
    const [selectedOsetrovatelSelectValue, setSelectedOsetrovatelSelectValue] = useState({});

    useEffect(() => {
        loadData();
        loadOsetrovatele();
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectIdUrl(id));
        setData(result.data);

        setSelectedOsetrovatelSelectValue(getSelectObjectFromEntity(result.data.osetrovatel));
    };

    const loadOsetrovatele = async () => {
        const result = await axios.get(OsetrovateleConstants.apiSelectAllUrl);

        const choices = result.data.map((osetrovatel) => getSelectObjectFromEntity(osetrovatel));

        setOsetrovateleSelectChoices(choices);
        setIsLoading(false);
    };

    const onInputChange = (e) => {
        if (e.target.name == "osetrovatel")
            setSelectedOsetrovatelSelectValue(getSelectObjectFromEntity(e.target.value));

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
                        <h2 className="text-center m-4">Úprava krmení</h2>
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
                                <label htmlFor="Osetrovatel" className="form-label">
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
