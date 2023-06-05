import NavBarItems from "./components/NavBarItems";
import RecentTables from "./components/RecentTables";

export default function Page() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Table of contents</a>
        </div>
        {<NavBarItems />}

      </div>
      <div className="text-center max-w-8xl pt-10">
        <h1 className="text-5xl font-bold">Tables of Contents for every book in one place.</h1>
        <p className="py-6 text-2xl opacity-50">Create, Edit and Uncover the captivating chapters, topics, and subtopics that lie within every book and publication</p>
      </div>
      <div>
        <RecentTables/>
      </div>


    </main>
  )
}


