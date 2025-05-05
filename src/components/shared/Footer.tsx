import Logo from "@/assets/images/logo/Logo";
import { Facebook, Instagram, Twitter, Mail, MapPinHouse, PhoneCall } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground border-t mt-10 pt-10 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo & Description */}
        <div className="space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed max-w-sm">
            <span className="text-[#4F46E5] font-semibold">MediMart</span> is
            your trusted online store for medical supplies, health essentials,
            and wellness products. Your health is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[#4F46E5] font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#4F46E5] transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-[#4F46E5] transition">
                Products Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#4F46E5] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#4F46E5] transition">
                Policies
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#4F46E5] transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Social */}
        <div className="space-y-4">
          <h4 className="text-[#4F46E5] font-semibold mb-3">Contact Us</h4>
          <div className="flex flex-col gap-2 text-sm">
            <div className="hover:text-[#4F46E5] transition flex gap-2">
              <Mail /> medimart@gmail.com
            </div>
            <div className="hover:text-[#4F46E5] transition flex gap-2">
              <PhoneCall /> +880-176547xxxx
            </div>
            <div className="hover:text-[#4F46E5] transition flex gap-2">
              <MapPinHouse /> 105/24, Farmgate, Dhaka-1215
            </div>
          </div>

          <div className="flex gap-4 text-[#4F46E5] mt-4">
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
        <span className="text-[#4F46E5] font-semibold">MediMart</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
