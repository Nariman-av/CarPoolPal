import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home.js";
import Events from "./pages/Events.js";
import EventCreation from "./pages/EventCreation.js";
import { Routes, Route, Link } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import TripCreation from "./pages/TripCreation";
import LoginForm from "./components/LoginForm";
import Trips from "./components/Trips";
import { useSelector } from "react-redux";
import TripPanel from "./components/TripPanel";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {user ? (
          <>
            <Route path="/events">
              <Route index element={<Events />} />
              <Route path=":eventId/trips" element={<Trips />} />
              <Route
                path="/events/:eventId/trips/add"
                element={<TripCreation />}
              />
            </Route>
            <Route path="/events/:eventId/trips/:tripId" element={<TripPanel />} />
            {/* <Route path="/events/:id/trips" element={<Trips />} /> */}

            <Route path="/add" element={<EventCreation />} />
            <Route path="/TripCreation" element={<TripCreation />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
