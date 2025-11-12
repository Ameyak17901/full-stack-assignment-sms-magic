import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import Navbar from "./components/navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/components/dashboard/dashboard";
import EventDetails from "./components/event-details";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col min-h-screen space-x-2 w-full gap-y-3">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path={`/event/:id`} element={<EventDetails />} />
          </Routes>
        </BrowserRouter>
      </main>
    </SidebarProvider>
  );
}

export default App;
