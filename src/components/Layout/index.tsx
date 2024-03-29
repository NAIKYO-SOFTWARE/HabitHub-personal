import { ReactNode, useEffect } from "react";
import Menu from "../Menu";

const Layout = (props: { children: ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full">
      <div className="h-full">{props.children}</div>
      <Menu />
    </div>
  );
};

export default Layout;
