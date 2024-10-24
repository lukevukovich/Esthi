import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Layouts and pages
import RootLayout from "./utils/RootLayout";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import "./App.css";

// Router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Chat />} />
      {/*<Route path="intake" element={<IntakeForm />} />
      <Route path="chat" element={<Chat />} />*/}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
