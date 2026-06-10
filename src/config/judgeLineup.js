/**
 * Judge lineup for landing page (JudgesStack) and sprint portal (SprintDashboard).
 * Update names, bios, and tags here as the panel is confirmed.
 *
 * @typedef {object} JudgeLineupEntry
 * @property {string} id
 * @property {string} num
 * @property {string} name
 * @property {string} role
 * @property {string} summary
 * @property {string} bio
 * @property {string[]} tags
 * @property {string} initials
 * @property {string | null} imageUrl
 * @property {boolean} announcingSoon
 * @property {string} iconName — Lucide icon key for landing cards
 * @property {string} accent
 * @property {string} accentSoft
 * @property {string} accentRing
 * @property {string} gradient
 */

/** @type {JudgeLineupEntry[]} */
export const JUDGE_LINEUP = [
  {
    id: "khalil-khouy",
    num: "01",
    name: "Khalil Khouy, Ph.D.",
    role: "Data & AI Innovation Leader",
    summary:
      "PhD in Trustworthy AI, Adjunct Professor at UNC Charlotte, and a Data & AI leader whose work has driven over $300M in enterprise savings across financial services and consulting. 13+ years turning complex data challenges into real business outcomes.",
    bio: "Khalil Khouy, Ph.D. is a Data and AI Innovation Leader and Adjunct Professor at the University of North Carolina at Charlotte's School of Data Science, where he specializes in Trustworthy AI and model fairness. With over 13 years of experience across financial services and consulting, Khalil has built a reputation for solving complex, high-stakes data challenges — from risk analytics at Wells Fargo to leading Agentic AI workstreams for the largest BPO company in North America, where his work identified over $300 million in savings across three years of invoice data. He has spearheaded data modernization projects for Tier 1 banks, served as Product Owner for a Climate Data Repository enabling ESG analytics at a large US bank, and brings deep expertise spanning AI, sustainable finance, and enterprise data strategy. He brings to this panel the perspective of someone who has built and deployed AI that operates at real scale — with real consequences.",
    tags: ["Data Science", "AI", "Machine Learning", "FinTech", "Analytics"],
    initials: "KK",
    imageUrl: null,
    announcingSoon: false,
    iconName: "Cpu",
    accent: "#0891b2",
    accentSoft: "rgba(8, 145, 178, 0.14)",
    accentRing: "rgba(8, 145, 178, 0.35)",
    gradient: "linear-gradient(135deg, #0891b2 0%, #6366f1 100%)",
  },
  {
    id: "mahesh-devalla",
    num: "02",
    name: "Mahesh Devalla",
    role: "Chief Technology Officer",
    summary:
      "CTO, author, and enterprise AI leader who has scaled technology functions at the board and investor level across multi-million dollar organizations. Ivy League alumnus, USA 40 Under 40, and mentor to founders and leadership teams across the US, India, and Europe.",
    bio: 'Recognized on the USA 40 Under 40 and Asian American 40 Under 40 lists, Mahesh Devalla is an Ivy League alumnus and the author of "The AI Dilemma: Why Businesses Still Fail to Embrace AI." Named CTO of the Year and a Top AI 100 Leader, Mahesh currently serves as Chief Technology Officer with multi-million dollar enterprise operating ownership spanning strategy, execution, and scale — partnering directly with CEOs, CFOs, and boards to translate business priorities into clear technology direction and enterprise-ready AI systems. His work centers on scaling AI into durable competitive advantage, improving decision quality, and driving margin expansion across large organizations. Beyond his operating role, Mahesh actively advises and mentors leadership teams and founders across the US, India, and Europe on scaling organizations, navigating inflection points, and building technology functions built to last. He brings to this panel a rare combination of deep technical depth, enterprise leadership, and a genuine passion for identifying builders who think beyond the code.',
    tags: ["AI", "Enterprise", "CTO Strategy", "Leadership"],
    initials: "MD",
    imageUrl: "/judges/mahesh-devalla.png",
    announcingSoon: false,
    iconName: "Star",
    accent: "#2a8e9e",
    accentSoft: "rgba(42, 142, 158, 0.14)",
    accentRing: "rgba(42, 142, 158, 0.35)",
    gradient: "linear-gradient(135deg, #2a8e9e 0%, #0891b2 100%)",
  },
  {
    id: "judge-03-tba",
    num: "03",
    name: "Judge 03 — Announcing soon",
    role: "Panel member",
    summary:
      "Our third panel judge is being finalized — full bio and expertise tags will publish here once confirmed.",
    bio: "",
    tags: [],
    initials: "J3",
    imageUrl: null,
    announcingSoon: true,
    iconName: "MessageSquare",
    accent: "#6366f1",
    accentSoft: "rgba(99, 102, 241, 0.14)",
    accentRing: "rgba(99, 102, 241, 0.35)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
  },
];

/** Join tags for sprint portal expertise chip. */
export function judgeExpertise(tags) {
  if (!tags?.length) return "Announcing soon";
  return tags.join(" · ");
}

/** Map lineup entry to sprint portal JudgeProfileCard props. */
export function toSprintJudge(judge) {
  return {
    name: judge.name,
    role: judge.role,
    expertise: judgeExpertise(judge.tags),
    initials: judge.initials,
    imageUrl: judge.imageUrl,
    announcingSoon: judge.announcingSoon,
  };
}
