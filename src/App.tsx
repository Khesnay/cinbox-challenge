//Components
import { Header } from "./components/Header/Header";

//Pages

import { Home } from "./pages/Home/Home";
import { FilmDetail } from "./pages/FilmDetail/FilmDetail";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
//Redux
import { store } from "./store";

//Navigation
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";

//Styles
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/films/:id" element={<FilmDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<NotFoundPage error={"404"} />} />
            </Routes>
          </main>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
