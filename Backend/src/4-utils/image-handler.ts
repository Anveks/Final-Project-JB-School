import path from "path";

const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

function getImagePath(imageName: string): string {
  return imagesFolder + "/" + imageName;
}

export default {
  getImagePath,
}