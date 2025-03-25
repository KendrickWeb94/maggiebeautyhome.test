
import { BookMakeUp } from "./routes/bookmakeup";
import Checkout  from "./routes/checkout";
import { Contact } from "./routes/contact";
import { Home } from "./routes/home";
import { Login } from "./routes/login";
import { NotFound } from "./routes/not-found";
import ProductDetails from "./routes/product-details";
import { Profile } from "./routes/profile";
import { SignUp } from "./routes/signup";

import { Store } from "./routes/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <section className="">
      <main className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-make-up-session" element={<BookMakeUp />} />
          <Route path="/products" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/welcome-back" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Catch-all route for 404 */}
        </Routes>
      </Router>
    </main>
    </section>
  );
}

export default App;
