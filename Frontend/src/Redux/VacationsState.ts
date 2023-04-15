import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationState {
  public vacations: VacationModel[] = [];
}

export enum VacationsAcrionType {
  FetchVacations,
  AddVacation,
  EditVacation,
  DeleteVacation,
  UpdateVacations
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

     case VacationsAcrionType.UpdateVacations:
      const updatedVacations = newState.vacations.map((item) => {   
        if(item.vacationId === action.payload.vacationId){  
          // const isFollowing = item.followersCount > action.payload.followersCount ? 0 : 1;
          console.log('before:' + item.followersCount);
          console.log('after: ' + action.payload.followersCount);

          let isFollowing;
          if (item.followersCount > action.payload.followersCount) {
            isFollowing = 0;
            return {...item, isFollowing: isFollowing, followersCount: action.payload.followersCount};
          } else if (item.followersCount < action.payload.followersCount){
            isFollowing = 1;
            return {...item, isFollowing: isFollowing, followersCount: action.payload.followersCount};
          }
          return item;
        }
        return item;
      });
      newState.vacations = updatedVacations;
      console.log(newState.vacations);
      
      break;
  }

  return newState;
}

export const vacationsStore = createStore(vacationsReducer);