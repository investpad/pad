import { Routes, Route } from "react-router-dom";
import CreateSale from "./pages/sales/CreateSale";
import SaleList from "./pages/sales/SaleList";
import Home from "./pages/Home";
import { Fragment } from "react";

import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/outline";

const iconKlass = "w-5 h-5";

export const navigationList = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    icon: <HomeIcon className={iconKlass} />,
  },
  {
    name: "Sales",
    icon: <ShoppingBagIcon className={iconKlass} />,
    items: [
      {
        name: "Create sale",
        path: "/sales/create",
        element: <CreateSale />,
      },
      {
        name: "Sales List",
        path: "/sales",
        element: <SaleList />,
      },
    ],
  },
];

export default function NavigationRoutes() {
  return (
    <Routes>
      {navigationList.map((item, key) => {
        if (item.hasOwnProperty("items")) {
          return (
            <Fragment key={key}>
              {item.items.map((nested, nkey) => (
                <Route key={nkey} path={nested.path} element={nested.element} />
              ))}
            </Fragment>
          );
        } else {
          return <Route key={key} path={item.path} element={item.element} />;
        }
      })}
    </Routes>
  );
}
