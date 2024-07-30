import React, {Fragment, useEffect, useState} from "react";
import * as Auth from "../utils/Auth";
import {useSharedState} from "../utils/SharedStateContext";

const ProtectedRoute = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasRole, setHasRole] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { sharedState } = useSharedState();

    useEffect(() => {
        Auth.isLoggedIn().then(data => setIsLoggedIn(data));
        Auth.role().then(data => setHasRole(props.Role.includes(data)));
        Auth.isAdmin().then(data => setIsAdmin(data));
    }, [isLoggedIn]);

    let returnedComponent;
    if (isAdmin && sharedState && JSON.stringify(props.Role) === JSON.stringify(Auth.admin)) {
        returnedComponent = <div>Uživatel nemá dostatečná oprávnění</div>;
    } else if (isLoggedIn && hasRole) {
        returnedComponent = props.children;
    } else {
        returnedComponent = <div>Uživatel nemá dostatečná oprávnění</div>;
    }

    return (
        <Fragment>
            {returnedComponent}
        </Fragment>
    );
}
export default ProtectedRoute;