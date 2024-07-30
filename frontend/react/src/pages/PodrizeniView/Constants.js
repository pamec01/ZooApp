import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/admin/podrizeni-view";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";

export const guiBasePath = "/podrizeni-view";

export const columns = [
    {
        Header: "Jméno",
        Filter: TextSearchFilter,
        accessor: "jmeno"
    },
    {
        Header: "Příjmení",
        Filter: TextSearchFilter,
        accessor: "prijmeni"
    },
    {
        Header: "Plat",
        Filter: TextSearchFilter,
        accessor: "plat"
    },
    {
        Header: "Email",
        Filter: TextSearchFilter,
        accessor: "email"
    }
];