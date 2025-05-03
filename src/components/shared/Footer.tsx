import Logo from "@/assets/images/logo/Logo";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground border-t mt-10 pt-10 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo & Description */}
        <div className="space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed max-w-sm">
            <span className="text-primary font-semibold">MediMart</span> is your
            trusted online store for medical supplies, health essentials, and
            wellness products. Your health is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-primary font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-primary transition">
                Products Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition">
                About Us
              </Link>
            </li>
            {/* <li>
              <Link href="/policy" className="hover:text-primary transition">
                Policies
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Legal & Social */}
        <div className="space-y-4">
          <div className="space-x-4 text-sm">
            <Link href="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              Terms of Service
            </Link>
          </div>

          <div className="flex gap-4 text-primary mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="hover:text-secondary transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="hover:text-secondary transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="hover:text-secondary transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-muted-foreground mt-10 border-t pt-4 cursor-pointer">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-primary font-semibold">MediMart</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
