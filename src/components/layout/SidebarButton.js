import { NavLink } from "react-router-dom";

const klass = "p-4 w-full text-left hover:bg-slate-200 focus:bg-slate-100";

export default function SidebarButton({ item, setShow }) {
  console.log(item);
  return (
    <NavLink to={item.path}>
      <button className={klass} onClick={() => setShow(false)}>
        <div className="flex items-center">
          <div>{item.icon}</div>
          <span className="ml-2">{item.name}</span>
        </div>
      </button>
    </NavLink>
  );
}
