import React, {useEffect, useState} from "react";
import {useTable, useFilters, useSortBy, usePagination} from "react-table";
import {matchSorterFn} from "./Sorting";
import Icon from "@mdi/react";
import {mdiChevronDown, mdiChevronUp} from '@mdi/js';
import * as Auth from "../../utils/Auth";
import {useSharedState} from "../../utils/SharedStateContext";

const DataTable = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {sharedState} = useSharedState();
    useEffect(() => {
        Auth.isAdmin().then(data => setIsAdmin(data));
    }, []);


    const data = React.useMemo(() => props.data, [props.data]);
    const columns = React.useMemo(() => props.columns, [props.columns]);
    const defaultColumn = React.useMemo(() => ({
        Filter: ""
    }), []);
    const filterTypes = React.useMemo(() => ({
        rankedMatchSorter: matchSorterFn
    }), []);

    const initialState = {
        pageSize: 10, pageIndex: 0
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize}
    } = useTable({
        columns, data, defaultColumn, filterTypes
    }, useFilters, useSortBy, usePagination);

    return (<>
            <table {...getTableProps()} style={{margin: "0 auto"}}>
                <thead>
                {headerGroups.map((headerGroup) => (<tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                        if (!column.isAdmin || (column.isAdmin && isAdmin && !sharedState)) {
                            return (<th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")} <span>{column.isSorted ? (column.isSortedDesc ?
                                <Icon path={mdiChevronDown} size={1}/> :
                                <Icon path={mdiChevronUp} size={1}/>) : ""}</span>
                                <div onClick={e => {
                                    e.stopPropagation()
                                }}>{column.canFilter ? column.render("Filter") : null}</div>
                            </th>)
                        }
                    })}
                </tr>))}
                </thead>

                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (<tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            if (!cell.column.isAdmin || (cell.column.isAdmin && isAdmin && !sharedState)) {
                                return <td style={{
                                    overflowWrap: "anywhere",
                                    whiteSpace: "pre-wrap",
                                    textAlign: "left"
                                }} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            }
                        })}
                        <td>{props.ViewLink(row)}</td>
                        <td>{props.EditLink(row)}</td>
                        <td>{props.DeleteButton(row)}</td>
                    </tr>);
                })}
                </tbody>
            </table>

        <div className="pagination"
             style={{justifyContent: "flex-end", margin: "10px", display: "flex", columnGap: "5px"}}>
            <button type={"button"} className={"btn btn-default"} style={{border: "1px black solid"}}
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}>{"<<"}</button>
            {" "}
            <button type={"button"} className={"btn btn-default"} style={{border: "1px black solid"}}
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}>{"<"}</button>
            {" "}
            <button type={"button"} className={"btn btn-default"} style={{border: "1px black solid"}}
                    onClick={() => nextPage()}
                    disabled={!canNextPage}>{">"}</button>
            {" "}
            <button type={"button"} className={"btn btn-default"} style={{border: "1px black solid"}}
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}>{">>"}</button>
            {" "}

            <label className="form-label"
                   style={{margin: "auto 0"}}>Strana {pageIndex + 1} z {pageOptions.length} </label>
            <label className="form-label" style={{margin: "auto 0"}}> | Jdi na stranu:</label>

            <input
                min={1}
                type="number"
                className={"form-control"}
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                }}
                style={{width: "75px"}}
            />
            {" "}
            <select
                value={pageSize}
                className={"form-control"}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                }}
                style={{width: "100px"}}
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (<option key={pageSize} value={pageSize}>
                    Zobraz {pageSize}
                </option>))}
            </select>
        </div>
        </>);
};

export default DataTable;
