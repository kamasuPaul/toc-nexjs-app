import axios from "axios";
import { MouseEventHandler, useState } from "react";

export default function AddTableModal(props: {
    onClose: () => void; show: boolean;
}) {
    const [loading, setLoading] = useState(false);
    const [violations, setViolations] = useState([]);
    const [table, setTable] = useState({
        name: '',
        description: '',
        category: '',
        contents: [
            {
                "name": "Bootstrapping Spring",
                "page_no": 1,
                "level": 1,
                "order": 1,
                "children": [
                    {
                        "name": "Spring rebooted",
                        "page_no": 2,
                        "level": 2,
                        "order": 1,
                        "children": []
                    }]
            }
        ],
    });
    if (!props.show) {
        return null;
    }
    function creatNewtable() {
        setLoading(true);
        setViolations([]);
        console.log("creating new table");
        console.log(table);
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/tables`, table)
            .then((response) => {
                console.log(response);
                props.onClose();
            })
            .catch((error) => {
                console.log(error);
                const violations = error.response.data.violations;
                setViolations(violations);
                console.log(violations);
            }).
            finally(() => {
                setLoading(false);
                console.log("done");
            })
    }
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <div className="flex flex-row justify-between">
                <h3 className="font-bold text-lg">Create a new table of contents</h3>
                <div className="justify-end">
                    <button className="btn btn-square btn-sm" onClick={props.onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                </div>
                {violations.length <= 0 ? '' : <div className="alert alert-error shadow-lg">
                    <div className="flex-col items-start">
                        {violations.map((item: { name: string; message: string }) =>
                        (<div className="flex flex-row justify-start" key={item.name}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{item.message}</span>
                        </div>
                        )
                        )}
                    </div>
                </div>}
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
                    <label htmlFor="my-modal" className={`btn btn-primary ${loading ? 'loading' : ''}`}>Save</label>
                </div>
            </div>
        </div>
    )
}