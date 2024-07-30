import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Select from 'react-select'
import * as Constants from "./Constants";
import {toast, ToastContainer} from "react-toastify";

export default function EditUzivatel() {
    let navigate = useNavigate();

    const {id} = useParams();

    const [data, setData] = useState(Constants.InitialState);

    const [isLoading, setIsLoading] = useState(true);
    const [roleSelectChoices, setRoleSelectChoices] = useState([]);
    const [roleUzivateleSelectValue, setRoleUzivateleSelectValue] = useState({});

    useEffect(() => {
        loadData();
        loadRole();
    }, []);

    const loadData = async () => {
        await axios.get(Constants.apiSelectIdUrl(id))
            .then((result) => {
                setData(result.data);
                setRoleUzivateleSelectValue(getSelectObjectFromEntity(result.data.role));
            })
            .catch(() => {
                toast.error("Chyba při načítání dat")
            });
    };

    const loadRole = async () => {
        await axios.get(Constants.roleApiSelectAllUrl)
            .then((result) => {
                setRoleSelectChoices(result.data.map((role) => getSelectObjectFromEntity(role)));
                setIsLoading(false);
            })
            .catch(() => {
                toast.error("Chyba při načítání dat")
            });
    };

    const onInputChange = (e) => {
        if (e.target.name === "role")
            setRoleUzivateleSelectValue(getSelectObjectFromEntity(e.target.value));

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
                name: "role",
                value: entity
            },
            value: entity.roleId,
            label: entity.nazev
        }
    }

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Úprava uživatele</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="jmeno" className="form-label">
                                    Jméno
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    name="jmeno"
                                    value={data.jmeno}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prijmeni" className="form-label">
                                    Příjmení
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    name="prijmeni"
                                    value={data.prijmeni}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="heslo" className="form-label">
                                    Heslo
                                </label>
                                <input
                                    type={"password"}
                                    className="form-control"
                                    name="heslo"
                                    value={data.heslo}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">
                                    Role
                                </label>
                                <Select
                                    name="role"
                                    isLoading={isLoading}
                                    options={roleSelectChoices}
                                    value={roleUzivateleSelectValue}
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
