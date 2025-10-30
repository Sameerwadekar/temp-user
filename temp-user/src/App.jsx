
import Home from "./components/ui/Home";
import { Navbar04 } from "./components/ui/Navbar";

function App() {
  return (
    <>
    <div className="flex  flex-col items-center border">
      <Navbar04/>
    </div>
    <div className="w-full">
      <Home/>
    </div>
  </>
  );
}

export default App;
