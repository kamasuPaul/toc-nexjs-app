import TableSummary from "./components/TableSummary";
export default function Home() {
  const tables = function tables() {
    const items = [1, 2, 3];
    return items.map(function (item) {
      return <TableSummary key={item}></TableSummary>
    })
  };
  const items = [1, 2, 3];

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
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span className="text-xs">AA</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center max-w-8xl pt-10">
        <h1 className="text-6xl font-bold">Create beatiful Tables of Contents</h1>
        <p className="py-6 text-2xl opacity-50">Create, edit and find tables of contents</p>
      </div>
      <div>
      </div>
      <div className="columns-3">
      {items.map(item => (<TableSummary key={item}></TableSummary>))}
      </div>
    </main>
  )
}
