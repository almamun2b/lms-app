import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-800 dark:bg-background text-white dark:text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 w-10 transition-colors hover:bg-primary/90"
              aria-label="Library Management System"
            >
              <BookOpen className="h-5 w-5" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your digital library management system for seamless book borrowing
              and management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Link
                to="/"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Home
              </Link>
              <Link
                to="/books"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Books
              </Link>
              <Link
                to="/create-book"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Create Book
              </Link>
              <Link
                to="/borrow-summary"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Borrow Summary
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <nav className="space-y-2">
              <Link
                to="/help"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Help Center
              </Link>
              <Link
                to="/"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                FAQ
              </Link>
              <Link
                to="/"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Contact Us
              </Link>
              <Link
                to="/"
                className="block text-sm text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  info@library.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Library St, Book City
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Library Management System. All rights reserved.
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Developed by</span>
              <span className="font-medium text-white dark:text-foreground">
                Abdullah Al Mamun
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
