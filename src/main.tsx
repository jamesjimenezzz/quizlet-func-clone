import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Form from "./pages/Form.tsx";
import Home from "./pages/Home.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import QuizDetail from "./components/QuizDetail.tsx";
import QuizFormDetail from "./components/QuizFormDetail.tsx";
import Library from "./pages/Library.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/library" element={<Library />} />
            <Route path="/quiz/:id" element={<QuizDetail />} />
            <Route path="/form/:id" element={<QuizFormDetail />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
