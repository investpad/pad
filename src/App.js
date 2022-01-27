import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavigationRoutes from "./components/NavigationRoutes";
import LayoutWithSidebar from "./components/layout/LayoutWithSidebar";

function App() {
  return (
    <BrowserRouter>
      <LayoutWithSidebar>
        <NavigationRoutes />
      </LayoutWithSidebar>
    </BrowserRouter>
  );
}

export default App;
