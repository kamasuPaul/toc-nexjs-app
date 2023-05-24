export default function Content(props: { content: Content, indent: string, addChildContent: (arg0: any) => void ,updateContent: (id: string , name: string) => void}) {

    const handleAddChildContent = () => {
        props.addChildContent(props.content.id); // Call the function with the content ID
    };
    function handleContentChange(event: { target: { value: string; }; }){
        props.updateContent(props.content.id,event.target.value);
    }
    return (
        <>
            <ul className="list-none">
                <li className="">
                    <div className="flex">
                        <div className="">{props.indent}.{props.content.order}
                            <input value={props.content.name}
                            onChange={handleContentChange}
                            type="text" placeholder="Type here" className="input input-ghost input-xs mx-2" />
                            ({props.content.page_no})
                        </div>
                        <button className="text-blue-500 ml-2 btn btn-xs btn-circle btn-outline"
                            onClick={handleAddChildContent}
                        >+</button>
                    </div>
                    <ul className="ml-8 list-disc">{
                        props.content.children.map(child => (
                            <Content addChildContent={props.addChildContent} updateContent={props.updateContent} indent={`${props.indent}.${props.content.order}`} key={child.id} content={child}></Content>
                        ))
                    }
                    </ul>
                </li>
            </ul>
        </>
    );
}