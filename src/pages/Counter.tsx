import { Button } from "@/components/ui/button";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  selectCounter,
} from "@/redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Counter = () => {
  const { count } = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-3 flex-col max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Counter</h1>
      <p className="text-2xl">Count: {count}</p>

      <div className="flex gap-3">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </Button>
        <Button onClick={() => dispatch(reset())}>Reset</Button>
      </div>
    </div>
  );
};

export default Counter;
