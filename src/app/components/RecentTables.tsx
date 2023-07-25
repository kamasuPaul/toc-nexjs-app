import TableSummary from "./TableSummary";
async function getTables(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tables`,{ next: { revalidate: 30 } });
    const tables = await response.json();
    return tables;
}
export default async function RecentTables() {
    const tables = await getTables();

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-4">
            {tables.map((table: Table) => (<TableSummary key={table.id} table={table}></TableSummary>))}
        </div>
    );
}