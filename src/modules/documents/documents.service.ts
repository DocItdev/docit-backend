import { DocumentType } from "./documents.interface";
import Document from "./documents.model";

export async function createDocument(document: DocumentType) {
  const returnDocument = await Document.create(document);
  await returnDocument.save();
  return returnDocument;
}

export async function getAllDocuments(ProjectId: string) {
  const returnDocument = await Document.findAll({
    where: {
      ProjectId,
    },
  });
  return returnDocument;
}

export async function getDocumentById(ProjectId: string, DocumentId: string) {
  const document = await Document.findOne({
    where: {
      ProjectId,
      id: DocumentId,
    }
  });
  if(document === null) {
    throw new Error('Document Not Found');
  }
  return document;
}

export async function updateDocument(data: DocumentType) {
  const returnOutcome = await Document.update(
   data,
    {
      where: {
        id: data.id,
        ProjectId: data.ProjectId,
      },
    }
  );
  if (returnOutcome[0] === 0) {
    throw new Error('No documents were updated');
  }
  return returnOutcome;
}

export async function deleteDocument(id: string, ProjectId: string) {
  const returnDocument = await Document.destroy({
    where: {
      id,
      ProjectId,
    },
  });
  return returnDocument;
}
