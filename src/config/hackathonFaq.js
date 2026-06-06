/**
 * FAQ content for the FirstStep Annual Hackathon 2026 modal.
 * Update questions and answers here as policies evolve.
 */

export const HACKATHON_FAQ_SUPPORT_EMAIL = "hackathon@firststepjob.com";

/**
 * @typedef {"text" | "points" | "submission-list"} FaqAnswerType
 * @typedef {{ id: string, question: string, answer: string, answerType?: FaqAnswerType }} FaqItem
 * @typedef {{ id: string, label: string, icon: string, items: FaqItem[] }} FaqCategory
 */

/** @type {FaqCategory[]} */
export const HACKATHON_FAQ_CATEGORIES = [
  {
    id: "registration",
    label: "Registration & Eligibility",
    icon: "how_to_reg",
    items: [
      {
        id: "who-can-participate",
        question: "Who can participate in the hackathon?",
        answer:
          "Anyone in the US aged 18 or older with legal status is eligible. This includes all visa paths — F1/OPT, H1B, and more. You must have graduated within the last 7 years or be graduating within the next 2 years.",
      },
      {
        id: "registration-fee",
        question: "Is there a registration fee?",
        answer: "No. The hackathon is completely free to participate in.",
      },
      {
        id: "how-to-register",
        question: "How do I register?",
        answer:
          "Register through the hackathon website. Your application will be reviewed, and once verified, your team will be approved to participate.",
      },
      {
        id: "pending-status",
        question: 'I registered but my status says "Pending" — what does that mean?',
        answer:
          "Our team is currently verifying your details. Your status will be updated within 24 hours.",
      },
      {
        id: "approval-time",
        question: "How long does the approval process take?",
        answer: "Typically within 24 hours of submitting your registration.",
      },
      {
        id: "edit-registration",
        question: "Can I edit my registration details after submitting?",
        answer: "No. Registration details cannot be changed once submitted.",
      },
    ],
  },
  {
    id: "teams",
    label: "Teams",
    icon: "group",
    items: [
      {
        id: "team-size",
        question: "What is the team size?",
        answer: "Each team can have a maximum of 2 members.",
      },
      {
        id: "solo-participation",
        question: "Can I participate solo?",
        answer:
          "Yes, but even individual builders must create a team on the dashboard to proceed with participation and submission.",
      },
      {
        id: "create-team",
        question: "How do I create a team?",
        answer:
          "Log in to your Hackathon Dashboard → go to the Teams tab → click Create Team → fill in the basic details and pick a team name.",
      },
      {
        id: "join-team",
        question: "How do I join an existing team?",
        answer:
          "Ask your teammate (team captain) for the team code, which is available in the Teams section of their dashboard. Copy the code, go to the Teams tab, click Join Team, and enter it. Your captain will need to approve your request before you officially join.",
      },
      {
        id: "change-team",
        question: "Can I change my team after joining or creating one?",
        answer:
          "Yes. If you have questions or need help, reach out to hackathon@firststepjob.com.",
      },
      {
        id: "remote-teammates",
        question: "Can team members be from different locations, colleges, or companies?",
        answer: "Yes, absolutely. There are no restrictions on where your teammate is from.",
      },
      {
        id: "teammate-dropout",
        question: "What happens if my teammate drops out?",
        answer:
          "The team captain can remove a team member from the team through the dashboard.",
      },
    ],
  },
  {
    id: "tracks",
    label: "Tracks & Project",
    icon: "code",
    items: [
      {
        id: "available-tracks",
        question: "What are the available tracks?",
        answer:
          "Five tracks: Predictive Career Intelligence (Data Science), The Job Market, Visualized (Data Analysis & Creative Visualization), Smart Application Tracker (SDE), Deploy at Scale (SDE with Infrastructure), and Secure by Default (Cybersecurity). Full briefs and starter assets drop on July 8th at 8 PM EST.",
      },
      {
        id: "switch-tracks",
        question: "Can I switch tracks after selecting one?",
        answer: "Yes, you're free to choose and change your track.",
      },
      {
        id: "tech-stack",
        question: "Are there restrictions on tech stack, tools, or APIs?",
        answer:
          "None. The hackathon is completely tool and tech stack agnostic — use whatever you want.",
      },
      {
        id: "build-from-scratch",
        question: "Do I need to build from scratch?",
        answer:
          "Not entirely. You will receive starter assets for each track, including Git repos that serve as a starting point. Each task comes with its own set of assets.",
      },
      {
        id: "what-to-submit",
        question: "What do I need to submit?",
        answer: "",
        answerType: "submission-list",
      },
      {
        id: "build-time",
        question: "How long do I have to build?",
        answer: "You have a 100-hour sprint to complete your project.",
      },
    ],
  },
  {
    id: "points",
    label: "Points & Leaderboard",
    icon: "leaderboard",
    items: [
      {
        id: "points-system",
        question: "How does the points system work?",
        answer: "",
        answerType: "points",
      },
      {
        id: "onboarding-points",
        question: "How do I earn onboarding points before the hackathon starts?",
        answer:
          "Register, create a team, and share that you're participating on social media — you'll earn up to 75 points before the hackathon even begins.",
      },
      {
        id: "claim-social-points",
        question: "How do I claim points for sharing on LinkedIn/Instagram?",
        answer:
          "Download the pre-built templates from the Teams tab in your dashboard, post on LinkedIn and/or Instagram, then submit a screenshot through the form on your dashboard. Our team will review and assign the points.",
      },
      {
        id: "see-score",
        question: "Where can I see my score and leaderboard ranking?",
        answer:
          "On your Hackathon Dashboard — it shows your current score and your rank on the leaderboard.",
      },
      {
        id: "onboarding-count",
        question: "Do onboarding points count toward the final score?",
        answer: "Yes, they count toward your overall total.",
      },
    ],
  },
  {
    id: "social",
    label: "Social Media Templates",
    icon: "share",
    items: [
      {
        id: "find-templates",
        question: "Where do I find the pre-built social media templates?",
        answer: "In the Teams section of your Hackathon Dashboard.",
      },
      {
        id: "submit-screenshot",
        question: "How do I submit my screenshot for social media points?",
        answer:
          "Through the form available on your dashboard. Our team will review your submission and assign the points.",
      },
    ],
  },
  {
    id: "judging",
    label: "Judging & Prizes",
    icon: "emoji_events",
    items: [
      {
        id: "judging-criteria",
        question: "What are the judging criteria?",
        answer:
          "Projects will be evaluated on creativity, approach, execution quality, problem understanding, and uniqueness of the solution.",
      },
      {
        id: "prizes",
        question: "What are the prizes?",
        answer: "Check the hackathon landing page for the latest prize breakdown.",
      },
      {
        id: "winners-announced",
        question: "When will winners be announced?",
        answer: "Winners will be announced on July 20th.",
      },
    ],
  },
  {
    id: "top10",
    label: "Top 10 & Recruiter Exposure",
    icon: "work",
    items: [
      {
        id: "top10-teams",
        question: "What happens to the top 10 teams?",
        answer:
          "The top 10 teams are automatically packaged as a premium talent bundle — including your live demo, GitHub repo, and resumes — and sent directly to 30+ elite recruiters.",
      },
      {
        id: "recruiter-opt-in",
        question: "Do top 10 teams need to opt in for recruiter exposure?",
        answer:
          "No, it's automatic. If you finish in the top 10, your work goes directly in front of people who hire.",
      },
      {
        id: "international-talent",
        question: "Is the hackathon open to international talent?",
        answer:
          "Yes — participants on any valid US visa path (F1/OPT, H1B, etc.) are welcome.",
      },
      {
        id: "credential",
        question: "Do participants receive any credential?",
        answer:
          "Yes. Every participant who completes the challenge receives a verified digital badge.",
      },
      {
        id: "recruiter-lineup",
        question: "Where can I see the recruiter lineup?",
        answer: "Recruiter details are available on the hackathon landing page.",
      },
      {
        id: "hiring-partner",
        question: "Can companies or recruiters become a hiring partner?",
        answer:
          "Yes! There's a form on the hackathon landing page to apply as a hiring partner.",
      },
    ],
  },
  {
    id: "schedule",
    label: "Schedule & Logistics",
    icon: "event",
    items: [
      {
        id: "online-or-inperson",
        question: "Is the hackathon online or in-person?",
        answer: "Fully online.",
      },
      {
        id: "info-sessions",
        question: "Will there be any kickoff or info sessions?",
        answer:
          "Yes — there will be 3 information sessions before the hackathon starts. Check the Roadmap section on the dashboard for dates and details.",
      },
    ],
  },
  {
    id: "support",
    label: "General & Support",
    icon: "help",
    items: [
      {
        id: "contact-help",
        question: "Who do I contact for help?",
        answer:
          "Email us at hackathon@firststepjob.com or reach out via WhatsApp.",
      },
      {
        id: "beginners",
        question: "Can beginners participate?",
        answer: "Yes, of course! Builders of all skill levels are welcome.",
      },
      {
        id: "certificate",
        question: "Will I receive a certificate of participation?",
        answer:
          "Yes. All participants who complete the challenge will receive a certificate.",
      },
      {
        id: "code-of-conduct",
        question: "Is there a code of conduct?",
        answer:
          "Yes. Please refer to the Terms and Conditions on the hackathon landing page.",
      },
    ],
  },
];

export const HACKATHON_FAQ_SUBMISSION_ITEMS = [
  {
    title: "Video link",
    description:
      "Explaining your approach and a live demo (Google Drive link, viewable by anyone)",
  },
  {
    title: "Git repo URL",
    description: "Your project's codebase",
  },
  {
    title: "Written document",
    description: "Using a pre-built questionnaire provided by FirstStep",
  },
];

export const HACKATHON_FAQ_POINTS_BREAKDOWN = [
  { label: "Registration", points: 25 },
  { label: "LinkedIn share", points: 25 },
  { label: "Instagram share", points: 25 },
  { label: "Judge evaluation", points: 175 },
];

export const HACKATHON_FAQ_POINTS_TOTAL = 250;
