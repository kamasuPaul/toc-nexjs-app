type Table ={
    id: string,
    name: string,
    description: string,
    category: string,
    image_url?:string,
    content_url?:string,
    created_at?:string,
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