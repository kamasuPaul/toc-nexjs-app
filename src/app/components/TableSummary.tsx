'use client';
import { useState } from "react";
import ShowTableModal from "./ShowTableModal";
export default function TableSummary(props: { table: Table }) {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <div onClick={() => { setShowEditModal(true) }} className="card w-full bg-base-100 shadow-xl cursor-pointer hover:bg-primary">
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
      {props.table && <ShowTableModal key={props.table.id} table={props.table} show={showEditModal} onClose={() => { setShowEditModal(false) }} />}
    </div>
  );
}