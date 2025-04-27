import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import {
  Confirm,
  FlightExplore,
  Flights,
  Hotels,
  Packages,
  PassengerInfo,
  Payment,
  SeatSelect,
} from "./pages";
import CheckoutSuccess from "./components/CheckoutSuccess";
import SearchFlight from "./components/SearchFlight";
import CheckoutCancel from "./components/CheckoutCancel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/explore" element={<FlightExplore />} />
          <Route path="/passenger-info" element={<PassengerInfo />} />
          <Route path="/seat-selection" element={<SeatSelect />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />{" "}
          <Route path="/search-flight" element={<SearchFlight />} />
          <Route path="/checkout-cancel" element={<CheckoutCancel />} />
          {/* Thêm route */}
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default App;
