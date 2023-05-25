'use client';//TODO: fix this
import { useState, useEffect } from "react";
import TableSummary from "./components/TableSummary";
import AddTableModal from "./components/AddTableModal";
import api from "./utils/axiosInstance";

export default function Home() {
  const [show, setShow] = useState(false);
  const [tables, setTables] = useState([]);
  //fetch tables from the api
  useEffect(() => {
    api.get('tables')
      .then(response => {
        const tables = response.data;
        setTables(tables);
      })
      .catch(error => {
        console.log(error);
      })

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Table of contents</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered input-sm input-primary" />
          </div>
          <button onClick={() => setShow(!show)} className="btn btn-primary btn-wide btn-sm">
            <label  >New table</label>

          </button>

        </div>
      </div>
      <div className="text-center max-w-8xl pt-10">
        <h1 className="text-6xl font-bold">Discover the Power of Tables of Contents</h1>
        <p className="py-6 text-2xl opacity-50">Uncover the captivating chapters, topics, and subtopics that lie within every publication</p>
      </div>
      <div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tables.map((table: Table) => (<TableSummary key={table.id} table={table}></TableSummary>))}
      </div>
      {/* .Create table of contents model.................................. */}
      <AddTableModal show={show} onClose={() => { setShow(false) }} />
    </main>
  )
}
