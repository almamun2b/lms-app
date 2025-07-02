import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { removeUser, selectUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { IUser } from "@/types/tasks";
import { Trash2 } from "lucide-react";

interface IUserProps {
  user: IUser;
}

const TaskCard = ({ user }: IUserProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUser);

  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className={cn("text-base font-medium", {})}>{user.name}</h1>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="link"
            className="p-0 text-red-500"
            onClick={() => {
              dispatch(removeUser(user.id));
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
