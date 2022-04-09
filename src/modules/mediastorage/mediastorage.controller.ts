import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pErr } from "../../shared/functions";
import { UploadedFile } from "./mediastorage.interface";
import {
  uploadFile,
  deleteUploadedFile,
  getDownloadUrl,
} from "./mediastorage.service";

export async function uploadFileController(req: Request, res: Response) {
  try {
    const file = req.file;
    const fileUrl: string = await uploadFile({
      name: file.fieldname,
      size: file.size,
      type: file.mimetype,
      content: file.buffer,
      extension: file.mimetype.split("/")[1],
    });
    const uploadedFile: UploadedFile = { path: fileUrl };
    return res.status(StatusCodes.OK).json(uploadedFile);
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export function getUploadedFileController(req: Request, res: Response) {
  try {
    const { query } = req;
    const file: UploadedFile = { path: String(query.filePath) };
    const url: string = getDownloadUrl(file);
    return res.status(StatusCodes.OK).json({ mediaDownloadUrl: url });
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
    const { query } = req;
    const file: UploadedFile = { path: String(query.filePath) };
    await deleteUploadedFile(file);
    return res.status(StatusCodes.OK).json({ message: "success" });
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}
