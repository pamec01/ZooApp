import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/pece-zvire";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (peceZvireId) => apiBaseUrl + "/select/" + peceZvireId;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (peceZvireId) => apiBaseUrl + "/delete/" + peceZvireId;

export const guiBasePath = "/pece-zvire";
export const guiAddPath = guiBasePath + "/add";
export const guiViewPath = (peceZvireId) => guiBasePath + "/view/" + peceZvireId;
export const guiEditPath = (peceZvireId) => guiBasePath + "/edit/" + peceZvireId;

export const columns = [
    {
        Header: "Název",
        Filter: TextSearchFilter,
        accessor: "pece.nazev"
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