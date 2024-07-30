import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/medikament-zvire";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (medikamentZvireId) => apiBaseUrl + "/select/" + medikamentZvireId;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (medikamentZvireId) => apiBaseUrl + "/delete/" + + medikamentZvireId;

export const guiBasePath = "/medikament-zvire";
export const guiAddPath = guiBasePath + "/add";
export const guiViewPath = (medikamentZvireId) => guiBasePath + "/view/" + medikamentZvireId;
export const guiEditPath = (medikamentZvireId) => guiBasePath + "/edit/" + medikamentZvireId;

export const columns = [
    {
        Header: "Název medikamentu",
        Filter: TextSearchFilter,
        accessor: "medikament.nazev"
    },
    {
        Header: "Jméno zvířete",
        Filter: TextSearchFilter,
        accessor: "zvire.jmeno"
    },
    {
        Header: "Čip zvířete",
        Filter: TextSearchFilter,
        accessor: "zvire.cip"
    },
    {
        Header: "Datum",
        Filter: TextSearchFilter,
        accessor: "datum"
    }
];