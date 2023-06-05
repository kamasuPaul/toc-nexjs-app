'use client';

import { useEffect, useState } from "react";
import TableSummary from "./TableSummary";
import api from "../utils/axiosInstance";


export default function RecentTables() {
    const [tables, setTables] = useState([]);
    useEffect(() => {
        api.get('tables')
            .then(response => {
                const tables = response.data;
                setTables(tables);
            })
            .catch(error => {
                console.log(error);
            })

    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-4">
            {tables.map((table: Table) => (<TableSummary key={table.id} table={table}></TableSummary>))}
        </div>
    );
}