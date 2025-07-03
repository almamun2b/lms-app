import { BookOpen, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b sticky top-0 bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold border p-2 rounded-full">
            <BookOpen />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/books" className="hover:text-primary">
              All Books
            </Link>
            <Link to="/create-book" className="hover:text-primary">
              Add Book
            </Link>
            <Link to="/borrow-summary" className="hover:text-primary">
              Borrow Summary
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Dropdown */}
            <div className="relative">
              <button className="bg-transparent border-0 p-2">
                <User className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="bg-transparent border-0 p-2"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-lg rounded-lg p-4 space-y-4 md:hidden">
          <Link to="/" className="block px-4 py-2 text-gray-900">
            Home
          </Link>
          <Link to="/books" className="block px-4 py-2 text-gray-900">
            Books
          </Link>
          <Link to="/create-book" className="block px-4 py-2 text-gray-900">
            Create Book
          </Link>
          <Link to="/borrow-summary" className="block px-4 py-2 text-gray-900">
            Borrow Summary
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
