import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Verify } from "@/pages/Verify";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { IssueCertificate } from "@/pages/IssueCertificate";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/issue" element={<IssueCertificate />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "text-sm",
          duration: 4000,
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
