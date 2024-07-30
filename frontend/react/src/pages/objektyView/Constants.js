import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/admin/objekty-view";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";

export const guiBasePath = "/objekty-view";

export const columns = [
    {
        Header: "Typ",
        Filter: TextSearchFilter,
        accessor: "typObjektu"
    },
    {
        Header: "Název",
        Filter: TextSearchFilter,
        accessor: "nazevObjektu"
    }
];