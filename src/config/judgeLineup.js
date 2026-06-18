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
    role: "Data and Agentic AI Innovation Leader",
    summary:
      "Adjunct Professor at UNC Charlotte's School of Data Science and a Data and Agentic AI leader across financial services and consulting. Specializes in Trustworthy AI, model fairness, and Agentic AI workflows — including solutions that identified substantial historical invoice savings for a top North American BPO company.",
    bio: "Khalil Khouy, Ph.D., is a Data and Agentic AI Innovation Leader and an Adjunct Professor at the University of North Carolina at Charlotte's School of Data Science. With extensive experience across financial services and consulting, Khalil specializes in Trustworthy AI, model fairness, and the deployment of Agentic AI workflows. He has a proven track record of leading high-stakes data modernization and advanced automation initiatives, recently spearheading Agentic AI solutions that identified substantial historical invoice savings for a top North American BPO company.",
    tags: ["Agentic AI", "Trustworthy AI", "Data Science", "FinTech"],
    initials: "KK",
    imageUrl: "/judges/khalil-khouy.png",
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
