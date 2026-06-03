import { useEffect, useState } from "react";
import AccountsReviewTab from "./components/admin/AccountsReviewTab";
import SubmissionsReviewTab from "./components/admin/SubmissionsReviewTab";
import SocialProofsReviewTab from "./components/admin/SocialProofsReviewTab";
import PointsAdjustmentTab from "./components/admin/PointsAdjustmentTab";
import "./styles/sprint-portal.css";
import "./styles/admin-verification.css";

const TABS = [
  { id: "accounts", label: "Account approval" },
  { id: "submissions", label: "Submission review" },
  { id: "social-proofs", label: "Social proofs" },
  { id: "points", label: "Add points" },
];

export default function AdminVerification() {
  const [activeTab, setActiveTab] = useState("accounts");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="admin-verification">
      <header className="admin-verification__header">
        <h1 className="admin-verification__title">Admin verification</h1>
        <p className="admin-verification__subtitle">
          Review participant accounts, final submissions, team social proofs, and manual point
          adjustments.
        </p>
      </header>

      <div className="admin-verification__search">
        <span className="material-symbols-outlined admin-verification__search-icon" aria-hidden>
          search
        </span>
        <input
          type="search"
          className="admin-verification__search-input"
          placeholder="Search by name or email…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search by name or email"
        />
        {searchQuery && (
          <button
            type="button"
            className="admin-verification__search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      <div className="admin-verification__tabs" role="tablist" aria-label="Admin sections">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`admin-verification__tab${activeTab === tab.id ? " admin-verification__tab--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-verification__panel" role="tabpanel">
        {activeTab === "accounts" && <AccountsReviewTab searchQuery={debouncedSearch} />}
        {activeTab === "submissions" && <SubmissionsReviewTab searchQuery={debouncedSearch} />}
        {activeTab === "social-proofs" && <SocialProofsReviewTab searchQuery={debouncedSearch} />}
        {activeTab === "points" && <PointsAdjustmentTab searchQuery={debouncedSearch} />}
      </div>
    </div>
  );
}
