import {EventEntity} from "./EventEntity.model";


export interface Planning {
  planningId?: string;
  planningTitle: string;
  planningDescription: string;
  planningCreatedAt:string;
  eventsByPlanningId:EventEntity[],
  userId:string;
}
