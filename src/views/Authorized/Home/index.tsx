import { Link } from "react-router-dom";
import DayToWeek from "./components/DayToWeek";
import { useTaskStore } from "../../../store/task-store";
import CardTask from "../../../components/CardTask";
import Layout from "../../../components/Layout";

function Home() {
  const tasks = useTaskStore((s) => s.tasks);

  return (
    <Layout>
      <div className="flex flex-col mx-auto w-full font-medium bg-neutral-100 h-full">
        <DayToWeek />
        <div className="flex flex-col px-8 mt-4 w-full text-black h-full">
          <div className="flex overflow-x-autoflex-col justify-center items-center w-full text-xs text-stone-900 text-opacity-80">
            <div className="flex gap-2">
              <div className="flex flex-col justify-center font-bold whitespace-nowrap">
                <div className="justify-center px-7 py-2 rounded-xl border border-solid bg-purple-500 bg-opacity-80 border-zinc-300">
                  All
                </div>
              </div>
              <div className="flex flex-col justify-center text-black text-opacity-30">
                <div className="justify-center px-1.5 py-2 rounded-xl border border-solid bg-neutral-100 border-zinc-300">
                  Daily Routine
                </div>
              </div>
              <div className="flex flex-col justify-center text-black text-opacity-30">
                <div className="justify-center p-2 rounded-xl border border-solid bg-neutral-100 border-zinc-300">
                  Study Routine
                </div>
              </div>
            </div>
          </div>
          {tasks.length ? (
            <>
              <div className="flex flex-col gap-3 mt-4">
                {tasks.map((task) => {
                  return <CardTask task={task} isClose />;
                })}
              </div>
            </>
          ) : (
            <>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/767b6a3625eb905041a378bd304c144e3de4ae6dfc07d18dd359dc0beedaffe9?apiKey=a2cc08c2158b472ea9e74eac6e01b6cc&"
                className="mt-28 max-w-full aspect-[1.03] w-full"
              />
              <div className="self-center mt-8 ml-6 text-base">
                Nothing here yet...
              </div>
            </>
          )}
          <Link
            to="/suggestion"
            className=" fixed bottom-[15%] shadow flex justify-center items-center self-end px-6 mt-12 w-14 h-14 text-2xl whitespace-nowrap rounded-full border-2 bg-neutral-100"
          >
            +
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
