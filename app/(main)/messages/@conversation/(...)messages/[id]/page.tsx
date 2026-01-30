export default async function  PrivateMessage({params} : {params: {id: string}}){
    const {id} = await params;

    console.log(id);

    return (
        <div className="flex-1 flex">
           asdad
        </div>
    )
}