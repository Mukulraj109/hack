import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "./components/ui/bento-card";
import { AnimatedDropzone } from "./components/ui/animated-dropzone";
import { AnimatedTimeline } from "./components/ui/animated-timeline";
import { CountdownDisplay } from "./components/ui/countdown-display";
import {
  LayoutDashboard,
  UploadCloud,
  Trophy,
  Users,
  ExternalLink,
  Copy,
  Share2,
  Megaphone,
  Clock,
  LifeBuoy,
  FileText,
  Award,
  ChevronRight,
  Check,
  TrendingUp,
  Star,
  Zap,
  Target,
  Gift,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/** Align with landing page hackathon start (ET). */
const HACKATHON_START = new Date("2026-06-10T20:00:00-04:00");
const SPRINT_HOURS = 100;

function getSprintEnd() {
  return new Date(HACKATHON_START.getTime() + SPRINT_HOURS * 60 * 60 * 1000);
}

function useSprintRemaining() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const end = getSprintEnd().getTime();
  const ms = Math.max(0, end - now);
  const totalSec = Math.floor(ms / 1000);
  return {
    ended: ms <= 0,
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    endDate: getSprintEnd(),
  };
}

/** Timeline data */
const timelineItems = [
  {
    id: "social",
    title: "Share proof of buzz",
    description: "Post on LinkedIn or Instagram with the hashtag we emailed you. Upload a screenshot for verification.",
    points: "+50",
    icon: Share2,
    status: "completed" as const,
    action: "Submit Proof",
  },
  {
    id: "invite",
    title: "Invite a builder",
    description: "Grow the cohort — share your invite link. Points apply when they register with your URL.",
    points: "+15",
    icon: Users,
    status: "active" as const,
    action: "Copy Link",
    helper: "0 invited",
  },
  {
    id: "repo",
    title: "Checkpoint: working repo",
    description: "Link a public or invited repo so reviewers can see momentum before the final upload.",
    points: "+10",
    icon: FileText,
    status: "locked" as const,
    action: "Add Link",
  },
  {
    id: "judge",
    title: "Judge score",
    description: "Up to 150 pts from finals demos — rubric matches what recruiters see.",
    points: "+150",
    icon: Award,
    status: "locked" as const,
    helper: "After sprint ends",
  },
  {
    id: "bonus",
    title: "Bonus participation",
    description: "Newsletter, sponsor tasks, or surprise challenges — we will drop these in #announcements.",
    points: "+20",
    icon: Trophy,
    status: "locked" as const,
    action: "View Tasks",
  },
];

/** Leaderboard data */
const leaderboardData = [
  { rank: 1, team: "Cache Me Outside", points: 214, note: "Strong demo + social proof" },
  { rank: 2, team: "Prompt Pilots", points: 198, note: "Top recruiter pick" },
  { rank: 3, team: "Visa Vision", points: 181, note: "Solid submission package" },
  { rank: 12, team: "Your Team", points: 112, note: "Sprint in progress", isCurrentUser: true },
];

const POINTS_MAX = 250;
const shareUrl = "firststephack.com/join?ref=YOURTEAM";
const currentPoints = 112;

/** Copy Button */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-xl border-2 border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700 transition-all hover:bg-cyan-100 hover:border-cyan-300 active:scale-95"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
    </motion.button>
  );
}

/** Stats Card */
function StatsCard({ icon: Icon, label, value, sublabel, color }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sublabel?: string;
  color: "cyan" | "purple" | "amber" | "green";
}) {
  const colors = {
    cyan: "from-cyan-500 to-cyan-600",
    purple: "from-purple-500 to-purple-600",
    amber: "from-amber-500 to-amber-600",
    green: "from-green-500 to-green-600",
  };
  return (
    <motion.div
      className="flex items-center gap-4 rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-200"
      whileHover={{ y: -2 }}
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors[color]} text-white shadow-lg`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
        {sublabel && <p className="text-xs text-slate-400">{sublabel}</p>}
      </div>
    </motion.div>
  );
}

/** Help Card */
function HelpCard({ icon: Icon, title, description, action, color }: {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  color: "cyan" | "purple" | "pink";
}) {
  const colors = {
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
    pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
  };
  const c = colors[color];
  return (
    <motion.div
      className={`group cursor-pointer rounded-2xl border-2 ${c.border} ${c.bg} p-6 transition-all hover:shadow-lg`}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
        <Icon className={`h-6 w-6 ${c.text}`} />
      </div>
      <h3 className="mb-2 font-bold text-slate-800">{title}</h3>
      <p className="mb-4 text-sm text-slate-500">{description}</p>
      <span className={`inline-flex items-center gap-1 text-sm font-bold ${c.text}`}>
        {action}
        <ChevronRight className="h-4 w-4" />
      </span>
    </motion.div>
  );
}

/** Leaderboard Row */
function LeaderboardRow({ entry, maxPoints, index }: {
  entry: { rank: number; team: string; points: number; note?: string; isCurrentUser?: boolean };
  maxPoints: number;
  index: number;
}) {
  const isTopThree = entry.rank <= 3;
  const rankColors = {
    1: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30",
    2: "bg-gradient-to-br from-slate-300 to-slate-500 text-white",
    3: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
  };
  return (
    <motion.div
      className={`relative flex items-center gap-4 rounded-xl border-2 p-4 transition-all ${entry.isCurrentUser ? "border-cyan-300 bg-cyan-50 shadow-md" : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      {entry.isCurrentUser && <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-cyan-500" />}
      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${isTopThree ? rankColors[entry.rank as keyof typeof rankColors] : "bg-slate-100 text-slate-600"}`}>
        {entry.rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 truncate">{entry.team}</span>
          {entry.isCurrentUser && <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-700">You</span>}
        </div>
        {entry.note && <p className="text-xs text-slate-400">{entry.note}</p>}
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-slate-800">{entry.points}</span>
          <span className="text-xs text-slate-400">/ {maxPoints}</span>
        </div>
        <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-slate-100">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400" initial={{ width: 0 }} animate={{ width: `${(entry.points / maxPoints) * 100}%` }} transition={{ delay: 0.3, duration: 0.5 }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function TasksPage() {
  const sprint = useSprintRemaining();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#top", active: true },
    { icon: UploadCloud, label: "Submission", href: "#submission" },
    { icon: Target, label: "Roadmap", href: "#roadmap" },
    { icon: Users, label: "Team", href: "#team" },
    { icon: ExternalLink, label: "Event site", href: "/" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-40 shadow-sm">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg">
            <span className="text-lg font-black text-white">FS</span>
          </div>
          <div>
            <span className="text-lg font-black text-slate-800">FirstStep</span>
            <span className="text-lg font-black text-cyan-600">Hack</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                item.active
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* User at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white font-bold">JC</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">John Carter</p>
              <p className="text-xs text-slate-400">Team AI Career Agent</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg">
            <span className="text-lg font-black text-white">FS</span>
          </div>
          <span className="font-bold text-slate-800">FirstStep<span className="text-cyan-600">Hack</span></span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100">
          {sidebarOpen ? <X className="h-6 w-6 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-white z-50 shadow-xl"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
            >
              <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg">
                  <span className="text-lg font-black text-white">FS</span>
                </div>
                <div>
                  <span className="text-lg font-black text-slate-800">FirstStep</span>
                  <span className="text-lg font-black text-cyan-600">Hack</span>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      item.active
                        ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Hero Banner */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border-2 border-cyan-200 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 p-8 shadow-xl shadow-cyan-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Zap className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">FirstStepHack · 100-hour sprint</span>
                </motion.div>

                <motion.h1
                  className="text-4xl font-black leading-tight text-white lg:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Your build window is{" "}
                  <span className="text-amber-300">live.</span>
                </motion.h1>

                <motion.p
                  className="max-w-lg text-base leading-relaxed text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Ship your demo, upload artifacts, and rack up pre-judge points before finals.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button className="bg-white text-cyan-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-slate-100 transition-all">
                    <UploadCloud className="h-5 w-5 mr-2" />
                    Upload Submission
                  </Button>
                  <Button className="border-2 border-white/50 text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-all">
                    Score More Points
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </motion.div>
              </div>

              {/* Countdown & Stats */}
              <div className="space-y-4">
                <motion.div
                  className="rounded-2xl border-2 border-white/30 bg-white/10 p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white/70">Hard Stop</p>
                      <h3 className="text-xl font-bold text-white">Submission Deadline</h3>
                    </div>
                  </div>
                  <CountdownDisplay targetDate={sprint.endDate} variant="large" className="justify-center" />
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.div className="rounded-xl border-2 border-white/30 bg-white/10 p-4 text-center backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <p className="text-3xl font-black text-white">{currentPoints}</p>
                    <p className="text-xs font-semibold text-white/70">Your Points</p>
                  </motion.div>
                  <motion.div className="rounded-xl border-2 border-white/30 bg-white/10 p-4 text-center backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <p className="text-3xl font-black text-white">#12</p>
                    <p className="text-xs font-semibold text-white/70">Your Rank</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard icon={Trophy} label="Total Points" value={currentPoints} sublabel={`of ${POINTS_MAX} max`} color="cyan" />
            <StatsCard icon={TrendingUp} label="Progress" value="45%" sublabel="Complete" color="green" />
            <StatsCard icon={Star} label="Rank" value="#12" sublabel="Top 15%" color="purple" />
            <StatsCard icon={Gift} label="Bonus" value="+20" sublabel="Available" color="amber" />
          </div>

          {/* Two Column: Submission + Points Roadmap */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Final Submission */}
            <BentoCard>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600">Primary</p>
                    <h3 className="text-xl font-black text-slate-800">Final Submission</h3>
                  </div>
                </div>
                <p className="mb-4 text-sm text-slate-500">Bundle your demo video, deck, repo link, and anything else the rubric asks for.</p>
                <div className="mb-4 rounded-xl border-2 border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">
                  Accepted: 1 MB – 250 MB · ZIP or PDF bundle
                </div>
                <AnimatedDropzone accept=".zip,.pdf,.mp4" maxSize={250} />
              </div>
            </BentoCard>

            {/* Right: How Scoring Works */}
            <BentoCard>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">Road to {POINTS_MAX}</h3>
                    <p className="text-sm text-slate-500">Complete tasks to earn points</p>
                  </div>
                </div>
                <AnimatedTimeline items={timelineItems} accentColor="cyan" />
              </div>
            </BentoCard>
          </div>

          {/* Leaderboard & Help Cards */}
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Leaderboard */}
            <div className="lg:col-span-2">
              <BentoCard>
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 text-amber-500" />
                      <h3 className="text-lg font-bold text-slate-800">Leaderboard</h3>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">Live rankings</span>
                  </div>
                  <div className="space-y-2">
                    {leaderboardData.map((entry, index) => (
                      <LeaderboardRow key={entry.rank} entry={entry} maxPoints={POINTS_MAX} index={index} />
                    ))}
                  </div>
                </div>
              </BentoCard>
            </div>

            {/* Help Cards */}
            <div className="lg:col-span-3">
              <h3 className="mb-4 text-lg font-bold text-slate-800">Need Help?</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <HelpCard icon={LifeBuoy} title="Mentor Help" description="Stuck on scope or tech? Request a 20-minute slot." action="Request Slot" color="cyan" />
                <HelpCard icon={FileText} title="Rubric PDF" description="Same criteria judges use — optimize against this." action="Download" color="purple" />
                <HelpCard icon={Megaphone} title="Discord" description="#build-lounge and #announcements required." action="Open Invite" color="pink" />
              </div>
            </div>
          </div>

          {/* Invite URL & Recruiter Opt-in */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Invite URL */}
            <BentoCard>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg">
                    <Share2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Invite URL</h3>
                    <p className="text-sm text-slate-500">Share your link to earn referral points</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 p-3 mb-4">
                  <code className="flex-1 truncate text-sm font-mono text-slate-700">{shareUrl}</code>
                  <CopyButton text={shareUrl} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold hover:from-cyan-600 hover:to-teal-600 shadow-lg">
                    <Copy className="h-4 w-4 mr-2" />Copy Invite
                  </Button>
                  <Button variant="outline" className="font-bold border-2 border-slate-200 hover:bg-slate-50">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </BentoCard>

            {/* Recruiter Opt-in */}
            <BentoCard>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Recruiter Opt-in</h3>
                    <p className="text-sm text-slate-500">Finalists get recruiter introductions</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <input type="text" placeholder="Company" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all" />
                  <input type="email" placeholder="Work email" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Hiring focus" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all" />
                    <input type="text" placeholder="Team size" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all" />
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold py-3 rounded-xl hover:from-slate-800 hover:to-slate-900 shadow-lg">
                  Submit Interest
                </Button>
              </div>
            </BentoCard>
          </div>

          {/* Instagram Proof */}
          <BentoCard>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] p-8">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-xl">
                    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="url(#ig-grad2)">
                      <defs>
                        <linearGradient id="ig-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433"/>
                          <stop offset="50%" stopColor="#e6683c"/>
                          <stop offset="100%" stopColor="#bc1888"/>
                        </linearGradient>
                      </defs>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70">Social Proof</p>
                    <h3 className="text-2xl font-black text-white">Post on Instagram</h3>
                    <p className="text-sm text-white/80 max-w-md">Share a public reel or post with the hashtag we emailed your captain.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="bg-white text-slate-800 font-bold px-6 py-3 rounded-full hover:bg-slate-100 shadow-lg">
                    Open Proof Task
                  </Button>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 mt-12">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm font-semibold text-slate-500">
            FirstStepHack · Sprint dashboard ·{" "}
            <a href="/" className="text-cyan-600 hover:underline">Event site</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
