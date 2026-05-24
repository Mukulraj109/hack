import { useEffect, useRef, useCallback, type MouseEvent } from "react";
import { X, Menu } from "lucide-react";
import { handleSectionLinkClick } from "../lib/scrollToSection";

export type NavLinkItem = {
  href: string;
  label: string;
  isActive?: boolean;
  sectionId?: string;
  external?: boolean;
};

type MobileNavProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  links: NavLinkItem[];
  onNavigate: (path: string) => void;
};

export function MobileNav({
  isOpen,
  onToggle,
  onClose,
  links,
  onNavigate,
}: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", isOpen);
    return () => document.body.classList.remove("nav-menu-open");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }
  }, [isOpen]);

  const handleLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
      if (link.sectionId) {
        handleSectionLinkClick(event.nativeEvent, link.sectionId);
      }
      onClose();
    },
    [onClose]
  );

  return (
    <div className="nav-bar__mobile">
      <button
        type="button"
        className="nav-menu-toggle"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={onToggle}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={`mobile-nav-panel${isOpen ? " is-open" : ""}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mobile-nav-panel__header">
          <span className="mobile-nav-panel__title">Menu</span>
          <button
            type="button"
            className="mobile-nav-panel__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav className="mobile-nav-panel__inner">
          <ul className="mobile-nav-panel__links" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`mobile-nav-link${link.isActive ? " is-active" : ""}`}
                  onClick={(event) => {
                    if (link.external) {
                      onClose();
                      return;
                    }
                    if (link.sectionId) {
                      event.preventDefault();
                      handleLinkClick(event, link);
                      return;
                    }
                    event.preventDefault();
                    onClose();
                    onNavigate(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/register"
            className="mobile-nav-panel__cta yellow-button w-button nav-cta-button"
            onClick={(event) => {
              event.preventDefault();
              onClose();
              onNavigate("/register");
            }}
          >
            Claim Your Spot
          </a>
        </nav>
      </div>

      <button
        type="button"
        className={`mobile-nav-backdrop${isOpen ? " is-visible" : ""}`}
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
    </div>
  );
}
