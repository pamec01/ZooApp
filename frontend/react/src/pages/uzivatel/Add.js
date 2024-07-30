import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import Select from "react-select";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUzivatel() {
    let navigate = useNavigate();

    const [data, setData] = useState(Constants.InitialState);

    const [isLoading, setIsLoading] = useState(true);
    const [roleSelectChoices, setRoleSelectChoices] = useState([]);

    useEffect(() => {
        loadRole();
    }, []);

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
                        <h2 className="text-center m-4">Nový uživatel</h2>
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
