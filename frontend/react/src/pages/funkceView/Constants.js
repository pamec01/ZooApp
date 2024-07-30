import {TextSearchFilter} from "../../layout/dataTable/Filters";

export const serverUrl = "http://localhost:8080";

export const apiBaseUrl = serverUrl + "/api/funkce-view";

export const apiSelectAllUrl = apiBaseUrl + "/select/all";
export const apiRefreshUrl = (umisteniId, zvireId) => apiBaseUrl + "/refresh/" + umisteniId + "/" + zvireId;

export const guiBasePath = "/funkce-view";

export const columns = [
    {
        Header: "Zvířat na metr čtvereční",
        accessor: "zviratMetrCtverecni"
    },
    {
        Header: "Nejnovější medikament pro zvíře",
        accessor: "nejnovejsiMedikament"
    }
];