import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pErr } from "../../shared/functions";
import { FileRequest, UploadedFile } from "./mediastorage.interface";
import {
  uploadFile,
  deleteUploadedFile,
  getDownloadUrl,
  headUploadedFile,
  getUploadedFileStream,
  createStoreJwtToken,
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

export async function getFileStreamController(req: FileRequest, res: Response) {
  try {
    const { fileKey, headers } = req;
    const uploadedFile: UploadedFile = { path: fileKey };
    const range: string = headers.range;
    const fileStat = await headUploadedFile(uploadedFile);
    const fileSize = fileStat.ContentLength;
    const fileStream = getUploadedFileStream(uploadedFile)
    if(range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1;
      const chunkSize = (end-start) + 1;
      const resHeaders = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": fileStat.ContentType,
      };
      res.writeHead(206, resHeaders);
      fileStream.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': fileStat.ContentType,
      };
      res.writeHead(200, head);
      fileStream.pipe(res);
    }
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

export function getStoreTokenController(req: Request, res: Response) {
  try {
    const fileKey = String(req.query.filePath);
    const token = createStoreJwtToken(fileKey);
    return res.status(StatusCodes.OK).json({ code: token });
  } catch (error) {
    pErr(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
