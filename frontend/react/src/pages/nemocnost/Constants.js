import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/nemocnost";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (id) => apiBaseUrl + "/select/" + id;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (id) => apiBaseUrl + "/delete/" + id;

export const guiBasePath = "/nemocnost";
export const guiAddPath = guiBasePath + "/add";
export const guiViewPath = (id) => guiBasePath + "/view/" + id;
export const guiEditPath = (id) => guiBasePath + "/edit/" + id;

export const columns = [
    {
        Header: "Název medikamentu",
        Filter: TextSearchFilter,
        accessor: "nazev"
    },
    {
        Header: "Datum",
        Filter: TextSearchFilter,
        accessor: "datum"
    },
    {
        Header: "Zvíře",
        Filter: TextSearchFilter,
        accessor: "zvire.jmeno"
    },
    {
        Header: "Čip zvířete",
        Filter: TextSearchFilter,
        accessor: "zvire.cip"
    }
];