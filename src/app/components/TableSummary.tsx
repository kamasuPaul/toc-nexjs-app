'use client';
import { useState } from "react";
import ShowTableModal from "./ShowTableModal";
export default function TableSummary(props: { table: Table }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const isLessThanTwoDaysAgo = () => {
    const currentDate = new Date();
    const itemDate = new Date(props.table.created_at);
    const timeDifference = currentDate.getTime() - itemDate.getTime();
    const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

    return timeDifference < twoDaysInMilliseconds;
  };
  const displayText = isHovered ? props.table.description : (props.table.description.slice(0, 30) + (props.table.description.length > 30 ? " ..." : ''));
  const tableName = isHovered ? props.table.name : (props.table.name.slice(0, 30) + (props.table.name.length > 30 ? " ..." : ''));

  return (
    <div>
      <div onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} onClick={() => { setShowEditModal(true) }} className="card w-full bg-base-100 shadow-xl cursor-pointer hover:bg-primary">
        <figure><img src={props.table.image_url ? props.table.image_url : "https://i.ibb.co/mX8bBHL/download.jpg"} alt={"photo of table of contents of the "+props.table.category+": "+tableName} className="w-full h-52 scale-100 hover:border-primary hover:border-4" /></figure>
        <div className="card-body"
        >
          <h2 className="card-title">
            {tableName}
            {isLessThanTwoDaysAgo() && <div className="badge badge-secondary">NEW</div>}
          </h2>
          <p >{displayText}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{props.table.category}</div>
          </div>
        </div>
      </div>
      {/* .Edit table of contents model.................................. */}
      {props.table && <ShowTableModal key={props.table.id} table={props.table} show={showEditModal} onClose={() => { setShowEditModal(false) }} />}
    </div>
  );
}
