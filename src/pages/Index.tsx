import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { TradingDashboard } from "@/components/dashboard/TradingDashboard";

const Index = () => {
  // Simulate authentication state - in real app this would come from Supabase
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // For demo purposes, add a way to toggle between login and dashboard
  if (typeof window !== 'undefined') {
    (window as any).toggleAuth = () => setIsAuthenticated(!isAuthenticated);
  }

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? <TradingDashboard /> : <LoginForm />}
      
      {/* Demo toggle button - remove in production */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setIsAuthenticated(!isAuthenticated)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          {isAuthenticated ? "Logout (Demo)" : "Login (Demo)"}
        </button>
      </div>
    </div>
  );
};

export default Index;
