import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/app-store";
import Layout from "../../../components/Layout";

const menu: { title: string; path: string; onClick?: () => void }[] = [
  { title: "Account", path: "/account" },
  { title: "Notifications", path: "/notification" },
  { title: "Help", path: "/help" },
  { title: "Storage and Data", path: "/strong-and-data" },
  { title: "Invite a friend", path: "/invite-a-friend" },
];

function Profile() {
  const navigate = useNavigate();
  const logout = useAppStore((s) => s.logout);
  const onLogout = () => {
    logout();
    console.log("ok");

    navigate("/login");
  };
  const isExits = menu.find((m) => m.path == "logout");
  !isExits && menu.push({ title: "Logout", onClick: onLogout, path: "logout" });

  return (
    <Layout>
      <div className="flex flex-col mx-auto h-full w-full font-bold bg-neutral-100 text-stone-900 text-opacity-80">
        <div className="flex flex-col pt-5 px-6 w-full h-full bg-fuchsia-200">
          <div className="self-center text-xs font-medium text-black">
            Profile
          </div>
          {menu.map((m, index) => (
            <div
              key={index}
              onClick={() => m.onClick?.() as any}
              className="flex gap-5 justify-between px-5 py-5 mt-1.5 whitespace-nowrap bg-white rounded-xl"
            >
              <div className="text-sm flex items-center">{m.title}</div>
              <div className="my-auto text-lg">&gt;</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
