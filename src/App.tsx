import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Router } from "./router/Router";
import { adModalState } from "recoil/modalState";
import { AdsenseModal } from "components/modal/adsense/AdsenseModal";
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
