import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Auth from "../utils/Auth";
import {useSharedState} from "../utils/SharedStateContext";

export default function Navbar() {

  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const {sharedState, setSharedState} = useSharedState();

  const updateState = () => {
    setSharedState(!sharedState);
  };

  useEffect(() => {
    Auth.username().then(data => setUsername(data));
    Auth.isAdmin().then(data => setIsAdmin(data));
  }, []);

  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">BDAS2 ZOO</Link>

            <div style={{paddingLeft: 20, color: "white"}}>
              {isAdmin ? <label className={"checkbox"}><input type="checkbox" value={sharedState} onChange={updateState}/> Emulace |</label> : <></>}

              <span> Přihlášený uživatel: {username}</span>
              <Link className="btn btn-outline-light" to="/navigace" style={{marginLeft: 20}}>
                Menu Tabulek
              </Link>
              <a className="btn btn-danger" href="/logout" style={{marginLeft: 20}}>
                Odhlásit se
              </a>
            </div>
          </div>
        </nav>
      </div>

  );
}
