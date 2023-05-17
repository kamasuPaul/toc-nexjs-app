export default function Content(props: { content: Content }) {
    return (
        <div>
            <div>{props.content.name}</div>
            {
                props.content.children.map(child => (
                    <Content key={child.id} content={child}></Content>
                ))
            }
        </div>
    );
}