import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Router } from "./router/Router";
function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
