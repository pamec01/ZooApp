import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/vodni";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (id) => apiBaseUrl + "/select/" + id;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (id) => apiBaseUrl + "/delete/" + id;

export const guiBasePath = "/vodni";
export const guiAddPath = guiBasePath + "/add";
export const guiViewPath = (id) => guiBasePath + "/view/" + id;
export const guiEditPath = (id) => guiBasePath + "/edit/" + id;

export const columns = [
    {
        Header: "Jméno",
        Filter: TextSearchFilter,
        accessor: "zvire.jmeno"
    },
    {
        Header: "Čip",
        Filter: TextSearchFilter,
        accessor: "zvire.cip"
    },
    {
        Header: "Typ vody",
        Filter: TextSearchFilter,
        accessor: "typVody.nazev"
    }
];