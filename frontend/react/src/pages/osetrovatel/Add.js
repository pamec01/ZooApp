import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import {toast} from "react-toastify";
import Select from "react-select";

export default function AddOsetrovatel() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        osetrovatelId: "",
        jmeno: "",
        prijmeni: "",
        plat: "",
        email: "",
        manazerId: {}
    });

    useEffect(() => {
        loadManazer();
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    const [manazerSelectChoices, setManazerSelectChoices] = useState([]);
    const [selectedManazerSelectValue, setSelectedManazerSelectValue] = useState({});

    const loadManazer = async () => {
        const result = await axios.get(Constants.apiSelectAllUrl);

        const choices = result.data.map((manazer) => getSelectObjectFromEntityManazer(manazer));

        setManazerSelectChoices(choices);
        setIsLoading(false);
    };

    const onInputChange = (e) => {
        if (e.target.name === "manazerId")
            setSelectedManazerSelectValue(getSelectObjectFromEntityManazer(e.target.value));

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

    function getSelectObjectFromEntityManazer(entity) {
        return {
            target: {
                name: "manazerId",
                value: entity
            },
            value: entity.osetrovatelId,
            label: entity.jmeno + " " + entity.prijmeni
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Nový ošetřovatel</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Nazev" className="form-label">
                                Jméno
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                name="jmeno"
                                value={data.jmeno}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor="Nazev" className="form-label">
                                Příjmení
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                name="prijmeni"
                                value={data.prijmeni}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor="plat" className="form-label">
                                Plat
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                name="plat"
                                value={data.plat}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type={"email"}
                                className="form-control"
                                name="email"
                                value={data.email}
                                onChange={(e) => onInputChange(e)}
                            />
                            <div className="mb-3">
                                <label htmlFor="manazerId" className="form-label">
                                    Manažer
                                </label>
                                <Select
                                    name="manazerId"
                                    isLoading={isLoading}
                                    options={manazerSelectChoices}
                                    value={selectedManazerSelectValue}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
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
