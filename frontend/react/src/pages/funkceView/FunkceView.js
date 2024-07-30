import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../../layout/dataTable/DataTable";
import {Link, useNavigate} from "react-router-dom";
import * as Constants from "./Constants";
import {toast, ToastContainer} from "react-toastify";
import * as ZvireConstants from "../zvire/Constants";
import * as UmisteniConstants from "../umisteni/Constants";
import * as MedikamentConstants from "../medikament/Constants";
import Select from "react-select";
import Icon from "@mdi/react";
import {mdiChevronDown, mdiChevronUp} from "@mdi/js";

export default function FunkceView() {
    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [medikament, setMedikament] = useState([]);
    const [zvireId, setZvireId] = useState(1);
    const [umisteniId, setUmisteniId] = useState(1);

    const [zvireSelectChoices, setZvireSelectChoices] = useState([]);
    const [umisteniSelectChoices, setUmisteniSelectChoices] = useState([]);

    useEffect(() => {
        loadData();
        loadMedikament();
        loadZvire();
        loadUmisteni();
    }, []);

    const loadData = async () => {
        const result = await axios.get(Constants.apiSelectAllUrl);
        setData(result.data);
    };

    const loadMedikament = async () => {
        const result = await axios.get(MedikamentConstants.apiSelectAllUrl);
        setMedikament(result.data);
    };


    const loadZvire = async () => {
        const result = await axios.get(ZvireConstants.apiSelectAllUrl);

        const choices = result.data.map((zvire) => getSelectObjectFromEntityZvire(zvire));

        setZvireSelectChoices(choices);
    };

    const loadUmisteni = async () => {
        const result = await axios.get(UmisteniConstants.apiSelectAllUrl);

        const choices = result.data.map((umisteni) => getSelectObjectFromEntityUmisteni(umisteni));

        setUmisteniSelectChoices(choices);
    };

    const onInputChange = (e) => {
        if (e.target.name === "zvire")
            setZvireId(e.target.value.zvireId);
        if (e.target.name === "umisteni")
            setUmisteniId(e.target.value.umisteniId);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.get(Constants.apiRefreshUrl(umisteniId, zvireId))
            .catch((error) => {
                if (error.response.data.errors === undefined)
                    toast.error(error.response.data);
                else
                    toast.error(error.response.data.errors.join(", "));
            });
    };

    function getSelectObjectFromEntityZvire(entity) {
        return {
            target: {
                name: "zvire",
                value: entity
            },
            value: entity.zvireId,
            label: entity.jmeno + ", čip: " + entity.cip
        }
    }

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

    const DeleteButton = (tableRow) => <></>

    const AddLink = <></>

    const ViewLink = (tableRow) => <></>

    const EditLink = (tableRow) => <></>

    return (
        <>
            <ToastContainer position={"top-center"}/>
            <div style={{marginTop: "10px", textAlign: "right"}}>{AddLink}</div>
            <div style={{width: "95vw", margin: "0 auto"}}>
                <div className="py-4">
                    <table style={{margin: "0 auto"}}>
                        <thead>

                        </thead>
                        <tr>
                            <td><b>Zvířat na metr čtvereční</b></td>
                            <td><b>Nejnovější medikament pro zvíře</b></td>
                        </tr>
                        <tbody>
                        <tr>
                            <td>{data[0]?.zviratMetrCtverecni}</td>
                            <td>{medikament.find(data => data.medikamentId === 1)?.nazev}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
