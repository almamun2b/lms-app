interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignTo: string | null;
}

interface TaskState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

interface IUser {
  id: string;
  name: string;
}

interface UserState {
  users: IUser[];
}

export type { ITask, IUser, TaskState, UserState };
