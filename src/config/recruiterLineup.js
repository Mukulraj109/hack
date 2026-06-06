/**
 * Recruiter lineup shown in the "Meet the Recruiter Lineup" modal.
 * Update company names and role titles here as partners confirm.
 *
 * @typedef {{ company: string, roles: string[] }} RecruiterLineupEntry
 * @type {RecruiterLineupEntry[]}
 */
export const RECRUITER_LINEUP = [
  {
    company: "CloudScale Systems",
    roles: ["Frontend Engineer", "Full-Stack Developer", "Platform Engineer"],
  },
  {
    company: "FinEdge Labs",
    roles: ["Backend Engineer", "Data Engineer", "Product Analyst"],
  },
  {
    company: "NovaHealth Tech",
    roles: ["Software Engineer", "ML Engineer", "QA Automation Engineer"],
  },
  {
    company: "Atlas Commerce",
    roles: ["React Developer", "Node.js Engineer", "Technical PM"],
  },
  {
    company: "BrightPath AI",
    roles: ["AI/ML Engineer", "Full-Stack Developer", "DevOps Engineer"],
  },
  {
    company: "Summit Logistics",
    roles: ["Backend Developer", "Solutions Architect", "Data Analyst"],
  },
  {
    company: "Orbit Fintech",
    roles: ["Java Developer", "Frontend Engineer", "Site Reliability Engineer"],
  },
  {
    company: "Pulse Analytics",
    roles: ["Data Scientist", "Analytics Engineer", "Product Designer"],
  },
  {
    company: "Vertex Security",
    roles: ["Security Engineer", "Backend Engineer", "Cloud Engineer"],
  },
  {
    company: "Horizon EdTech",
    roles: ["Full-Stack Developer", "Mobile Engineer", "UX Engineer"],
  },
  {
    company: "Meridian SaaS",
    roles: ["Software Engineer II", "Staff Engineer", "Engineering Manager"],
  },
  {
    company: "Catalyst Ventures",
    roles: ["Growth Engineer", "Frontend Developer", "Technical Recruiter"],
  },
];

/** Shown under the list when more partners are onboarding. */
export const RECRUITER_LINEUP_NOTE =
  "30+ hiring partners total — lineup updates as new recruiters join.";
