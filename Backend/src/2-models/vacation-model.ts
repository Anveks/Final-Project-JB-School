// import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {

  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public imageFileName: string;
  // public image: UploadedFile;

  public constructor(vacation: VacationModel){
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.imageFileName = vacation.imageFileName;
    // this.image = vacation.image;
  }

  // VALIDATIONS:
  private static postValiation = Joi.object({
    vacationId: Joi.number().forbidden().positive().integer(),
    destination: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(20).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(0).max(1000),
    imageFileName: Joi.string().required().min(20).max(300),
});

// put validation

  public validatePost(): string {
    const result = VacationModel.postValiation.validate(this);
    return result.error?.message;
  }
}

export default VacationModel;