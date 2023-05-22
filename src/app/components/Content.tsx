export default function Content(props: { content: Content, indent: string }) {
    return (
        <>
            <ul className="list-none">
                <li>
                    <div className="flex">
                        <div className="">{props.indent}.{props.content.order} {props.content.name} ({props.content.page_no})</div>
                        <button className="text-blue-500 ml-2 btn btn-xs btn-circle btn-outline">+</button>
                    </div>
                    <ul className="ml-8 list-disc">{
                        props.content.children.map(child => (
                            <Content indent={`${props.indent}.${props.content.order}`} key={child.id} content={child}></Content>
                        ))
                    }
                    </ul>
                </li>
            </ul>
        </>
    );
}