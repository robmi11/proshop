import Footer from "./components/Footer";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";

import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  );
};
export default App;
