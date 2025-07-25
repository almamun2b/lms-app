import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen w-full justify-between">
      <Header />
      <main className="container mx-auto px-4 py-5 w-full min-h-[calc(100vh-70px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
