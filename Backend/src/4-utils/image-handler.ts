import { UploadedFile } from "express-fileupload";
import path from "path";
import {v4 as uuid} from "uuid";
import fsPromises from "fs/promises";
import appConfig from "./app-config";

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

async function updateImage(image: UploadedFile, currentImageName: string): Promise<string>{
  await deleteImage(currentImageName);
  const uuidName = await saveFile(image);
  return uuidName;
}

async function deleteImage(imageName: string): Promise<void>{
  try {

    if(!imageName) return;
    const absolutePath = getImagePath(imageName);
    await fsPromises.unlink(absolutePath);

  } catch(err: any){
    console.log(err.message);
  }
}

export default {
  getImagePath,
  saveFile,
  updateImage
}