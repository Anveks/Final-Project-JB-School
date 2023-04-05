import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacation-model";
import appConfig from "../4-utils/app-config";
import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import imageHandler from "../4-utils/image-handler";

// get all vacations:
async function getVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
        SELECT DISTINCT
            V.*,
            CONCAT('${appConfig.imageUrl}', V.imageFileName) AS imageUrl,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacations as V LEFT JOIN followers as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate
        `;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
  }

async function addVacation(vacation: VacationModel): Promise<VacationModel>{
    const err = vacation.validatePost();
    if (err) throw new ValidationError("Vacation is not valid.")    

    let imageName = null;
    if (vacation.image) {
      imageName = await imageHandler.saveFile(vacation.image);
      vacation.imageUrl = appConfig.imageUrl + imageName;
    }
    
    const sql = 'INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)';
    const result: OkPacket = await dal.execute(sql, 
      [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName]);
    vacation.vacationId = result.insertId;
    delete vacation.image;
    return vacation;
  }

// update an existing vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel>{

  const err = vacation.validatePut();
  if (err) throw new ValidationError("Some changes are not valid.")

  console.log(vacation.vacationId);

  let currentImageName = await getImgName(vacation.vacationId);

  if(vacation.image){
    currentImageName = await imageHandler.updateImage(vacation.image, currentImageName);
  }

  vacation.imageUrl = appConfig.imageUrl + currentImageName;
        
  const sql = `
    UPDATE vacations SET 
    destination = ?,
    description = ?,
    startDate = ?,
    endDate = ?,
    price = ?,
    imageFileName = ?
    WHERE vacationId = ?
  `;
    
  const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, currentImageName, vacation.vacationId]);
        
  if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

  delete vacation.image;
    
  return vacation;
  }

// delete an existing vacation
async function deleteVacation(id: number): Promise<void>{

  const imageName = await getImgName(id);

  const sql = `DELETE FROM vacations WHERE vacationId = ?`;
  const result: OkPacket = await dal.execute(sql, [id]);

  if(result.affectedRows === 0) throw new ResourceNotFoundError(id);

  await imageHandler.deleteImage(imageName);
}

async function getImgName(vacationId: number): Promise<string> {
  const sql = `SELECT imageFileName AS imageFileName FROM vacations WHERE vacationId = ?`;
  const result = await dal.execute(sql, [vacationId]);
  const imageName = result[0]?.imageFileName;
  return imageName;
}

export default {
  getVacations,
  addVacation,
  updateVacation,
  deleteVacation
};
