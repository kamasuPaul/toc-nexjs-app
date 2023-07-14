'use client';
import { useState } from "react";
import LoginModal from "./LoginModal";
import AddTableModal from "./AddTableModal";

export default function NavBarItems() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex-none gap-2">
      <div className="form-control">
        {/* <input type="text" placeholder="Search" className="input input-bordered input-sm input-primary" /> */}
      </div>
      <button onClick={() => setShow(!show)} className="btn btn-primary btn-sm rounded-full md:rounded">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m-6-6h12" />
        </svg>
        <label className="hidden md:inline">New table</label>
      </button>

      {<LoginModal />}

      {/* .Create table of contents model.................................. */}
      <AddTableModal show={show} onClose={() => { setShow(false) }} />
    </div>
  );
}