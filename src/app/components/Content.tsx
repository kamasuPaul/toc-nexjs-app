export default function Content(props: { content: Content, indent: string, addChildContent: (arg0: any) => void, updateContent: (id: string, name: string) => void }) {
    const label = props.content.level <= 1 ? props.content.order :  (props.indent +'.'+ props.content.order);
    const handleAddChildContent = () => {
        props.addChildContent(props.content.id); // Call the function with the content ID
    };
    function handleContentChange(event: { target: { value: string; }; }) {
        props.updateContent(props.content.id, event.target.value);
    }
    return (
        <>
            <ul className="list-none">
                <li className="w-full">
                    <div className="flex w-full justify-between ">
                        <div className="w-1/12 mr-0 p-0">{label}</div>
                        <div className="w-9/12 grow ml-0 mr-2">
                        <input value={props.content.name}
                            onChange={handleContentChange}
                            type="text" placeholder="Type here"
                            className=" w-full input input-ghost input-xs" />
                        </div>
                        <div className="w-1/12">({props.content.page_no})</div>
                        <div className="w-1/12">
                            <button
                                className=" text-blue-500 ml-2 btn btn-xs btn-circle btn-outline"
                                onClick={handleAddChildContent}
                            >+</button>
                        </div>
                    </div>
                    <ul className="ml-6 list-disc">{
                        props.content.children.map(child => (
                            <Content addChildContent={props.addChildContent} updateContent={props.updateContent} indent={`${label}`} key={child.id} content={child}></Content>
                        ))
                    }
                    </ul>
                </li>
            </ul>
        </>
    );
}