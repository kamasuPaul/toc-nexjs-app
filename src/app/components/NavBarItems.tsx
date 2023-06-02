'use client';
import { useState } from "react";
import LoginModal from "./LoginModal";
import AddTableModal from "./AddTableModal";

export default function NavBarItems(){
    const [show, setShow] = useState(false);

    return(
        <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered input-sm input-primary" />
        </div>
        <button onClick={() => setShow(!show)} className="btn btn-primary btn-wide btn-sm">
          <label  >New table</label>

        </button>
        {<LoginModal/>}

      {/* .Create table of contents model.................................. */}
      <AddTableModal show={show} onClose={() => { setShow(false) }} />
      </div>
    );
}