import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Set1 from "./routes/Set1";
import Set2 from "./routes/Set2";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Set1 />} />
          <Route exact path="/set2" element={<Set2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
