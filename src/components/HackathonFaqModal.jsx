import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, X } from "lucide-react";
import {
  HACKATHON_FAQ_CATEGORIES,
  HACKATHON_FAQ_POINTS_BREAKDOWN,
  HACKATHON_FAQ_POINTS_TOTAL,
  HACKATHON_FAQ_SUBMISSION_ITEMS,
  HACKATHON_FAQ_SUPPORT_EMAIL,
} from "../config/hackathonFaq";
import { lockPageScroll, unlockPageScroll } from "../lib/modalScrollLock";
import "../styles/hackathon-registration-form.css";
import "../styles/hackathon-faq.css";

function FaqAnswer({ item }) {
  if (item.answerType === "points") {
    return (
      <div className="hackathon-faq__points-card">
        {HACKATHON_FAQ_POINTS_BREAKDOWN.map((row) => (
          <div key={row.label} className="hackathon-faq__points-row">
            <span className="hackathon-faq__points-label">{row.label}</span>
            <span className="hackathon-faq__points-value">{row.points} pts</span>
          </div>
        ))}
        <div className="hackathon-faq__points-total">
          <span className="hackathon-faq__points-total-label">Total possible</span>
          <span className="hackathon-faq__points-total-value">
            {HACKATHON_FAQ_POINTS_TOTAL} pts
          </span>
        </div>
      </div>
    );
  }

  if (item.answerType === "submission-list") {
    return (
      <ol className="hackathon-faq__submission-list" role="list">
        {HACKATHON_FAQ_SUBMISSION_ITEMS.map((entry, index) => (
          <li key={entry.title} className="hackathon-faq__submission-item">
            <span className="hackathon-faq__submission-num" aria-hidden>
              {index + 1}
            </span>
            <div className="hackathon-faq__submission-copy">
              <p className="hackathon-faq__submission-title">{entry.title}</p>
              <p className="hackathon-faq__submission-desc">{entry.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  const emailPattern = /hackathon@firststepjob\.com/g;
  const parts = item.answer.split(emailPattern);
  const hasEmail = item.answer.includes(HACKATHON_FAQ_SUPPORT_EMAIL);

  if (!hasEmail) {
    return <p className="hackathon-faq__answer">{item.answer}</p>;
  }

  return (
    <p className="hackathon-faq__answer">
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <a href={`mailto:${HACKATHON_FAQ_SUPPORT_EMAIL}`}>
              {HACKATHON_FAQ_SUPPORT_EMAIL}
            </a>
          )}
        </span>
      ))}
    </p>
  );
}

function FaqAccordionItem({ item, isOpen, onToggle }) {
  const panelId = `faq-panel-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <article className="hackathon-faq__item">
      <button
        type="button"
        id={triggerId}
        className={`hackathon-faq__trigger${isOpen ? " hackathon-faq__trigger--open" : ""}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <h4 className="hackathon-faq__question">{item.question}</h4>
        <span className="hackathon-faq__chevron-wrap" aria-hidden>
          <ChevronDown className="hackathon-faq__chevron" />
        </span>
      </button>
      {isOpen && (
        <div
          id={panelId}
          className="hackathon-faq__panel"
          role="region"
          aria-labelledby={triggerId}
        >
          <FaqAnswer item={item} />
        </div>
      )}
    </article>
  );
}

function FaqAccordionList({ items, openQuestionId, onToggle }) {
  if (items.length === 0) {
    return (
      <p className="hackathon-faq__empty">
        No questions match your search. Try a different keyword.
      </p>
    );
  }

  return (
    <div className="hackathon-faq__accordion">
      {items.map((item) => (
        <FaqAccordionItem
          key={item.id}
          item={item}
          isOpen={openQuestionId === item.id}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}

export default function HackathonFaqModal({ onClose }) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    HACKATHON_FAQ_CATEGORIES[0]?.id ?? ""
  );
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];

    return HACKATHON_FAQ_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(normalizedQuery) ||
          item.answer.toLowerCase().includes(normalizedQuery)
      ),
    })).filter((category) => category.items.length > 0);
  }, [isSearching, normalizedQuery]);

  const activeCategory = useMemo(
    () =>
      HACKATHON_FAQ_CATEGORIES.find((category) => category.id === activeCategoryId) ??
      HACKATHON_FAQ_CATEGORIES[0],
    [activeCategoryId]
  );

  useEffect(() => {
    lockPageScroll();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlockPageScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleCategorySelect = useCallback((categoryId) => {
    setActiveCategoryId(categoryId);
    setOpenQuestionId(null);
    setSearchQuery("");
  }, []);

  const handleToggleQuestion = useCallback((questionId) => {
    setOpenQuestionId((current) => (current === questionId ? null : questionId));
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
    setOpenQuestionId(null);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setOpenQuestionId(null);
  }, []);

  const totalSearchMatches = searchResults.reduce(
    (sum, category) => sum + category.items.length,
    0
  );

  return createPortal(
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <div
        className="hackathon-reg-modal__backdrop hackathon-reg-modal__backdrop--faq"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hackathon-faq-modal-title"
        onClick={onClose}
      >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--faq"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Hackathon 2026</p>
            <h2 id="hackathon-faq-modal-title" className="hackathon-reg-modal__title">
              Frequently Asked Questions
            </h2>
            <p className="hackathon-faq-modal__subtitle">
              Everything you need to know about registration, teams, tracks, points, and more.
            </p>
          </div>
          <button
            type="button"
            className="hackathon-reg-modal__close"
            onClick={onClose}
            aria-label="Close FAQ"
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="hackathon-faq-modal__search-wrap">
          <label className="hackathon-faq__search" htmlFor="hackathon-faq-search">
            <Search className="hackathon-faq__search-icon" aria-hidden />
            <input
              id="hackathon-faq-search"
              type="search"
              className="hackathon-faq__search-input"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="hackathon-faq__search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X aria-hidden />
              </button>
            )}
          </label>
        </div>

        <div className="hackathon-reg-modal__body hackathon-faq-modal__body">
          <div className="hackathon-faq__chips-wrap">
            <div className="hackathon-faq__chips" role="tablist" aria-label="FAQ categories">
              {HACKATHON_FAQ_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={!isSearching && activeCategoryId === category.id}
                  className={`hackathon-faq__chip${
                    !isSearching && activeCategoryId === category.id
                      ? " hackathon-faq__chip--active"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hackathon-faq__layout">
            <nav className="hackathon-faq__nav" aria-label="FAQ categories">
              {HACKATHON_FAQ_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`hackathon-faq__nav-btn${
                    !isSearching && activeCategoryId === category.id
                      ? " hackathon-faq__nav-btn--active"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <span className="hackathon-faq__nav-icon-wrap" aria-hidden>
                    <span className="hackathon-faq__nav-icon material-symbols-outlined">
                      {category.icon}
                    </span>
                  </span>
                  <span className="hackathon-faq__nav-copy">
                    <span className="hackathon-faq__nav-label">{category.label}</span>
                    <span className="hackathon-faq__nav-count">
                      {category.items.length} questions
                    </span>
                  </span>
                </button>
              ))}
            </nav>

            <div className="hackathon-faq__content">
              {isSearching ? (
                <>
                  <p className="hackathon-faq__search-results-heading">
                    {totalSearchMatches} result{totalSearchMatches === 1 ? "" : "s"} for &ldquo;
                    {searchQuery.trim()}&rdquo;
                  </p>
                  {searchResults.map((category) => (
                    <section key={category.id} className="hackathon-faq__group">
                      <h3 className="hackathon-faq__group-title">{category.label}</h3>
                      <FaqAccordionList
                        items={category.items}
                        openQuestionId={openQuestionId}
                        onToggle={handleToggleQuestion}
                      />
                    </section>
                  ))}
                  {searchResults.length === 0 && (
                    <p className="hackathon-faq__empty">
                      No questions match your search. Try a different keyword.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="hackathon-faq__content-header">
                    <h3 className="hackathon-faq__content-title">{activeCategory?.label}</h3>
                    <span className="hackathon-faq__content-badge">
                      {activeCategory?.items.length ?? 0} questions
                    </span>
                  </div>
                  <FaqAccordionList
                    items={activeCategory?.items ?? []}
                    openQuestionId={openQuestionId}
                    onToggle={handleToggleQuestion}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <footer className="hackathon-reg-modal__footer">
          <p className="hackathon-reg-modal__hint">
            Still need help? Email{" "}
            <a
              href={`mailto:${HACKATHON_FAQ_SUPPORT_EMAIL}`}
              className="hackathon-faq-modal__footer-link"
            >
              {HACKATHON_FAQ_SUPPORT_EMAIL}
            </a>{" "}
            or reach out via WhatsApp.
          </p>
          <div className="hackathon-reg-modal__footer-actions">
            <button
              type="button"
              className="hackathon-reg-form__btn hackathon-reg-form__btn--primary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
    </>,
    document.body
  );
}
