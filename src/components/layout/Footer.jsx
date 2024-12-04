import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    "Customer Service": [
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "FAQs", href: "/faqs" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
    Connect: [
      { name: "Facebook", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "Pinterest", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              EchoMart
            </Link>
            <p className="mt-4 text-gray-400">
              Your one-stop shop for all things electronic. Quality products,
              competitive prices, and exceptional service.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} EchoMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
