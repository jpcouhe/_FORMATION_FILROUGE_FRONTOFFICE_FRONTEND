import {Planning} from "./Planning.model";
import {Permission} from "./Permission.model";

export interface Interaction {
  planningsByPlanningId: Planning,
  permissionsByPermissionId: Permission
}
