import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  deleteTask,
  toggleCompleteTask,
} from "@/redux/features/task/taskSlice";
import { selectUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ITask } from "@/types/tasks";
import { Trash2 } from "lucide-react";

interface ITaskProps {
  task: ITask;
}

const TaskCard = ({ task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUser);

  const assignedUser = users.find((user) => user.id === task.assignTo);

  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={cn("size-3 rounded-full", {
              "bg-green-500": task.priority === "low",
              "bg-yellow-500": task.priority === "medium",
              "bg-red-500": task.priority === "high",
            })}
          ></div>
          <h1
            className={cn("text-base font-medium", {
              "line-through": task.isCompleted,
            })}
          >
            {task.title}
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="link"
            className="p-0 text-red-500"
            onClick={() => {
              dispatch(deleteTask(task.id));
            }}
          >
            <Trash2 />
          </Button>
          <Checkbox
            checked={task.isCompleted}
            onClick={() => dispatch(toggleCompleteTask(task.id))}
          />
        </div>
      </div>
      <p>Assigned to {assignedUser?.name || "Unassigned"}</p>
      <p className="mt-5">{task.description}</p>
    </div>
  );
};

export default TaskCard;
