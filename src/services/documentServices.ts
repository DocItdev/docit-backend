import Document from "../models/Document";


export async function  createDocument(ProjectId:string, name:string){
    const returnDocument = await Document.create(
        {
            name,
            ProjectId
        }
    );
    await returnDocument.save();
    return returnDocument;
}

export async function getAllDocuments(ProjectId:string){
    const returnDocument = await Document.findAll({
        where:
            {
                ProjectId
            }
        });
    return returnDocument;
}

export async function updateDocument(id:string, name: string){
    const returnDocument = await Document.update({name},{
        where:
            {
                id
            }
        });
    return returnDocument;
}

export async function deleteDocument(id:string){
    const returnDocument = await Document.destroy({
         where:
            { 
                 id 
            }
        });
    return returnDocument;
}
