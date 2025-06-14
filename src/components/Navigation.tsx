
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Sun, Moon, ShoppingBag, User, LogOut } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Classes", path: "/art-classes" },
    { name: "Gallery", path: "/student-gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Artistic Logo */}
            <Link 
              to="/" 
              className="group relative flex-shrink-0 mr-4"
            >
              <div className="relative">
                {/* Main logo with artistic styling */}
                <div className="text-2xl sm:text-3xl font-serif font-bold tracking-wider transition-all duration-500 group-hover:scale-105">
                  <span className="relative inline-block">
                    {/* Letter A with paint brush stroke */}
                    <span className="relative text-arteza-terracotta group-hover:text-arteza-rust transition-colors duration-300">
                      A
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-arteza-sage rounded-full opacity-70 animate-pulse"></span>
                    </span>
                    
                    {/* Letter R with palette dot */}
                    <span className="relative text-arteza-sage group-hover:text-arteza-moss transition-colors duration-300 mx-0.5">
                      R
                      <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-arteza-copper rounded-full"></span>
                    </span>
                    
                    {/* Letter T with brush stroke underneath */}
                    <span className="relative text-arteza-clay group-hover:text-arteza-charcoal transition-colors duration-300">
                      T
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-arteza-terracotta to-arteza-sage transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                    </span>
                    
                    {/* Letter E with artistic flourish */}
                    <span className="relative text-arteza-rust group-hover:text-arteza-terracotta transition-colors duration-300 mx-0.5">
                      E
                      <span className="absolute -top-0.5 left-1/2 w-1 h-1 bg-arteza-moss rounded-full transform -translate-x-1/2 opacity-60"></span>
                    </span>
                    
                    {/* Letter Z with paint splash */}
                    <span className="relative text-arteza-moss group-hover:text-arteza-sage transition-colors duration-300">
                      Z
                      <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-arteza-terracotta rounded-full opacity-50 transform group-hover:scale-125 transition-transform duration-300"></span>
                    </span>
                    
                    {/* Letter A with final artistic touch */}
                    <span className="relative text-arteza-copper group-hover:text-arteza-rust transition-colors duration-300 ml-0.5">
                      A
                      <span className="absolute top-1/2 -right-2 w-3 h-0.5 bg-gradient-to-r from-arteza-sage to-transparent transform -translate-y-1/2 opacity-0 group-hover:opacity-70 transition-opacity duration-500"></span>
                    </span>
                  </span>
                </div>
                
                {/* Artist signature with paint brush icon */}
                <div className="flex items-center justify-center mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-sans tracking-[0.15em] italic">
                    by upasna
                  </span>
                  <span className="ml-1 w-2 h-0.5 bg-gradient-to-r from-arteza-terracotta to-arteza-sage rounded-full"></span>
                </div>
                
                {/* Artistic background elements */}
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute top-0 left-2 w-1 h-1 bg-arteza-sage rounded-full animate-pulse"></div>
                  <div className="absolute bottom-0 right-3 w-1.5 h-1.5 bg-arteza-terracotta rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/2 -left-1 w-0.5 h-0.5 bg-arteza-copper rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
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
                      ? "text-arteza-terracotta font-semibold"
                      : "text-foreground hover:text-arteza-terracotta"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ml-4">
              {/* Cart Icon */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-arteza-terracotta/30 text-arteza-terracotta hover:bg-arteza-terracotta hover:text-background transition-all duration-300"
              >
                <Link to="/cart">
                  <ShoppingBag className="h-4 w-4" />
                </Link>
              </Button>

              {/* User Authentication */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-arteza-sage/30 text-arteza-sage hover:bg-arteza-sage hover:text-background transition-all duration-300"
                  >
                    <Link to="/student-dashboard">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex px-4 border-arteza-sage/30 text-arteza-sage hover:bg-arteza-sage hover:text-background transition-all duration-300"
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-arteza-sage/30 text-arteza-sage hover:bg-arteza-sage hover:text-background transition-all duration-300"
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
                  className="text-foreground hover:text-arteza-terracotta hover:bg-arteza-terracotta/10"
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
                      ? "text-arteza-terracotta bg-arteza-terracotta/10 font-semibold"
                      : "text-foreground hover:text-arteza-terracotta hover:bg-arteza-terracotta/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              {user ? (
                <>
                  <Link
                    to="/student-dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-arteza-sage hover:bg-arteza-sage/10 rounded-md"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-arteza-sage hover:text-arteza-sage hover:bg-arteza-sage/10 rounded-md"
                >
                  Sign In / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
