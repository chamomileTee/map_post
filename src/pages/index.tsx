import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import MemoDetail from "./List/MemoDetail";
import User from "./User";
import Group from "./Group";
import SignUp from "./SignUp";
import Login from "./Login";
import MainLayout from "../layout/MainLayout";
import NotFound from "./NotFound";
import ProtectedRoute from '../components/ProtectedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/Home" replace />} />
            <Route path="Home" element={<Home />} />
            <Route path="list" element={<List />} />
            <Route path="list/:id" element={<MemoDetail />} />
            <Route path="user" element={<User />} />
            <Route path="group" element={<Group />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;