// Example types - add your shared types here
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
}


