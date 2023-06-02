'use client';
import Image from "next/image";
import { useState } from "react";
import ShowTableModal from "./ShowTableModal";
import api from "../utils/axiosInstance";

type Props = {
    table: Table
}
export default function TableSummary(props: { table: Table }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [table, setTable] = useState<Table>({
        id: '',
        name: '',
        description: '',
        category: '',
        contents: []
      });
      function fetchTableDetails() {
        setLoading(true);
        setShowEditModal(true);
        api.get(`tables/${table.id}`)
          .then((response) => {
            const table = response.data;
            console.log(table);
            setTable(table);
          })
          .catch((error) => {
            console.log(error);
          }).
          finally(() => {
            setLoading(false);
            console.log("done");
          })
      }
    return (
        <div>
            <div onClick={fetchTableDetails} className="card w-full bg-base-100 shadow-xl cursor-pointer hover:bg-primary">
                <figure><img src="/images/sb.jpg" alt="Shoes" className="w-full h-72 scale-100 hover:border-primary hover:border-4" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {props.table.name}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{props.table.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{props.table.category}</div>
                        <div className="badge badge-outline">Programming</div>
                    </div>
                </div>
            </div>
            {/* .Edit table of contents model.................................. */}
            {<ShowTableModal key={table.id} table={table} show={showEditModal} onClose={() => { setShowEditModal(false) }} />}
        </div>
    );
}