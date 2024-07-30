import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/hiearchie-view";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";

export const guiBasePath = "/hiearchie-view";

export const columns = [
    {
        Header: "Jméno",
        Filter: TextSearchFilter,
        accessor: "jmeno"
    },
    {
        Header: "Hiearchie",
        Filter: TextSearchFilter,
        accessor: "hiearchie"
    }
];