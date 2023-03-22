import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pErr } from "../../shared/functions";
import { FileRecordType } from "./mediastorage.interface";
import {
  uploadFile,
  deleteUploadedFile,
  getDownloadUrl,
  headUploadedFile,
  getFileRecords,
} from "./mediastorage.service";

export async function uploadFileController(req: Request, res: Response) {
  try {
    const file = req.file;
    const docId = req.params.docId
    const fileRecord: FileRecordType = await uploadFile({
      name: file.fieldname,
      size: file.size,
      type: file.mimetype,
      content: file.buffer,
      extension: file.mimetype.split("/")[1],
      metadata: {
        originalName: file.originalname
      }
    }, docId);
    return res.status(StatusCodes.OK).json(fileRecord);
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getUploadedFileController(req: Request, res: Response) {
  try {
    const fileKey = String(req.params.fileKey)
    const url: string = await getDownloadUrl(fileKey);
    const fileStat = await headUploadedFile(fileKey);
    return res.status(StatusCodes.OK).json({ ...fileStat, mediaDownloadUrl: url });
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getAllFileRecordsController(req: Request, res: Response) {
  try {
    const docId: string = req.params.docId;
    const fileRecords = await getFileRecords(docId);
    return res.status(StatusCodes.OK).json(fileRecords);
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function deleteUploadedFileController(
  req: Request,
  res: Response
) {
  try {
    const fileKey = String(req.params.fileKey)
    await deleteUploadedFile(fileKey);
    return res.status(StatusCodes.OK).json({ message: "success" });
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}
