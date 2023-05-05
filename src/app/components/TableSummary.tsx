import Image from "next/image";
export default function TableSummary() {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="/images/sb.jpg" alt="Shoes" className="w-full h-72 scale-100" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    Books
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>This is the best book to learn Spring Boot from none other than Craig Walls, who has taught most Java developers Spring Framework</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Java</div>
                    <div className="badge badge-outline">Programming</div>
                </div>
            </div>
        </div>
    );
}