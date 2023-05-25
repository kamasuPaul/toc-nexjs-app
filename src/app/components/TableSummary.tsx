import Image from "next/image";

type Props = {
    table: Table
}
export default function TableSummary(props: { onClick: () => void, table: Table}) {
    return (
        <div onClick={props.onClick} className="card w-full bg-base-100 shadow-xl cursor-pointer hover:bg-primary">
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
    );
}