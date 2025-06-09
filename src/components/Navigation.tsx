
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Menu, X, Sun, Moon, ShoppingBag } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Gallery", path: "/student-gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="group relative flex-shrink-0"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-foreground hover:text-primary transition-colors duration-300 tracking-wider">
                <span className="relative hover-brush-stroke">
                  A
                  <span className="text-primary">R</span>
                  T
                  <span className="text-primary">E</span>
                  Z
                  <span className="text-primary">A</span>
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-sans tracking-[0.2em] mt-0.5 sm:mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                by upasna
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover-brush-stroke ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Cart Icon */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Link to="/cart">
                  <ShoppingBag className="h-4 w-4" />
                </Link>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-foreground hover:text-primary hover:bg-accent"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-all duration-300 rounded-md ${
                    location.pathname === item.path
                      ? "text-primary bg-accent"
                      : "text-foreground hover:text-primary hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
