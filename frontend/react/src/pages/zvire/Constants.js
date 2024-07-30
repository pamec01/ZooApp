import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/zvire";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiSelectAllNotSuchoVodniUrl = apiBaseUrl + "/select/notSuchoVodni";
export const apiSelectIdUrl = (id) => apiBaseUrl + "/select/" + id;
export const apiInsertUrl = apiBaseUrl + "/insert";
export const apiUpdateUrl = apiBaseUrl + "/update";
export const apiDeleteUrl = (id) => apiBaseUrl + "/delete/" + id;

export const guiBasePath = "/zvire";
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
        Header: "Čip",
        Filter: TextSearchFilter,
        accessor: "cip"
    },
    {
        Header: "Země původu",
        Filter: TextSearchFilter,
        accessor: "zemePuvodu"
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
    },
    {
        Header: "Umístění",
        Filter: TextSearchFilter,
        accessor: "umisteni.nazev"
    }
];