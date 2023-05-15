import { MouseEventHandler, useState } from "react";

export default function AddTableModal(props: {
    onClose: MouseEventHandler<HTMLDivElement> | undefined; show: boolean;
}) {
    const [table, setTable] = useState({
        name: '',
        description: '',
        category: '',
    });
    if (!props.show) {
        return null;
    }
    function creatNewtable() {
        console.log("creating new table");
        console.log(table);
    }
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create a new table of contents</h3>
                <div className="divider"></div>
                <div className="flex flex-col space-y-2">
                    <input value={table.name} onChange={(event) => {
                        setTable({ ...table, name: event.target.value })
                    }} type="text" placeholder="Name" className="input input-bordered w-full " />
                    <input value={table.description}
                        onChange={(event) => { setTable({ ...table, description: event.target.value }) }}
                        type="text" placeholder="Description" className="input input-bordered w-full " />
                    <select className="select select-bordered w-full"
                        onChange={(event) => { setTable({ ...table, category: event.target.value }) }}
                    >
                        <option disabled value=''>Category</option>
                        <option value='books'>Books</option>
                        <option value='research_papers'>Research Papers</option>
                    </select>
                </div>
                <div className="modal-action" onClick={creatNewtable} >
                    <label htmlFor="my-modal" className="btn btn-primary">Save</label>
                </div>
            </div>
        </div>
    )
}