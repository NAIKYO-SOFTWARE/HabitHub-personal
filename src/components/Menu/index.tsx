import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="flex rounded-[30px_30px_0_0] shadow items-center px-14 py-2 text-2xl tracking-tight leading-5 whitespace-nowrap bg-neutral-100 text-black text-opacity-80 justify-between w-full fixed bottom-[0%]">
      <div className="flex gap-5 justify-between max-w-full w-full">
        <div className="flex flex-col justify-center">
          <Link
            to="/calendal"
            className="flex justify-center items-center px-4 w-14 h-14 rounded-full bg-neutral-100"
          >
            <img src="/icons/calendar.svg" />
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <Link
            to="/"
            className="flex justify-center items-center px-4 w-14 h-14 rounded-full bg-neutral-100"
          >
            <img src="/icons/checklist.svg" />
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <Link
            to="/profile"
            className="flex justify-center items-center px-4 w-14 h-14 rounded-full bg-neutral-100"
          >
            <img src="/icons/person.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
