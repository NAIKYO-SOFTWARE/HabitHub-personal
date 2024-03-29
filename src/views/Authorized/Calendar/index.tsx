import { Link } from "react-router-dom";
import CardTask from "../../../components/CardTask";
import Layout from "../../../components/Layout";
import { useTaskStore } from "../../../store/task-store";

function Calendar() {
  const currentDate = new Date();
  const tasks = useTaskStore((s) => s.tasks);
  function getMonthDays(month: number, year: number) {
    switch (month) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
      case 1:
        return isLeapYear(year) ? 29 : 28;
      case 5:
      case 8:
      case 10:
        return 30;
    }
  }

  function isLeapYear(year: number) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  const renderDays = () => {
    const daysInMonth = getMonthDays(
      currentDate.getMonth(),
      currentDate.getFullYear()
    ) as number;
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<></>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay =
        currentDate.getDate() === i &&
        currentDate.getMonth() === new Date().getMonth();
      const dayClass = `flex flex-col justify-center text-stone-900 text-opacity-50 ${
        isCurrentDay ? "bg-green-500 rounded-full text-white" : ""
      }`;

      days.push(
        <div key={i} className={dayClass}>
          <div className="flex justify-center items-center px-2.5 w-8 h-8">
            {i}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <Layout>
      <div className="flex flex-col mx-auto w-full bg-neutral-100 h-full">
        <div className="flex flex-col px-4 pt-6 pb-20 w-full bg-blue-200 h-full">
          <div className="self-center text-2xl font-medium text-black">
            Calendar
          </div>
          <div className="flex flex-col justify-center px-4 py-7 mt-7 font-medium whitespace-nowrap bg-white rounded-xl shadow-sm text-stone-900 text-opacity-80">
            <div className="flex flex-col">
              <div className="flex gap-5 justify-between self-end py-1 max-w-full text-black w-[220px]">
                <div className="text-base">
                  {currentDate.toLocaleDateString("en-US", { month: "long" })}
                </div>
                <div className="my-auto text-xs">
                  {currentDate.getFullYear()}
                </div>
              </div>
              <div className="flex gap-5 mt-5 text-xs font-light text-black">
                <div className="px-2.5 w-8 h-8">Mon</div>
                <div className="px-2.5 w-8 h-8">Tue</div>
                <div className="px-2.5 w-8 h-8">Wed</div>
                <div className="px-2.5 w-8 h-8">Thu</div>
                <div className="px-2.5 w-8 h-8">Fri</div>
                <div className="px-2.5 w-8 h-8">Sat</div>
                <div className="px-2.5 w-8 h-8">Sun</div>
              </div>
              <div className="flex gap-5 justify-start mt-3.5 text-base flex-wrap ">
                {renderDays()}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 mb-2">
            {tasks.map((task) => {
              const formattedTime = getFormattedTime(new Date(task.createdAt));
              return (
                <div className="text-sm text-stone-900 text-opacity-80 mt-2">
                  {formattedTime}
                  <CardTask task={task} isClose />
                </div>
              );
            })}
          </div>
          <Link
            to="/suggestion"
            className="flex shadow fixed bottom-[12%] right-[5%] gap-0 justify-center items-center self-start w-14 h-14 rounded-full bg-neutral-100"
          >
            <div className="z-10 flex justify-center items-center grow self-end h-full text-2xl font-medium text-black">
              +
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

const getFormattedTime = (createdAt: any) => {
  const now = new Date() as any;
  const diffDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return "This week";
  } else {
    return createdAt.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
};

export default Calendar;
