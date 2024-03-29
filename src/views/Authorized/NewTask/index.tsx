import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import Layout from "../../../components/Layout";
import { create } from "zustand";
import { Task, useTaskStore } from "../../../store/task-store";
import debounce from "debounce";
import { useNavigate } from "react-router-dom";

const CARD_COLORS = [
  "bg-emerald-200",
  "bg-fuchsia-700",
  "bg-orange-200",
  "bg-teal-200",
  "bg-red-600",
  "bg-yellow-100",
  "bg-indigo-500",
  "bg-fuchsia-500",
];

const REPEAT_CYCLES = ["Daily", "Weekly", "Monthly"];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initNewTask: Task = {
  icon: "⭐",
  label: "",
  description: "",
  color: CARD_COLORS[0],
  tags: [],
  cycle: REPEAT_CYCLES[1],
  repeat: true,
  createdAt: new Date(),
};

interface ISelectStore {
  newTask: Task;
  onSetTask: (data: any) => void;
  onClear: () => void;
}

const useNewTaskStore = create<ISelectStore>((set, get) => {
  return {
    newTask: initNewTask,
    onSetTask: (data: Record<string, string>) => {
      set({
        newTask: {
          ...get().newTask,
          ...data,
        },
      });
    },
    onClear: () => {
      set({
        newTask: initNewTask,
      });
    },
  };
});

function ColorPicker({ colors }: { colors: string[] }) {
  const { color } = useNewTaskStore((s) => s.newTask);
  const onSetTask = useNewTaskStore((s) => s.onSetTask);

  return (
    <div className="flex gap-4 pr-7 mt-5">
      {colors.map((c, index) => (
        <div
          key={index}
          className={`shrink-0 w-8 h-8 rounded-full border-solid cursor-pointer ${c} ${
            c === color && "border-[3px] border-white"
          }`}
          onClick={() => onSetTask({ color: c })}
        />
      ))}
    </div>
  );
}

function NewTask() {
  const navigate = useNavigate();
  const newTask = useNewTaskStore((s) => s.newTask);
  const onClear = useNewTaskStore((s) => s.onClear);
  const addNewTask = useTaskStore((s) => s.addNewTask);

  const addNewTaskCustom = () => {
    addNewTask(newTask);
    onClear();
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col mx-auto w-full bg-neutral-100 h-full">
        <div className="px-4 flex flex-col pt-8 pb-20 w-full bg-blue-200 h-full">
          <TitleSection />
          <DetailsSection />
          <RepeatSection />
          <TagsSection />
          <button
            onClick={addNewTaskCustom}
            className="fixed bottom-[12%] -translate-x-2/4 left-2/4 shadow  justify-center items-center px-14 py-4 text-base font-bold whitespace-nowrap rounded-xl bg-neutral-100 max-w-[197px] text-stone-900 text-opacity-80"
          >
            Add
          </button>
        </div>
      </div>
    </Layout>
  );
}
function TitleSection() {
  const { icon } = useNewTaskStore((s) => s.newTask);
  const onSetTask = useNewTaskStore((s) => s.onSetTask);
  const [selectedEmoji, setSelectedEmoji] = useState(icon);

  const handleEmojiChange = (newEmoji: any) => {
    setSelectedEmoji(newEmoji?.emoji ?? "");
    if (newEmoji?.emoji) onSetTask({ icon: newEmoji?.emoji });
  };

  return (
    <div className="flex flex-col gap-5 justify-center self-end w-full">
      <div
        className="flex flex-col font-medium text-black cursor-pointer"
        onClick={() => handleEmojiChange("")}
      >
        <div className="self-center text-6xl">{selectedEmoji}</div>
        <div className="mt-2 text-2xl text-center">New Task</div>
        <div className="mt-2 text-xs text-center text-stone-900 text-opacity-80">
          Click to change the emoji
        </div>
      </div>
      {selectedEmoji === "" && (
        <EmojiPicker
          onEmojiClick={handleEmojiChange}
          className="mx-auto my-0"
        />
      )}
    </div>
  );
}

function DetailsSection() {
  const onSetTask = useNewTaskStore((s) => s.onSetTask);
  return (
    <div className="flex flex-col mt-8 w-full">
      <input
        placeholder="Name your new task"
        onChange={(e) =>
          debounce(() => onSetTask({ label: e.target.value }), 300)()
        }
        className="justify-center items-start px-5 py-6 text-sm bg-white rounded-xl text-stone-900 text-opacity-80"
      />
      <input
        placeholder="Describe it"
        onChange={(e) =>
          debounce(() => onSetTask({ description: e.target.value }), 300)()
        }
        className="justify-center items-start px-5 py-6 mt-4 text-sm bg-white rounded-xl text-stone-900 text-opacity-80"
      />
      <div className="self-start mt-9 ml-5 text-sm font-bold text-stone-900 text-opacity-80">
        Card Color
      </div>
      <ColorPicker colors={CARD_COLORS} />
    </div>
  );
}

function CyclePicker({ cycles }: { cycles: string[] }) {
  const { cycle } = useNewTaskStore((s) => s.newTask);
  const onSetTask = useNewTaskStore((s) => s.onSetTask);

  return (
    <div className="flex gap-5 justify-between items-center  mt-3.5 whitespace-nowrap bg-gray-200 rounded-2xl">
      {cycles.map((c) => (
        <div
          key={c}
          className={`self-stretch mx-auto py-2 text-center grow cursor-pointer ${
            cycle === c && "bg-orange-200 font-medium rounded-2xl  "
          }`}
          onClick={() => {
            onSetTask({ cycle: c });
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
}

function WeeklyPicker({ days }: { days: string[] }) {
  const [selectedDays, setSelectedDays] = useState(
    Array(days.length).fill(false)
  );

  const handleDayClick = (index: number) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  return (
    <div className="flex gap-4 mt-4 text-xs font-light text-black whitespace-nowrap">
      {days.map((day, index) => (
        <div
          key={index}
          className={`flex justify-center items-center w-9 h-8 bg-gray-200 rounded-full cursor-pointer ${
            selectedDays[index] && "bg-orange-200"
          }`}
          onClick={() => handleDayClick(index)}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

function TagList() {
  const { tags } = useNewTaskStore((s) => s.newTask);
  const onSetTask = useNewTaskStore((s) => s.onSetTask);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onSetTask({ tags: [...tags, tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    onSetTask({ tags: tags.filter((t) => t !== tag) });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div
          key={tag}
          className="px-4 py-3 mt-2  flex items-center font-medium bg-sky-200 rounded-xl cursor-pointer text-sm"
          onClick={() => handleRemoveTag(tag)}
        >
          {tag}
        </div>
      ))}
      <div
        className="px-4 py-3 mt-2 text-sm font-medium border-dashed border-2 border-sky-200 rounded-xl cursor-pointer"
        onClick={() => handleAddTag("New Tag")}
      >
        + Add Tag
      </div>
    </div>
  );
}

function RepeatSection() {
  const { cycle } = useNewTaskStore((s) => s.newTask);

  return (
    <div className="flex flex-col px-4 mt-8 w-full text-sm bg-white rounded-xl text-stone-900 text-opacity-80">
      <div className="mt-2 text-sm font-bold text-stone-900 text-opacity-80">
        Repeat
      </div>
      <div className="flex flex-col px-5 py-6 pt-2 w-full">
        <div>Set a cycle for your task</div>
        <CyclePicker cycles={REPEAT_CYCLES} />
        {cycle === "Weekly" && <WeeklyPicker days={DAYS_OF_WEEK} />}
      </div>
    </div>
  );
}

function TagsSection() {
  return (
    <div className="flex gap-2 py-5 pl-5 bg-white rounded-xl text-stone-900 text-opacity-80 mt-8">
      <div className="flex flex-col">
        <div className="text-sm">Set a tag for your task</div>
        <TagList />
      </div>
    </div>
  );
}

export default NewTask;
