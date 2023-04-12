import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationState {
  public vacations: VacationModel[] = [];
}

export enum VacationsAcrionType {
  FetchVacations,
  AddVacation,
  EditVacation,
  DeleteVacation
}

export interface VacationAction {
  type: VacationsAcrionType,
  payload: any;
}

export function vacationsReducer(currentState = new VacationState(), action: VacationAction): VacationState {
  const newState = { ...currentState };

  switch(action.type){
    case VacationsAcrionType.FetchVacations:
      newState.vacations = action.payload;
      break;

    case VacationsAcrionType.AddVacation:
      newState.vacations.push(action.payload);
      break;
      
    case VacationsAcrionType.EditVacation:
      const index = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
      if(index >= 0){
        newState.vacations[index] = action.payload;
      }
      break;
    
    case VacationsAcrionType.DeleteVacation:
      const deleteIndex = newState.vacations.findIndex(v => v.vacationId === action.payload);
      if (deleteIndex >= 0) {
        newState.vacations.splice(deleteIndex, 1);
      }  
      break;
  }

  return newState;
}

export const vacationsStore = createStore(vacationsReducer);