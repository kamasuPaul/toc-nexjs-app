export default function Content(props: { content: Content, indent: string, addChildContent: (parentId: string) => void, updateContent: (id: string, name: string, pageNo: number) => void, deleteContent: (id: string) => void }) {
    const label = props.content.level < 1 ? props.content.order : (props.indent + '.' + props.content.order);
    const handleAddChildContent = () => {
        props.addChildContent(props.content.id); // Call the function with the content ID
    };
    function handleContentChange(event: { target: { value: string; }; }) {
        props.updateContent(props.content.id, event.target.value, props.content.page_no);
    }
    function handlePageNoChange(event: { target: { value: string; }; }) {
        props.updateContent(props.content.id, props.content.name, parseInt(event.target.value));
    }
    function handleDeleteContent(): void {
        props.deleteContent(props.content.id); // Call the function with the content ID
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
                        <div className="w-1/12">
                            <input value={props.content.page_no}
                                onChange={handlePageNoChange}
                                type="number" placeholder="page..."
                                className=" w-full input input-ghost input-xs" />
                        </div>
                        <div className="w-1/12 flex">
                            <button
                                className={`text-blue-${500+((props.content.level)*100)}` + "  ml-2 btn btn-xs btn-circle btn-outline"}
                                onClick={handleAddChildContent}
                            >+</button>
                            <button
                                className=" text-blue-500 ml-2 btn btn-xs btn-circle btn-outline"
                                onClick={handleDeleteContent}
                            >-</button>
                        </div>
                    </div>
                    <ul className="ml-6 list-disc">{
                        props.content.children.map(child => (
                            <Content addChildContent={props.addChildContent} updateContent={props.updateContent} deleteContent={props.deleteContent} indent={`${label}`} key={child.id} content={child}></Content>
                        ))
                    }
                    </ul>
                </li>
            </ul>
        </>
    );
}