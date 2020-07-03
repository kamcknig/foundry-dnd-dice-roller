export interface User {
  active: boolean;
  color: string;
  flags: any;
  hotbar: any;
  name: string;
  permission: any;
  role: number;
  viewedScene: any;
  _id: string;
}

export enum UserRoles {
  NONE,
  PLAYER,
  TRUSTED,
  ASSISTANT,
  GAMEMASTER
}
