function DayToWeek() {
  const now = Date.now();
  const currentDate = new Date(now);
  const dayOfWeekNumber = currentDate.getDay();

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const dateOffset = (dayOfWeekNumber - i + 7) % 7;
    const dayOfMonth = currentDate.getDate() - dateOffset;

    const daysInMonth = currentDate.getDate();
    const adjustedDayOfMonth =
      ((dayOfMonth + daysInMonth - 1) % daysInMonth) + 1;

    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      dayOfWeekNumber % 7
    ];
    weekDays.push({
      day: dayName,
      date: adjustedDayOfMonth,
      index: (dayOfWeekNumber - i + 7) % 7,
    });
  }

  return (
    <div className="flex flex-col px-6 pt-8 pb-5 w-full whitespace-nowrap bg-fuchsia-200 bg-opacity-60">
      <div className="self-center text-base text-black">Today</div>
      <div className="flex gap-2 mt-2.5 text-xs text-stone-900 text-opacity-80">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={
              index === dayOfWeekNumber
                ? "flex flex-col flex-1 items-center px-2 py-2.5 font-bold rounded-xl bg-purple-500 bg-opacity-80"
                : "flex flex-col flex-1 items-center px-2 py-2.5 rounded-xl bg-purple-300 bg-opacity-60"
            }
          >
            <span className="text-center">{day.day}</span>
            <div className="flex justify-center items-center px-2.5 mt-3 w-8 h-8 rounded-full bg-neutral-100">
              {day.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayToWeek;
