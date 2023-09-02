import Routespath from "./routes/Routespath";
import { StateContext } from "./config/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <StateContext>
        <Toaster />
        <Routespath />
      </StateContext>
    </>
  );
}

export default App;
