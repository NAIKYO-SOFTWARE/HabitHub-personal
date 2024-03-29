import { Task, useTaskStore } from "../../store/task-store";

interface Props {
  task: Task;
  isClose?: boolean;
}
function CardTask(props: Props) {
  const { task, isClose = false } = props;
  const removeTask = useTaskStore((s) => s.removeTask);

  return (
    <div
      className={`flex gap-5 justify-between items-start px-4 py-5 w-full text-black whitespace-nowrap rounded-xl bg-opacity-60 ${task.color}`}
    >
      <div className="flex gap-2">
        <div className="text-2xl tracking-tight leading-5">{task.icon}</div>
        <div className="my-auto text-sm">{task.label}</div>
      </div>
      {isClose && (
        <div
          className="shrink-0 w-6 h-6 rounded-full bg-zinc-300"
          onClick={() => removeTask(task.key as string)}
        />
      )}
    </div>
  );
}

export default CardTask;
