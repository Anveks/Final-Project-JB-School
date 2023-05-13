import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";
import { authStore } from "./AuthState";

export class VacationState {
  public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
  FetchVacations,
  AddVacation,
  EditVacation,
  DeleteVacation,
  UpdateFollowers,
  ResetVacations,
}

export interface VacationAction {
  type: VacationsActionType,
  payload?: any;
}

export function vacationsReducer(currentState = new VacationState(), action: VacationAction): VacationState {
  const newState = { ...currentState };

  switch(action.type){
    case VacationsActionType.FetchVacations:
      newState.vacations = action.payload;
      break;

    case VacationsActionType.AddVacation:
      newState.vacations.push(action.payload);
      break;
      
    case VacationsActionType.EditVacation:
      const index = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
      if(index >= 0){
        newState.vacations[index] = action.payload;
      }
      break;
    
    case VacationsActionType.DeleteVacation:
      const deleteIndex = newState.vacations.findIndex(v => v.vacationId === action.payload);
      if (deleteIndex >= 0) {
        newState.vacations.splice(deleteIndex, 1);
      }  
      break;

    case VacationsActionType.ResetVacations:
      console.log('xx');
      newState.vacations = [];
      break;

      case VacationsActionType.UpdateFollowers:
        const vacationIndex = newState.vacations.findIndex((v) => v.vacationId === action.payload.vacationId);

        newState.vacations[vacationIndex].isFollowing = action.payload.isFollowing;
        action.payload.isFollowing === 0 
          ? --newState.vacations[vacationIndex].followersCount 
          : ++newState.vacations[vacationIndex].followersCount;
        break;
  }

  return newState;
}

export const vacationsStore = createStore(vacationsReducer);
 