import Docoument from "src/models/Document";


export async function  createDocument(projectId, documentName:string){
    const returnDocument = await Docoument.create(
        {
            name:documentName,
            ProjectId: projectId
        }
    );
    await returnDocument.save();
    return returnDocument;
}

export async function  getAllDocuments(projectId){
    const returnDocument = await Docoument.findAll({
        where:
            {
                ProjectId: projectId
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
    const returnDocument = await Docoument.destroy({ where: { id }});
    return returnDocument;
}
