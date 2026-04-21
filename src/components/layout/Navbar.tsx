import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "../ui/resizable-navbar";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: "Features", link: "/features" },
    { name: "Models", link: "/models" },
    { name: "Pricing", link: "/pricing" },
    { name: "About", link: "/about" },
    { name: "Docs", link: "/docs" },
  ];

  return (
    <>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <div style={{ width: "100vw", height: "100px", position: "relative" }}>
          {/* Navbar */}

          <Navbar className=" ">
            {/* Desktop Nav */}
            <NavBody className="backdrop-blur-lg border border-white/5 dark:border-white/5 shadow-lg">
              <NavbarLogo />

              <NavItems items={navLinks} className="" />
              <NavbarButton
                href="/contact"
                variant="dark"
                className="bg-[#22c55e] dark:bg-[#22c55e] text-white dark:text-white rounded-lg border border-white/20 hover:bg-[#8b5cf6] transition-colors font-mono text-xs uppercase tracking-widest px-6"
              >
                Contact Sales
              </NavbarButton>
            </NavBody>

            {/* Mobile Nav */}
            <MobileNav className="">
              <MobileNavHeader className="">
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </MobileNavHeader>

              <MobileNavMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                className=""
              >
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <NavbarButton
                  href="/contact"
                  variant="dark"
                  className="bg-[#22c55e] text-white text-center py-3 rounded-lg border border-white/20 font-mono text-xs uppercase tracking-widest mt-4 w-full hover:bg-[#8b5cf6] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Sales
                </NavbarButton>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>
      </div>
    </>
  );
}
