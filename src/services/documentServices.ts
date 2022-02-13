import Docoument from "src/models/Document";


export async function  createDocument(ProjectId:string, name:string){
    const returnDocument = await Docoument.create(
        {
            name,
            ProjectId
        }
    );
    await returnDocument.save();
    return returnDocument;
}

export async function  getAllDocuments(ProjectId:string){
    const returnDocument = await Docoument.findAll({
        where:
            {
                ProjectId
            }
        });
    return returnDocument;
}

export async function  updateDocument(id:string, name: string){
    const returnDocument = await Docoument.update({name},{
        where:
            {
                id
            }
        });
    return returnDocument;
}

export async function  deleteDocument(id:string){
    const returnDocument = await Docoument.destroy({
         where:
            { 
                 id 
            }
        });
    return returnDocument;
}
