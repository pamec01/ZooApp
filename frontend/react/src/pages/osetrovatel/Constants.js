import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/osetrovatel";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (id) => apiBaseUrl + "/select/" + id;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (id) => apiBaseUrl + "/delete/" + id;

export const guiBasePath = "/osetrovatel";
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
        Header: "Plat",
        Filter: TextSearchFilter,
        accessor: "plat",
        isAdmin: true
    },
    {
        Header: "Email",
        Filter: TextSearchFilter,
        accessor: "email",
        isAdmin: true
    },
    {
        Header: "Manažer",
        Filter: TextSearchFilter,
        accessor: "manazerId.prijmeni"
    }
];