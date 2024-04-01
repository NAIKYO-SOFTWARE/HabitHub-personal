function DayToWeek() {
  const date = new Date();
  const startOfWeek = new Date(date);
  const endOfWeek = new Date();
  startOfWeek.setDate(date.getDate() - date.getDay());
  if (date.getMonth() > startOfWeek.getMonth()) {
    endOfWeek.setDate(startOfWeek.getDate() + 5);
    endOfWeek.setMonth(date.getMonth());
  } else {
    endOfWeek.setDate(startOfWeek.getDate() + 5);
  }
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendar = [];
  while (startOfWeek <= endOfWeek) {
    calendar.push(new Date(startOfWeek));
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  const currentDay = new Date().getDate();

  return (
    <div className="flex flex-col px-6 pt-8 pb-5 w-full whitespace-nowrap bg-fuchsia-200 bg-opacity-60">
      <div className="self-center text-base text-black">Today</div>
      <div className="flex gap-2 mt-2.5 text-xs text-stone-900 text-opacity-80">
        {calendar.map((day, index) => (
          <div
            key={index}
            className={
              index === currentDay
                ? "flex flex-col flex-1 items-center px-2 py-2.5 font-bold rounded-xl bg-purple-500 bg-opacity-80"
                : "flex flex-col flex-1 items-center px-2 py-2.5 rounded-xl bg-purple-300 bg-opacity-60"
            }
          >
            <span className="text-center">{daysOfWeek[index]}</span>
            <div className="flex justify-center items-center px-2.5 mt-3 w-8 h-8 rounded-full bg-neutral-100">
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayToWeek;
