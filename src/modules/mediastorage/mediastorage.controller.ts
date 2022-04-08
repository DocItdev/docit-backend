import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pErr } from "../../shared/functions";
import { UploadedFile } from "./mediastorage.interface";
import { uploadFile } from "./mediastorage.service";


export async function uploadFileController(req: Request, res: Response) {
  try {
    const file = req.file;
    const fileUrl: string = await uploadFile({
      name: file.fieldname,
      size: file.size,
      type: file.mimetype,
      content: file.buffer,
      extension: file.mimetype.split('/')[1]
    })
    const uploadedFile: UploadedFile = { path: fileUrl }
    return res.status(StatusCodes.OK).json(uploadedFile);
  } catch(error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}