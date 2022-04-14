import { StatusCodes } from "http-status-codes";
import { Response, NextFunction } from 'express';
import { verifyStoreJwtToken, headUploadedFile } from "./mediastorage.service";
import { FileRequest } from "./mediastorage.interface";
import { pErr } from "../../shared/functions";

export async function verifyStoreToken(req: FileRequest, res: Response, next: NextFunction) {
  try {
    const token = String(req.query.code);
    const decoded: any = verifyStoreJwtToken(token);
    const fileKey = String(decoded.fileKey);
    const metadata = await headUploadedFile({ path: fileKey })
    if (!decoded || !metadata) {
      return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized Request');
    }
    req.fileKey = fileKey;
    next();
  } catch(err) {
    pErr(err);
    return res.status(StatusCodes.UNAUTHORIZED).send(err.message);
  }
}
