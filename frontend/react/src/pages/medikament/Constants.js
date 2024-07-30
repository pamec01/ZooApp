import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/medikament";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectIdUrl = (id) => apiBaseUrl + "/select/" + id;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (id) => apiBaseUrl + "/delete/" + id;

export const guiBasePath = "/medikament";
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
        Header: "Jméno ošetřovatele",
        Filter: TextSearchFilter,
        accessor: "osetrovatel.jmeno"
    },
    {
        Header: "Příjmení ošetřovatele",
        Filter: TextSearchFilter,
        accessor: "osetrovatel.prijmeni"
    }
];