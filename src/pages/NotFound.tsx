import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-luxury-cream">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-heading font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="btn-luxury inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
