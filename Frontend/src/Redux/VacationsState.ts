import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationState {
  public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
  FetchVacations,
  AddVacation,
  EditVacation,
  DeleteVacation,
  UpdateFollowers
}

export interface VacationAction {
  type: VacationsActionType,
  payload: any;
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

    //  case VacationsActionType.UpdateVacations:
    //   const updatedVacations = newState.vacations.map((item) => {   
    //     if(item.vacationId === action.payload.vacationId){  

    //       let isFollowing;
    //       if (item.followersCount > action.payload.followersCount) {
    //         isFollowing = 0;
    //         return {...item, isFollowing: isFollowing, followersCount: action.payload.followersCount};
    //       } else if (item.followersCount < action.payload.followersCount){
    //         isFollowing = 1;
    //         return {...item, isFollowing: isFollowing, followersCount: action.payload.followersCount};
    //       }
    //       return item;
    //     }
    //     return item;
    //   });
    //   newState.vacations = updatedVacations;      
    //   break;

      case VacationsActionType.UpdateFollowers:
        // const updatedVacations = newState.vacations.map((item) => { 
        //   if(item.vacationId === action.payload.vacationId){
        //     return {...item, isFollowing: action.payload.isFollowing, followersCount: action.payload.followersCount};
        //   }
        // });
        // newState.vacations = updatedVacations;   
        const vacationIndex = newState.vacations.findIndex((v) => v.vacationId === action.payload.vacationId);
        newState.vacations[vacationIndex].isFollowing = action.payload.isFollowing;
        action.payload.isFollowing === 0 
          ? newState.vacations[vacationIndex].followersCount-- 
          : newState.vacations[vacationIndex].followersCount++
        break;
  }

  return newState;
}

export const vacationsStore = createStore(vacationsReducer);