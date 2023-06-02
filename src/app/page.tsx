import TableSummary from "./components/TableSummary";
import NavBarItems from "./components/NavBarItems";
import { GetServerSideProps } from "next";
import api from "./utils/axiosInstance";

export const getServerSideProps: GetServerSideProps<{
  tables: Table[];
}> = async () => {
  // console.log("helllo")
  // const res = api.get('tables');
  // console.log(res);
  // const tables = await (await res).data;
  const res = await fetch('http://localhost:8080/');
  const tables = await res.json();
  return { props: { tables } };
};

export default function Page(tables: Table[]) {
  console.log("tables"+tables);

  // if(true){
  //   return "";
  // }

  //fetch tables from the api

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Table of contents</a>
        </div>
        {<NavBarItems />}

      </div>
      <div className="text-center max-w-8xl pt-10">
        <h1 className="text-6xl font-bold">Discover the Power of Tables of Contents</h1>
        <p className="py-6 text-2xl opacity-50">Uncover the captivating chapters, topics, and subtopics that lie within every publication</p>
      </div>
      <div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-4">
        {tables.map((table: Table) => (<TableSummary  key={table.id} table={table}></TableSummary>))}
      </div>

    </main>
  )
}


