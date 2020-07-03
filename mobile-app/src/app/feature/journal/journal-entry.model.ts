export interface JournalEntry {
  content: string;
  flags: {
    [key: string]: any;
  },
  folder: string;
  name: string;
  sort: number;
  _id: string;
}