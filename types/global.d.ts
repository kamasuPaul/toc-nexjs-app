type Table ={
    id: string,
    name: string,
    description: string,
    category: string,
    contents: Array<Content>
}
type Content = {
    id:string,
    name: string,
    level: number
    order: number,
    page_no: number,
    children: Array<Content>
}