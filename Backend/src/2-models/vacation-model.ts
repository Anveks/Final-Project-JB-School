import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {

  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public imageUrl: string;
  // public image: UploadedFile;

  public constructor(vacation: VacationModel){
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.imageUrl = vacation.imageUrl;
    // this.image = vacation.image;
  }

  // VALIDATIONS:
  // post validation
  private static postValiation = Joi.object({
    vacationId: Joi.number().optional().positive().integer(),
    destination: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(20).max(1000),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    price: Joi.number().positive().required(),
    imageUrl: Joi.string().optional().min(5).max(300),
});

  public validatePost(): string {
    const result = VacationModel.postValiation.validate(this);
    console.log(result);
    return result.error?.message;
  }

  // put validation:
  private static putValidation = Joi.object({
    vacationId: Joi.number().integer().positive().forbidden(),
    destination: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(20).max(1000),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    // startDate: Joi.string().isoDate().required(),
    // endDate: Joi.string().isoDate().greater(Joi.ref('startDate')).required(),
    price: Joi.number().positive().required().min(0).max(1000),
    imageUrl: Joi.string().optional().min(20).max(300)
  });

  public validatePut(): string {
    const result = VacationModel.putValidation.validate(this);
    return result.error?.message;
  }
}

export default VacationModel;