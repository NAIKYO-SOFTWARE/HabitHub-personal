import { Link } from "react-router-dom";
import { Task, useTaskStore } from "../../../store/task-store";
import CardTask from "../../../components/CardTask";
import Layout from "../../../components/Layout";
import { Fragment } from "react/jsx-runtime";

const suggestionItems = [
  {
    icon: "🧠",
    category: "Learn and study more",
    description: "Stay hungry for knowledge",

    subcategories: [
      {
        label: "Read",
        icon: "📖",
        color: "bg-yellow-200",
      },
      {
        label: "Study",
        icon: "✏️",
        color: "bg-green-200",
      },
    ],
  },
  {
    icon: "🏋️‍♂️",
    category: "Exercise",
    description: "Become your best version",
    subcategories: [
      {
        label: "Running",
        icon: "🏃‍️",
        color: "bg-blue-200",
      },
      {
        label: "Cycling",
        icon: "🚴‍",
        color: "bg-orange-200",
      },
    ],
  },
  {
    icon: "🧹",
    category: "Clean and Organize",
    description: "Get your life together",
    subcategories: [
      {
        label: "Mop the house",
        icon: "🪣",
        color: "bg-teal-200",
      },
      {
        label: "Clean the bathroom",
        icon: "🚽",
        color: "bg-pink-200",
      },
    ],
  },
];

function Suggestion() {
  const addNewTask = useTaskStore((s) => s.addNewTask);

  return (
    <Layout>
      <div className="flex flex-col px-5 py-10 mx-auto w-full text-black bg-neutral-100 h-full">
        <div className="self-center text-xs font-medium">Suggestions</div>
        {suggestionItems.map((item) => {
          return (
            <>
              <div className="flex gap-5 justify-between mt-11">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-auto text-base font-medium">
                      {item.category}
                    </div>
                  </div>
                  <div className="text-xs">{item.description}</div>
                </div>
                <div className="self-start text-xs font-bold">See all &gt;</div>
              </div>

              {item.subcategories.map((subCate) => {
                return (
                  <Fragment key={subCate.label}>
                    <div className="flex gap-2.5 mt-4 whitespace-nowrap">
                      <CardTask task={subCate as Task} />
                      <div
                        onClick={() =>
                          addNewTask({
                            ...subCate,
                            description: "",
                            tags: [],
                            repeat: true,
                            createdAt: new Date(),
                          })
                        }
                        className="flex flex-col justify-center items-center my-auto w-8 h-8 text-2xl font-medium rounded-full bg-zinc-300"
                      >
                        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-zinc-300">
                          +
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </>
          );
        })}

        <Link
          to="/new-task"
          className="fixed bottom-[12%] -translate-x-2/4 left-2/4 flex shadow-md mt-4 w-30 m-auto justify-center px-8 py-5 text-base font-medium text-black rounded-xl bg-neutral-100"
        >
          Add more
        </Link>
      </div>
    </Layout>
  );
}

export default Suggestion;
