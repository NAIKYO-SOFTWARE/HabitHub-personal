import * as React from "react";
import { Link } from "react-router-dom";

const Intro: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20 mx-auto w-full text-black shadow-sm bg-neutral-100 h-full">
      <header className="flex flex-col w-full bg-neutral-100">
        <h1 className="self-start px-10 mt-10 text-6xl">
          Do your tasks quickly and easy
        </h1>
        <p className="self-start px-10 mt-5 text-lg font-[275]">
          Your tasks, your rules, our support.
        </p>
        <div className="flex flex-col items-center mt-24 justify-center">
          <Link
            to="/login"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white  focus:ring-4 focus:outline-none focus:ring-pink-200 "
          >
            <span className="relative text-2xl px-16 shadow py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </Link>
          <a
            href="#"
            className="self-center text-xs font-light underline text-black text-opacity-60"
          >
            Create an account
          </a>
        </div>
        <div className="flex gap-4 self-center mt-8 text-sm font-black tracking-normal leading-4 text-center whitespace-nowrap text-black text-opacity-60">
          <div className="shrink-0 my-auto h-px border border-solid bg-black bg-opacity-60 border-black border-opacity-60 w-[132px]" />
          <div className="flex-auto">OR</div>
          <div className="shrink-0 my-auto h-px border border-solid bg-black bg-opacity-60 border-black border-opacity-60 w-[132px]" />
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/173eab575fbcc6be6317a6ed10e467560444c1881558dc293fb1441b764d6f72?apiKey=a2cc08c2158b472ea9e74eac6e01b6cc&"
          alt=""
          className="self-center mt-2.5 max-w-full aspect-[3.85] w-[184px]"
        />
      </header>
    </div>
  );
};

export default Intro;
