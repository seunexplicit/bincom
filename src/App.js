import SideBar from "./components/sidebar.component";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PollingResult from "./pages/polling-result.page";
import SubmitResult from "./pages/store-result.page";
import LGAResult from "./pages/lga-result.page";
function App() {
  /*const location = useLocation();
  console.log(location);*/
  return (
    <div className="App flex-row w-100">
      <Router>
        <div className="side-bar">
          <SideBar></SideBar>
        </div>
        <div className="content-bar">
          <Switch>
            <Route exact={true} path="/">
              <PollingResult className="w-100" />
            </Route>
            <Route path="/post-result">
              <SubmitResult className="w-100" />
            </Route>
            <Route path="/lga">
              <LGAResult className="w-100" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
