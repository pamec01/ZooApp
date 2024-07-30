import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/admin/analyza-platu-view";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";

export const guiBasePath = "/analyza-platu-view";

export const columns = [
    {
        Header: "Podrůměrná",
        accessor: "podprumerna"
    },
    {
        Header: "Nadprůměrná",
        accessor: "nadprumerna"
    }
];