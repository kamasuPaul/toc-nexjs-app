import { MouseEventHandler } from "react";

export default function AddTableModal(props: {
    onClose: MouseEventHandler<HTMLDivElement> | undefined; show: boolean;
}) {
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create a new table of contents</h3>
                <div className="divider"></div>
                <div className="flex flex-col space-y-2">
                    <input type="text" placeholder="Name" className="input input-bordered w-full " />
                    <input type="text" placeholder="Description" className="input input-bordered w-full " />
                </div>
                <div className="modal-action" onClick={props.onClose} >
                    <label htmlFor="my-modal" className="btn btn-primary">Save</label>
                </div>
            </div>
        </div>
    )
}