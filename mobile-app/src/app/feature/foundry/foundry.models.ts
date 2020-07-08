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
  macros?: Macro[];
}

export interface Macro {
  slot: number;
  macro: {
    _id: string;
    name: string;
    permission: {

    };
    type: 'script' | 'chat';
    sort: number;
    scope: string;
    command: string;
    author: string;
    img: string;
    actorIds: any[]
  }
}

export enum UserRoles {
  NONE,
  PLAYER,
  TRUSTED,
  ASSISTANT,
  GAMEMASTER
}
