import api from "../utils/axiosInstance";
import { useState } from "react";
import Content from "./Content";
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../firebase/app';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

export default function AddTableModal(props: {
  onClose: () => void; show: boolean;
}) {
  const [user, authLoading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [loading, setLoading] = useState(false);
  const [violations, setViolations] = useState([]);
  const [table, setTable] = useState<Table>({
    id: '',
    name: '',
    description: '',
    category: '',
    contents: []
  });
  const [contents, setContents] = useState<Array<Content>>([
    {
      id: uuidv4(),
      name: '',
      level: 1,
      order: 1,
      page_no: 0,
      children: []
    }
  ]);
  if (!props.show) {
    return null;
  }
  function createRootContent() {
    setContents(prevContents => [...prevContents, {
      id: uuidv4(),
      name: '',
      level: 1,
      order: prevContents.length + 1,
      page_no: 0,
      children: [],
    }
    ])
  }
  function creatNewtable() {
    if(!user){
      signInWithGoogle();
      return;
    }
    setLoading(true);
    setViolations([]);
    console.log("creating new table");
    const data = { ...table, contents: contents }
    console.log(data);
    api.post('tables', data)
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
      })
  }
  function updateContent(id: string, name: string, pageNo: number) {
    setContents(prevContents => {
      const updatedContents = prevContents.map((content) => {
        if (content.id === id) {
          return {
            ...content,
            name: name,
            page_no: pageNo,
          }
        } else if (content.children.length > 0) {
          return {
            ...content,
            children: updateChildContent(content.children, id, name, pageNo),
          }

        }
        return content;
      });
      return updatedContents;
    })
  }
  function addChildContent(parentId: string) {
    setContents(prevContents => {
      // Find the parent content and update its children array
      const updatedContents = prevContents.map(content => {
        if (content.id === parentId) {
          const newContent = {
            id: uuidv4(),
            name: '',
            level: content.level + 1,
            order: content.children.length + 1,
            page_no: 0,
            children: [],
          };
          return {
            ...content,
            children: [...content.children, newContent],
          };
        } else if (content.children.length > 0) {
          return {
            ...content,
            children: addChildContentToChildren(content.children, parentId),
          };
        }
        return content;
      });

      return updatedContents;
    });
  }
  function updateChildContent(children: Array<Content>, id: string, newName: string, pageNo: number): Array<Content> {
    return children.map(content => {
      if (content.id === id) {
        return {
          ...content,
          name: newName,
          page_no: pageNo,
        }
      } else if (content.children.length > 0) {
        return {
          ...content,
          children: updateChildContent(content.children, id, newName, pageNo),
        };
      }
      return content;
    });
  }

  function addChildContentToChildren(children: Array<Content>, parentId: string): Array<Content> {
    return children.map(child => {
      if (child.id === parentId) {
        const newContent = {
          id: uuidv4(),
          name: '',
          level: child.level + 1,
          order: child.children.length + 1,
          page_no: 0,
          children: [],
        };
        return {
          ...child,
          children: [...child.children, newContent],
        };
      } else if (child.children.length > 0) {
        return {
          ...child,
          children: addChildContentToChildren(child.children, parentId),
        };
      }
      return child;
    });
  }
  function deleteContent(parentId: string) {

    setContents(prevContents => {
      // Find the parent content and update its children array
      const containsItemWithId = prevContents.some(content => content.id === parentId);
      if (containsItemWithId) {
        return prevContents.filter(content => content.id !== parentId);
      }
      const updatedContents = prevContents.map(content => {
        if (content.children.length > 0) {
          return {
            ...content,
            children: deleteChildContent(content.children, parentId),
          };
        }
        return content;
      });

      return updatedContents;
    });
  }
  function deleteChildContent(children: Array<Content>, parentId: string): Array<Content> {
    //if the delete flag is set, then remove the content
    const containsItemWithId = children.some(content => content.id === parentId);
    if (containsItemWithId) {
      return children.filter(content => content.id !== parentId);
    }
    const updatedContents = children.map(content => {
      if (content.children.length > 0) {
        return {
          ...content,
          children: deleteChildContent(content.children, parentId),
        };
      }
      return content;
    });

    return updatedContents;
  }
  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex flex-row justify-between">
          <h3 className="font-bold text-lg">Create a new table of contents</h3>
          <div className="justify-end">
            <button className="btn btn-square btn-sm" onClick={props.onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        {(violations && violations.length <= 0) ? '' : <div className="alert alert-error shadow-lg">
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
          <div className="divider">Contents</div>
          <div className="w-11/12">
            {
              contents.map((content) => (
                <Content indent={'1'} key={content.id} content={content} addChildContent={addChildContent} updateContent={updateContent} deleteContent={deleteContent} ></Content>
              ))
            }
          </div>
          <button className="text-blue-500 ml-2 btn btn-xs btn-circle btn-outline"
            onClick={createRootContent}
          >+</button>
        </div>
        <div className="modal-action" onClick={creatNewtable} >
          <label htmlFor="my-modal" className={`btn btn-primary ${loading ? 'loading' : ''}`}>Save</label>
        </div>
      </div>
    </div>
  )
}