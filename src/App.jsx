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
import ClientIntakeForm from "./pages/ClientIntakeForm/ClientIntakeForm";
import TreatmentRecord from "./pages/TreatmentRecord/TreatmentRecord";
import Profile from "./pages/Profile/Profile";
import "./App.css";

// Router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="client-intake-form" element={<ClientIntakeForm />} />
      <Route path="treatment-record" element={<TreatmentRecord />} />
      <Route path="ai-chat" element={<Chat />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
