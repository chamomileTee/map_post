import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import User from "./User";
import Group from "./Group";

const Router = () => {
  return <BrowserRouter>
    <Routes>
        <Route path = "/*" element={}>
            <Route path = "/Home" element={<Home/>}></Route>
            <Route path = "/list" element={<List/>}></Route>
            <Route path = "/user" element={<User/>}></Route>
            <Route path = "/group" element={<Group/>}></Route>
        </Route>
    </Routes>
  </BrowserRouter>
}

export default Router;