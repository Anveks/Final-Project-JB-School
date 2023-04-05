import { UploadedFile } from "express-fileupload";
import path from "path";
import {v4 as uuid} from "uuid";

const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

function getImagePath(imageName: string): string {
  return imagesFolder + "/" + imageName;
}

async function saveFile(image: UploadedFile): Promise<string>{
  const fileExtension = image.name.slice(image.name.lastIndexOf("."));
  const uuidName = uuid() + fileExtension;
  const absolutePath = getImagePath(uuidName);
  await image.mv(absolutePath);
  return uuidName;
}

export default {
  getImagePath,
  saveFile
}