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

export interface JournalEntry {
  content: string;
  flags: {
    [key: string]: any;
  },
  folder: string;
  name: string;
  sort: number;
  _id: string;
  permission: {
    default: EntityPermissions;
    [key: string]: EntityPermissions;
  }
}

/**
 * Permissions given to Entitys to view certain things.
 */
export const enum EntityPermissions {
  NONE = 0,
  LIMITED = 1,
  OBSERVER = 2,
  OWNER = 3
}
