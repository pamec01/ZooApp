import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/admin/uzivatel";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (id) => apiBaseUrl + "/select/" + id;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (id) => apiBaseUrl + "/delete/" + id;

export const roleApiSelectAllUrl = serverUrl + "/api/admin/role/select/all";

export const guiBasePath = "/uzivatel";
export const guiAddPath = guiBasePath + "/add";
export const guiViewPath = (id) => guiBasePath + "/view/" + id;
export const guiEditPath = (id) => guiBasePath + "/edit/" + id;

export const columns = [
    {
        Header: "Jméno",
        Filter: TextSearchFilter,
        accessor: "jmeno"
    },
    {
        Header: "Příjmení",
        Filter: TextSearchFilter,
        accessor: "prijmeni"
    },
    {
        Header: "Email",
        Filter: TextSearchFilter,
        accessor: "email"
    },
    {
        Header: "Role",
        Filter: TextSearchFilter,
        accessor: "role.nazev"
    }
];

export const InitialState = {
    uzivatelId: "",
    jmeno: "",
    prijmeni: "",
    email: "",
    heslo: "",
    role: {
        roleId: "",
        nazev: ""
    }
};