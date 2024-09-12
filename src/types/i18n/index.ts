import { ActorRoleType } from "..";

export const actorRoleType = (v: ActorRoleType) => {
  switch (v) {
    case ActorRoleType.USER:
      return "User";
    case ActorRoleType.ADMINISTRATOR:
      return "Admin";
    case ActorRoleType.INTERNAL:
      return "Staff";
    default:
      return "Anonymous";
  }
};
