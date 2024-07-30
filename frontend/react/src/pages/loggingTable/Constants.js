import {TextSearchFilter, DropdownFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/admin/logging-table";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";

export const guiBasePath = "/logging-table";

export const columns = [
    {
        Header: "Před",
        Filter: TextSearchFilter,
        accessor: "pred"
    },
    {
        Header: "Po",
        Filter: TextSearchFilter,
        accessor: "po"
    },
    {
        Header: "Kdo",
        Filter: TextSearchFilter,
        accessor: "kdo"
    },
    {
        Header: "Kdy",
        Filter: TextSearchFilter,
        accessor: "kdy"
    },
    {
        Header: "Kde",
        Filter: TextSearchFilter,
        accessor: "kde"
    },
    {
        Header: "Operace",
        Filter: DropdownFilter,
        accessor: "operace"
    }
];