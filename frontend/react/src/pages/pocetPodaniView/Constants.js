import {TextSearchFilter, DropdownFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/pocet-podani-view";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiRefreshUrl = (id) => apiBaseUrl + "/refresh/" + id;

export const guiBasePath = "/pocet-podani-view";

export const columns = [
    {
        Header: "Jméno zvířete",
        Filter: TextSearchFilter,
        accessor: "jmenoZvirete"
    },
    {
        Header: "Názve medikamentu",
        Filter: TextSearchFilter,
        accessor: "nazevMedikamentu"
    },
    {
        Header: "Počet podání",
        Filter: DropdownFilter,
        accessor: "pocetPodani"
    },
    {
        Header: "Datum posledníh podání",
        Filter: TextSearchFilter,
        accessor: "datumPosledniPodani"
    }
];