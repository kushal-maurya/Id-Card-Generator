import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Browser } from "./constants";
import { Dashboard, Home, Http404 } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Browser.ROOT} element={<Home />}></Route>
        <Route path={Browser.DASHBOARD} element={<Dashboard />}></Route>
        <Route path={Browser.HTTP_404} element={<Http404 />}></Route>
        <Route path={Browser.ASTERICK} element={<Http404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
