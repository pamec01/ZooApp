import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/zvire-krmeni";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (zvireKrmeniId) => apiBaseUrl + "/select/" + zvireKrmeniId;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (zvireKrmeniId) => apiBaseUrl + "/delete/" + zvireKrmeniId;

export const guiBasePath = "/zvire-krmeni";
export const guiAddPath = guiBasePath + "/add";
export const guiViewPath = (id) => guiBasePath + "/view/" + id;
export const guiEditPath = (id) => guiBasePath + "/edit/" + id;

export const columns = [
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
        Header: "Krmení",
        Filter: TextSearchFilter,
        accessor: "krmeni.nazev"
    }
];