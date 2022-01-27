import { useState } from "react";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { classNames } from "../../utilities";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

const klass = "p-4 w-full text-left hover:bg-slate-200 focus:bg-slate-100";
const nestedKlass = classNames(klass, "bg-slate-50");

function DropdownTransition({ children, show }) {
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
}

function NestedSidebarNavItem({ item, setSidebarShow }) {
  return (
    <NavLink to={item.path}>
      <button className={nestedKlass} onClick={() => setSidebarShow(false)}>
        <div className="flex items-center">
          <div className="w-5"></div>
          <span className="ml-2">{item.name}</span>
        </div>
      </button>
    </NavLink>
  );
}

export default function Dropdown({ item, setSidebarShow }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setShow(!show)} className={klass}>
        <div className="flex items-center">
          <div>{item.icon}</div>
          <div className="flex justify-between items-center w-full">
            <span className="ml-2">{item.name}</span>
            {show ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </div>
        </div>
      </button>
      <DropdownTransition show={show}>
        <div className="w-full">
          {item.items.map((nested, key) => (
            <NestedSidebarNavItem key={key} item={nested} setSidebarShow={setSidebarShow} />
          ))}
        </div>
      </DropdownTransition>
    </div>
  );
}
