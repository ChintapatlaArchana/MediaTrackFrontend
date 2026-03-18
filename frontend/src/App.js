import { Routes, Route } from "react-router-dom";

import PlatformOperation from "./pages/operator/PlatformOperation";

function App() {
  return (
    <Routes>
      <Route
        path="/operator"
        element={
          
            <PlatformOperation />
         
        }
      />
    </Routes>
  );
}

export default App;
