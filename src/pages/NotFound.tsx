
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container py-16 px-4 flex flex-col items-center justify-center text-center animate-fade-in">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
