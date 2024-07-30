import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Auth from "../utils/Auth";
import {useSharedState} from "../utils/SharedStateContext";

const tableButton = {
    margin: "5px",
    width: "200px",
}

export default function Navigace() {

    const UserViews =
        <>
            <h4 className="text-center m-4">Pohledy</h4>
            <div>
                <Link className="btn btn-outline-info" to="/hiearchie-view" style={tableButton}>
                    Hiearchie zaměstnanců
                </Link>
                <Link className="btn btn-outline-info" to="/funkce-view" style={tableButton}>
                    Funkce
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/pocet-podani-view" style={tableButton}>
                    Počet podání medikamentu
                </Link>
            </div>
        </>;

    const AdminViews =
        <>
            <h4 className="text-center m-4">Pohledy</h4>
            <div>
                <Link className="btn btn-outline-info" to="/analyza-platu-view" style={tableButton}>
                    Analýza platů
                </Link>
                <Link className="btn btn-outline-info" to="/objekty-view" style={tableButton}>
                    Využité objekty
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/podrizeni-view" style={tableButton}>
                    Výběrový ošetřovatel
                </Link>
            </div>
        </>;

    const UserTables =
        <>
            <h2 className="text-center m-4">Uživatelské tabulky</h2>
            <div>
                <Link className="btn btn-outline-info" to="/druh" style={tableButton}>
                    Druh
                </Link>
                <Link className="btn btn-outline-info" to="/krmeni" style={tableButton}>
                    Krmení
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/medikament" style={tableButton}>
                    Medikament
                </Link>
                <Link className="btn btn-outline-info" to="/medikament-zvire" style={tableButton}>
                    Medikament-Zvíře
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/nemocnost" style={tableButton}>
                    Nemocnost
                </Link>
                <Link className="btn btn-outline-info" to="/osetrovatel" style={tableButton}>
                    Ošetřovatel
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/pece" style={tableButton}>
                    Péče
                </Link>
                <Link className="btn btn-outline-info" to="/pece-zvire" style={tableButton}>
                    Péče-Zvíře
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/suchozemske" style={tableButton}>
                    Suchozemské
                </Link>
                <Link className="btn btn-outline-info" to="/umisteni" style={tableButton}>
                    Umístění
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/vodni" style={tableButton}>
                    Vodní
                </Link>
                <Link className="btn btn-outline-info" to="/zvire" style={tableButton}>
                    Zvíře
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/zvire-krmeni" style={tableButton}>
                    Zvíře-Krmení
                </Link>
                <Link className="btn btn-outline-info" to="/soubor" style={tableButton}>
                    Soubory
                </Link>
            </div>
            <div>
                <Link className="btn btn-outline-info" to="/typ-vody" style={tableButton}>
                    Typ vody
                </Link>
            </div>
            {UserViews}
        </>;

    const AdminTables =
        <>
            <h2 className="text-center m-4">Admin tabulky</h2>
            <div>
                <Link className="btn btn-outline-info" to="/uzivatel" style={tableButton}>
                    Uživatel
                </Link>
                <Link className="btn btn-outline-info" to="/logging-table" style={tableButton}>
                    Databázové logy
                </Link>
            </div>
            {AdminViews}
        </>;

    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const {sharedState} = useSharedState();

    useEffect(() => {
        Auth.isUser().then(data => setIsUser(data));
        Auth.isAdmin().then(data => setIsAdmin(data));
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    {isUser ? UserTables : <></>}
                    {isAdmin && !sharedState ? AdminTables : <></>}
                </div>
            </div>
        </div>
    );
}


