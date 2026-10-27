
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  Menu,
  X,
} from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Primary navigation links shared by desktop and mobile layouts.
 */
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Hotels", path: "/hotels" },
  { label: "Destinations", path: "/destinations" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuTimelineRef = useRef(null);
  const menuButtonRef = useRef(null);

  const location = useLocation();

  /**
   * Tracks the scroll position to apply the navbar's
   * solid background and compact appearance.
   */
  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 40);
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  /**
   * Closes the mobile navigation after a route change.
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /**
   * Prevents background scrolling while the mobile menu
   * is open and restores scrolling when it closes.
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  /**
   * Provides keyboard dismissal for the mobile navigation.
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  /**
   * Animates the navbar during its initial appearance.
   * The reduced-motion preference is respected.
   */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        ".navbar-content",
        {
          y: -35,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }
      );
    },
    { scope: navbarRef }
  );

  /**
   * Creates a reversible GSAP timeline for the mobile
   * navigation panel and staggered navigation links.
   */
  useGSAP(
    () => {
      const menu = mobileMenuRef.current;

      if (!menu) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const timeline = gsap.timeline({
        paused: true,
        reversed: true,
        onReverseComplete: () => {
          if (!isMenuOpen) {
            menuButtonRef.current?.focus();
          }
        },
      });

      if (prefersReducedMotion) {
        timeline.fromTo(
          menu,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.01 }
        );
      } else {
        timeline
          .fromTo(
            menu,
            {
              yPercent: -100,
              autoAlpha: 1,
            },
            {
              yPercent: 0,
              duration: 0.65,
              ease: "power3.inOut",
            }
          )
          .fromTo(
            ".mobile-nav-item",
            {
              y: 25,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.45,
              stagger: 0.07,
              ease: "power3.out",
            },
            "-=0.3"
          );
      }

      menuTimelineRef.current = timeline;

      return () => {
        menuTimelineRef.current = null;
      };
    },
    { scope: mobileMenuRef }
  );

  /**
   * Plays or reverses the existing timeline in response
   * to changes in the mobile menu's visibility.
   */
  useEffect(() => {
    const timeline = menuTimelineRef.current;

    if (!timeline) return;

    if (isMenuOpen) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Primary navigation header */}
      <header
        ref={navbarRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          isScrolled || isMenuOpen
            ? "border-b border-white/10 bg-background shadow-xl"
            : "border-b border-transparent bg-background/30 backdrop-blur-sm"
        }`}
      >
        <div
          className={`navbar-content mx-auto flex max-w-7xl items-center justify-between px-6 transition-[height] duration-500 lg:px-10 ${
            isScrolled ? "h-20" : "h-24"
          }`}
        >
          {/* Brand identity */}
          <Link
            to="/"
            onClick={closeMenu}
            className="relative z-50 font-display text-3xl font-semibold tracking-tight text-text-primary"
            aria-label="LuxStay homepage"
          >
            LUX<span className="text-primary">STAY</span>
            <span className="text-primary">.</span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-9 lg:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `group relative py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop account actions */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link
              to="/wishlist"
              aria-label="View wishlist"
              className="text-text-secondary transition-colors duration-300 hover:text-primary"
            >
              <Heart size={21} strokeWidth={1.7} />
            </Link>

            <Link
              to="/login"
              className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Sign In

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile navigation toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="relative z-50 rounded-lg p-2 text-text-primary transition-colors hover:text-primary lg:hidden"
          >
            {isMenuOpen ? (
              <X size={27} strokeWidth={1.8} />
            ) : (
              <Menu size={27} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </header>

      {/* Full-screen mobile navigation overlay */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className="invisible fixed inset-0 z-40 bg-background lg:hidden"
      >
        <nav
          aria-label="Mobile navigation"
          className="flex h-full flex-col justify-center overflow-y-auto px-8 pb-10 pt-28 sm:px-12"
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={({ isActive }) =>
                  `mobile-nav-item group flex items-center gap-5 font-display text-4xl transition-colors duration-300 sm:text-5xl ${
                    isActive
                      ? "text-primary"
                      : "text-text-primary hover:text-primary"
                  }`
                }
              >
                <span className="font-sans text-xs text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile secondary navigation */}
          <div className="mobile-nav-item mt-10 border-t border-white/10 pt-8">
            <Link
              to="/wishlist"
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
              className="mb-7 flex items-center gap-3 text-text-secondary transition-colors hover:text-primary"
            >
              <Heart size={20} strokeWidth={1.7} />
              Wishlist
            </Link>

            <Link
              to="/login"
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-background transition-colors hover:bg-primary-hover"
            >
              Sign In
              <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Mobile navigation footer */}
          <div className="mobile-nav-item mt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">
              Discover Extraordinary Stays
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;