import { useEffect, useId, useMemo, useState } from "react";
import { HackathonPointsSummary } from "./components/HackathonPointsSummary";
import { TiltCard } from "./components/TiltCard";
import {
  LayoutDashboard,
  Users,
  UploadCloud,
  FileText,
  ExternalLink,
  Copy,
  Share2,
  Megaphone,
  Clock,
  LifeBuoy,
  Trophy,
  Calendar,
  Timer,
  Medal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Align with landing page hackathon start (ET). Sprint length matches marketing copy. */
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
  return useMemo(() => {
    const end = getSprintEnd().getTime();
    const ms = Math.max(0, end - now);
    const totalSec = Math.floor(ms / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const ended = ms <= 0;
    return { ended, days, hours, minutes, seconds, endDate: getSprintEnd() };
  }, [now]);
}

/** Tasks relevant after kickoff: spot is claimed; focus is proof, invites, and judging window. */
const pointsRoadmap = [
  {
    title: "Share proof of buzz",
    description: "Post on LinkedIn or Instagram with the hashtag we emailed you. Upload a screenshot for verification.",
    points: "+50",
    action: "SUBMIT PROOF",
    accentClass: "blue",
    icon: "share",
  },
  {
    title: "Invite a builder",
    description: "Grow the cohort — share your invite link. Points apply when they register with your URL.",
    points: "+15",
    action: "COPY LINK",
    helper: "0 invited",
    accentClass: "orange",
    icon: "user-plus",
  },
  {
    title: "Checkpoint: working repo",
    description: "Link a public or invited repo so reviewers can see momentum before the final upload.",
    points: "+10",
    action: "ADD LINK",
    accentClass: "blue",
    icon: "code",
  },
  {
    title: "Judge score",
    description: "Up to 150 pts from finals demos — rubric matches what recruiters see.",
    points: "+150",
    action: null,
    helper: "After sprint ends",
    accentClass: "blue",
    icon: "trophy",
  },
  {
    title: "Bonus participation",
    description: "Newsletter, sponsor tasks, or surprise challenges — we will drop these in #announcements.",
    points: "+20",
    action: "VIEW TASKS",
    accentClass: "orange",
    icon: "gift",
  },
];

const leaderboardRows = [
  { rank: 1, team: "Cache Me Outside", points: 214, note: "Strong demo + social proof" },
  { rank: 2, team: "Prompt Pilots", points: 198, note: "Top recruiter pick" },
  { rank: 3, team: "Visa Vision", points: 181, note: "Solid submission package" },
  { rank: 12, team: "Your Team", points: 112, note: "You · sprint in progress" },
];

const announcements = [
  {
    title: "Submission deadline",
    detail: "Final ZIP or repo link locks when the sprint timer hits zero. Late drops need organizer approval.",
    icon: "timer",
  },
];

function InstagramGlyph({ className, variant }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `ig-grad-${uid}`;
  const fill = variant === "on-gradient" ? "#ffffff" : `url(#${gradId})`;
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      {variant !== "on-gradient" && (
        <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      )}
      <path
        fill={fill}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

const shareUrl = "firststephack.com/join?ref=YOURTEAM";

const POINTS_MAX = 250;

function podiumRankClass(rank) {
  if (rank === 1)
    return "border border-amber-300/90 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white shadow-md shadow-amber-900/25 ring-2 ring-amber-200/80";
  if (rank === 2)
    return "border border-slate-300 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 text-white shadow-md shadow-slate-900/15 ring-2 ring-slate-200/90";
  if (rank === 3)
    return "border border-orange-400/80 bg-gradient-to-br from-amber-800 via-orange-700 to-amber-900 text-amber-50 shadow-md shadow-orange-950/30 ring-2 ring-orange-300/60";
  return "border border-slate-200 bg-slate-100 text-slate-700 shadow-sm";
}

function podiumRowClass(rank) {
  if (rank === 1) return "border-slate-100 bg-gradient-to-r from-amber-50/90 via-white to-white";
  if (rank === 2) return "border-slate-100 bg-gradient-to-r from-slate-50/90 via-white to-white";
  if (rank === 3) return "border-slate-100 bg-gradient-to-r from-orange-50/80 via-white to-white";
  return "border-slate-100 bg-white";
}

export default function TasksPage() {
  const sprint = useSprintRemaining();

  const navItems = [
    { title: "Dashboard", href: "#top", icon: <LayoutDashboard size={18} />, active: true },
    { title: "Submission", href: "#submission-upload", icon: <UploadCloud size={18} /> },
    { title: "Roadmap", href: "#hackathon-roadmap", icon: <Trophy size={18} /> },
    { title: "Team", href: "#team-snapshot", icon: <Users size={18} /> },
    { title: "Event site", href: "/", icon: <ExternalLink size={18} /> },
  ];

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar className="glass-sidebar border-r border-slate-200">
          <SidebarHeader className="flex items-center justify-center p-4 pb-2 pt-6">
            <a href="/" className="flex w-full items-center justify-center">
              <img src="/firststep-logo.png" alt="FirstStep" className="h-8 w-auto object-contain" />
            </a>
          </SidebarHeader>
          <SidebarContent className="px-3 pt-4">
            <SidebarGroup>
              <SidebarMenu className="gap-2">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className="glass-nav-item rounded-xl px-4 py-6 font-semibold text-slate-600 transition-all hover:text-cyan-700"
                    >
                      <a href={item.href} className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-[15px]">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="mb-4 p-4">
            <a
              href="mailto:hello@firststephack.com"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <LifeBuoy size={16} />
              Support
            </a>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex min-h-screen w-full flex-col bg-[#f4f7fb]" id="top">
          <header className="glass-header sticky top-0 z-30 grid h-16 w-full shrink-0 grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-200 px-4 shadow-sm sm:h-20 sm:gap-4 md:px-10">
            <div className="flex min-w-0 items-center gap-3 sm:gap-6">
              <SidebarTrigger className="-ml-1 h-10 w-10 shrink-0 text-slate-500 hover:bg-slate-100 sm:-ml-2" />
              <h1 className="min-w-0 truncate text-lg font-extrabold tracking-tight text-slate-800 sm:text-2xl">
                Sprint dashboard
              </h1>
            </div>

            <div className="flex min-w-0 justify-end">
              <div className="glass-icon-box flex max-w-full items-center gap-2 rounded-full border border-slate-200/80 px-2 py-1.5 pr-3 sm:gap-3 sm:pr-4">
                <Avatar className="h-9 w-9 border border-slate-100 shadow-sm">
                  <AvatarImage
                    src="https://cdn.prod.website-files.com/6260849a6eab2a733e282630/6266ebaa2e775dfa13aa7676_john-carter-nav-avatar-dashboardly-webflow-template.jpg"
                    alt=""
                  />
                  <AvatarFallback className="bg-cyan-100 font-bold text-cyan-800">JC</AvatarFallback>
                </Avatar>
                <span className="max-w-[7.5rem] truncate text-sm font-semibold text-slate-800 sm:max-w-none">
                  John Carter
                </span>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-8 overflow-y-auto p-4 sm:p-6 md:p-8 lg:space-y-10 lg:p-12">
            {/* Hero — Glassmorphism design with animated orbs */}
            <section className="glass-hero relative overflow-hidden rounded-[2rem] border border-cyan-200/70 p-6 sm:p-10 md:p-12">
              {/* Animated background orbs */}
              <div className="hero-orb hero-orb-1"></div>
              <div className="hero-orb hero-orb-2"></div>
              <div className="hero-orb hero-orb-3"></div>

              <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
                <div className="min-w-0 max-w-xl lg:max-w-none">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-800 sm:text-[13px]">
                    FirstStepHack · 100-hour sprint
                  </p>
                  <h2 className="mb-5 text-balance text-3xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                    Your build window is{" "}
                    <span className="text-cyan-600">live.</span>
                  </h2>
                  <p className="max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                    Ship your demo, upload artifacts, and rack up pre-judge points before finals. Everything here is
                    tuned for teams already checked in.
                  </p>
                  <div
                    id="team-snapshot"
                    className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-cyan-200/80 bg-white px-4 py-3.5 text-sm shadow-sm"
                  >
                    <span className="font-semibold text-slate-900">Team AI Career Agent</span>
                    <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
                    <span className="text-slate-700">
                      Points{" "}
                      <span className="font-bold tabular-nums text-slate-900">112</span>
                      <span className="text-slate-400"> / </span>
                      <span className="font-semibold tabular-nums text-slate-800">250</span>
                    </span>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                    <Button
                      asChild
                      size="lg"
                      variant="default"
                      className="glass-btn-primary h-12 rounded-full border-0 bg-none bg-gradient-to-r from-teal-600 to-cyan-600 px-8 text-base font-bold text-white shadow-lg shadow-teal-900/25 ring-2 ring-white/30 hover:from-teal-500 hover:to-cyan-500 hover:text-white focus-visible:ring-white/60"
                    >
                      <a href="#submission-upload" className="text-white">
                        Upload submission
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="glass-btn-secondary h-12 rounded-full border-2 border-slate-300 bg-white px-8 text-base font-bold text-slate-800 shadow-sm hover:bg-slate-50 hover:text-slate-900"
                    >
                      <a href="#hackathon-roadmap">Score more points</a>
                    </Button>
                  </div>
                </div>

                <div className="relative z-10 min-w-0 w-full lg:justify-self-end">
                  <Card className="glass-timer-card overflow-hidden border-2 border-slate-200/50 text-slate-900">
                    <CardHeader className="space-y-1 border-b border-slate-200/50 bg-white/50 pb-4">
                      {sprint.ended ? (
                        <>
                          <CardTitle className="text-lg font-bold text-amber-900">Sprint ended</CardTitle>
                          <CardDescription className="text-slate-600">
                            Upload your final package — window closed.
                          </CardDescription>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
                            <Clock className="h-4 w-4 shrink-0 text-cyan-700" aria-hidden />
                            Time left in sprint
                          </div>
                          <CardTitle className="sr-only">Countdown</CardTitle>
                        </>
                      )}
                    </CardHeader>
                    <CardContent className="pt-6">
                      {sprint.ended ? (
                        <p className="text-center text-sm font-medium text-slate-800">
                          Closed {sprint.endDate.toLocaleString()}
                        </p>
                      ) : (
                        <>
                          <div className="grid grid-cols-4 gap-2 sm:gap-3">
                            {[
                              { v: sprint.days, label: "Days" },
                              { v: sprint.hours, label: "Hrs" },
                              { v: sprint.minutes, label: "Min" },
                              { v: sprint.seconds, label: "Sec" },
                            ].map((seg) => (
                              <div
                                key={seg.label}
                                className="glass-timer-segment rounded-xl border border-slate-200/60 px-1 py-3 text-center sm:py-4"
                              >
                                <div className="font-mono text-2xl font-black tabular-nums leading-none text-slate-900 sm:text-3xl">
                                  {String(seg.v).padStart(2, "0")}
                                </div>
                                <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                  {seg.label}
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="mt-6 text-center text-sm font-medium text-slate-600">
                            Ends{" "}
                            <span className="font-semibold text-slate-900">{sprint.endDate.toLocaleString()}</span>
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div
                className="pointer-events-none absolute -right-16 top-1/2 z-0 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-cyan-300/25 blur-[80px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 z-0 h-[220px] w-[220px] translate-x-[-25%] translate-y-[30%] rounded-full bg-sky-300/25 blur-[70px]"
                aria-hidden
              />
            </section>

            {/* Announcements */}
            <section className="grid gap-6 md:grid-cols-2 md:gap-8">
              {announcements.map((a) => {
                const Icon = a.icon === "calendar" ? Calendar : Timer;
                const deadline = a.icon === "timer";
                return (
                  <Card
                    key={a.title}
                    className={`glass-deadline-card group relative gap-0 overflow-hidden py-0 transition-all hover:shadow-xl ${
                      deadline
                        ? "border-amber-200/50"
                        : "border-sky-200/50"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-50 blur-2xl ${
                        deadline ? "bg-amber-400" : "bg-sky-400"
                      }`}
                      aria-hidden
                    />
                    <CardHeader className="relative flex flex-row items-start gap-5 px-6 pb-2 pt-8 sm:gap-6 sm:px-8 sm:pt-10">
                      <div
                        className={`glass-icon-box flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                          deadline ? "text-amber-600" : "text-sky-600"
                        }`}
                      >
                        <Icon className="h-8 w-8" strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                        <CardDescription className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
                          {deadline ? "Hard stop" : "Live sessions"}
                        </CardDescription>
                        <CardTitle className="text-xl font-bold leading-snug text-slate-900 sm:text-[1.35rem]">
                          {a.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="relative px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
                      <p className="text-[15px] leading-relaxed text-slate-700">{a.detail}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </section>

            {/* Submission first — primary job during sprint */}
            <section
              id="submission-upload"
              className="glass-submission-card relative overflow-hidden rounded-3xl border border-cyan-200/60 p-8 md:p-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative z-10 flex flex-col items-center gap-12 lg:flex-row">
                <div className="flex-1">
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-700">Primary</div>
                  <div className="mb-4 text-3xl font-extrabold text-slate-900">Final submission</div>
                  <p className="mb-6 text-lg font-medium leading-relaxed text-slate-600">
                    Bundle your demo video, deck, repo link, and anything else the rubric asks for. You can re-upload
                    until the sprint timer hits zero.
                  </p>
                  <div className="glass-badge mb-4 inline-block rounded-2xl border border-cyan-200 px-4 py-3 text-sm font-bold text-cyan-900">
                    Accepted size: 1 MB – 250 MB · ZIP or PDF bundle
                  </div>
                  <p className="text-sm text-slate-400">
                    Tip: name files <code className="rounded bg-slate-100 px-1.5 py-0.5">TeamName_track.zip</code> for
                    faster review.
                  </p>
                </div>
                <div className="relative w-full flex-1">
                  <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 opacity-60 blur-xl" />
                  <div className="glass-dropzone relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-300/50 p-10 backdrop-blur-xl transition-all md:p-12">
                    <div className="glass-icon-box mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-200/50 text-cyan-600 transition-transform group-hover:scale-110">
                      <UploadCloud size={40} strokeWidth={1.5} />
                    </div>
                    <strong className="mb-2 text-2xl font-extrabold text-slate-800">Drag & drop</strong>
                    <span className="mb-8 max-w-sm text-center text-base font-medium text-slate-500">
                      PDF, ZIP, MP4, or combined archive
                    </span>
                    <button
                      type="button"
                      className="rounded-full bg-cyan-600 px-8 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-cyan-900/30"
                    >
                      Browse files
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <HackathonPointsSummary />

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              <div id="hackathon-roadmap" className="glass-roadmap-card scroll-mt-28 rounded-3xl border border-slate-200/50 p-6 md:p-8">
                <div className="mb-8">
                  <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="text-2xl font-extrabold text-slate-800">Road to 250 points</div>
                    <span className="glass-badge rounded-full border border-cyan-100 px-4 py-1.5 text-sm font-bold text-cyan-700">
                      112 / 250 points
                    </span>
                  </div>
                  <p className="mb-4 font-medium text-slate-500">
                    Social proof and referrals still count during the sprint. Judge points unlock after submissions close.
                  </p>
                  <Progress value={45} className="h-4 overflow-hidden rounded-full bg-slate-100 shadow-inner [&>div]:bg-cyan-500" />
                </div>

                <div className="points-roadmap">
                  <div className="roadmap-track"></div>
                  {pointsRoadmap.map((item, index) => (
                    <div key={item.title} className="roadmap-item">
                      <div className={`roadmap-milestone ${item.accentClass}`}>
                        <div className="milestone-icon">
                          {item.icon === "share" && <Share2 className="h-5 w-5" strokeWidth={2} />}
                          {item.icon === "user-plus" && <Users className="h-5 w-5" strokeWidth={2} />}
                          {item.icon === "code" && <FileText className="h-5 w-5" strokeWidth={2} />}
                          {item.icon === "trophy" && <Trophy className="h-5 w-5" strokeWidth={2} />}
                          {item.icon === "gift" && <Medal className="h-5 w-5" strokeWidth={2} />}
                        </div>
                        <div className="milestone-pulse"></div>
                      </div>
                      <div className="roadmap-content glass-roadmap-card">
                        <div className="roadmap-header">
                          <h3 className="roadmap-title">{item.title}</h3>
                          <span className={`roadmap-points ${item.accentClass}`}>{item.points}</span>
                        </div>
                        <p className="roadmap-desc">{item.description}</p>
                        <div className="roadmap-footer">
                          <span className="roadmap-helper">{item.helper || "\u00A0"}</span>
                          {item.action && (
                            <a href="#" className="roadmap-action">{item.action}</a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-leaderboard-card flex h-fit w-full min-w-0 flex-col self-start rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10">
                <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="glass-icon-box flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
                      <Trophy className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.65rem]">Leaderboard</div>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
                        Live standings · top teams by verified points
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
                    <span className="glass-badge rounded-full border border-cyan-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-cyan-800">
                      {POINTS_MAX} pts max
                    </span>
                  </div>
                </div>

                <div className="min-w-0 rounded-2xl border border-slate-200/50 bg-white/50 p-3 sm:p-4 md:p-5">
                  <Table className="table-fixed">
                    <TableHeader>
                      <TableRow className="border-slate-200/80 hover:bg-transparent">
                        <TableHead className="h-12 w-[96px] px-3 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400 sm:h-14 sm:w-[108px] sm:px-4">
                          Rank
                        </TableHead>
                        <TableHead className="h-12 min-w-0 px-3 text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400 sm:h-14 sm:px-4">
                          Team
                        </TableHead>
                        <TableHead className="h-12 w-[9rem] px-3 text-right text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400 sm:h-14 sm:w-[10rem] sm:px-4 md:pr-8">
                          Points
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboardRows.map((row) => {
                        const isYou = row.team === "Your Team";
                        const topThree = row.rank <= 3;
                        return (
                          <TableRow
                            key={`${row.rank}-${row.team}`}
                            className={`glass-table-row border-slate-100 transition-all ${
                              isYou
                                ? "bg-gradient-to-r from-cyan-50 via-cyan-50/70 to-white shadow-[inset_4px_0_0_0_rgb(6,182,212)] hover:from-cyan-50/95"
                                : `${podiumRowClass(row.rank)} hover:shadow-lg`
                            }`}
                          >
                            <TableCell className="align-middle py-5 pl-3 pr-2 text-center sm:py-6 sm:pl-4">
                              <span
                                className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-black tabular-nums sm:h-12 sm:w-12 ${podiumRankClass(row.rank)}`}
                              >
                                {row.rank}
                              </span>
                            </TableCell>
                            <TableCell className="max-w-[1px] whitespace-normal py-5 align-middle sm:py-6 sm:pr-2 md:pr-4">
                              <div className="flex items-start gap-3">
                                {topThree && (
                                  <Medal
                                    className={`mt-0.5 h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5 ${
                                      row.rank === 1
                                        ? "text-amber-500"
                                        : row.rank === 2
                                          ? "text-slate-400"
                                          : "text-orange-600"
                                    }`}
                                    strokeWidth={2}
                                    aria-hidden
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2 gap-y-1">
                                    <span className="text-[17px] font-bold leading-snug text-slate-900">{row.team}</span>
                                    {isYou && (
                                      <span className="rounded-full bg-cyan-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                        You
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1.5 text-sm font-medium leading-relaxed text-slate-500">{row.note}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-5 pl-4 text-right align-middle sm:py-6 sm:pl-6 md:pl-8 md:pr-7">
                              <div className="inline-flex min-w-[4.5rem] flex-col items-end gap-1 sm:min-w-[5rem]">
                                <span className="text-[26px] font-black tabular-nums leading-none tracking-tight text-cyan-700 sm:text-[28px]">
                                  {row.points}
                                </span>
                                <span className="text-xs font-semibold tabular-nums text-slate-400">/ {POINTS_MAX}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Mid-sprint help — replaces generic marketing cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <TiltCard className="h-full">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:border-cyan-200 hover:shadow-lg">
                  <div>
                    <LifeBuoy className="mb-4 h-8 w-8 text-cyan-600" />
                    <div className="mb-3 text-xl font-extrabold text-slate-800">Mentor help</div>
                    <div className="leading-relaxed text-slate-600">
                      Stuck on scope or tech? Request a 20‑minute slot — we prioritize teams blocked on shipping.
                    </div>
                  </div>
                  <a
                    href="#"
                    className="mt-8 block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-center text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800"
                  >
                    Request slot
                  </a>
                </div>
              </TiltCard>
              <TiltCard className="h-full">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:border-cyan-200 hover:shadow-lg">
                  <div>
                    <FileText className="mb-4 h-8 w-8 text-cyan-600" />
                    <div className="mb-3 text-xl font-extrabold text-slate-800">Rubric PDF</div>
                    <div className="leading-relaxed text-slate-600">
                      Same criteria judges and recruiter partners use — optimize your README and demo against this.
                    </div>
                  </div>
                  <a
                    href="#"
                    className="mt-8 block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-center text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800"
                  >
                    Download
                  </a>
                </div>
              </TiltCard>
              <TiltCard className="h-full">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:border-cyan-200 hover:shadow-lg">
                  <div>
                    <Megaphone className="mb-4 h-8 w-8 text-cyan-600" />
                    <div className="mb-3 text-xl font-extrabold text-slate-800">Discord</div>
                    <div className="leading-relaxed text-slate-600">
                      #build-lounge and #announcements are required reading during the sprint.
                    </div>
                  </div>
                  <a
                    href="#"
                    className="mt-8 block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-center text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800"
                  >
                    Open invite
                  </a>
                </div>
              </TiltCard>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-3 text-2xl font-extrabold text-slate-800">Invite URL</div>
                <p className="mb-6 font-medium text-slate-600">
                  Still earning referral points — share your link anywhere builders hang out.
                </p>
                <div className="mb-8 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-5 pr-4 font-mono text-sm text-slate-700 shadow-inner sm:text-base">
                  <span className="min-w-0 truncate">{shareUrl}</span>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-slate-200 bg-white p-2 text-slate-400 shadow-sm transition-colors hover:text-cyan-600 hover:shadow"
                    aria-label="Copy URL"
                  >
                    <Copy size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-cyan-700 sm:min-w-[140px]"
                  >
                    <Copy size={18} /> Copy invite
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-[#084e96] sm:min-w-[140px]"
                  >
                    <Share2 size={18} /> LinkedIn
                  </a>
                </div>
                <p className="mt-4 text-xs font-medium text-slate-400">
                  Instagram proof lives in its own card below — same hashtag rules apply.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-3 text-2xl font-extrabold text-slate-800">Recruiter opt‑in</div>
                <p className="mb-6 font-medium text-slate-600">
                  Finalists get recruiter introductions. Drop your company here if you hire from this cohort.
                </p>
                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 py-3 font-medium text-slate-500 px-4">
                    Company
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 py-3 font-medium text-slate-500 px-4">
                    Work email
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 py-3 font-medium text-slate-500 px-4">
                    Hiring focus
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 py-3 font-medium text-slate-500 px-4">
                    Team size
                  </div>
                </div>
                <a
                  href="#"
                  className="block w-full rounded-xl bg-slate-800 py-3.5 text-center text-lg font-bold text-white shadow-md transition-colors hover:bg-slate-900"
                >
                  Submit interest
                </a>
              </div>
            </div>

            {/* Instagram proof — distinct branded strip */}
            <section
              id="instagram-proof"
              className="relative overflow-hidden rounded-3xl p-[2px] shadow-lg"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <div className="relative flex flex-col gap-8 rounded-[22px] bg-white p-8 md:flex-row md:items-center md:justify-between md:gap-12 md:p-10">
                <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-pink-100/80 to-orange-50 blur-3xl" />
                <div className="relative flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-center md:gap-8">
                  <div className="relative mx-auto shrink-0 md:mx-0">
                    <div
                      className="flex h-[88px] w-[88px] items-center justify-center rounded-[28px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[3px] shadow-md"
                      aria-hidden
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-[25px] bg-white">
                        <InstagramGlyph className="h-11 w-11" />
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 text-center md:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Social proof</div>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      Post proof on Instagram
                    </h2>
                    <p className="mt-2 max-w-xl text-base font-medium leading-relaxed text-slate-600">
                      Share a public reel or post with the hashtag we emailed your captain. Then upload a screenshot on
                      the roadmap task so we can verify points — classic IG framing, no confusing icons.
                    </p>
                  </div>
                </div>
                <div className="relative flex shrink-0 flex-col items-stretch gap-3 sm:flex-row md:flex-col lg:items-end">
                  <a
                    href="#hackathon-roadmap"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] px-6 py-3.5 text-center text-sm font-bold text-white shadow-md transition-opacity hover:opacity-95"
                  >
                    <InstagramGlyph className="h-5 w-5" variant="on-gradient" />
                    Open proof task
                  </a>
                  <span className="text-center text-xs font-medium text-slate-400 md:text-right">
                    Tip: tag @firststephack if your handle is public.
                  </span>
                </div>
              </div>
            </section>
          </main>

          <footer className="mt-auto border-t border-slate-200 bg-white py-6">
            <div className="text-center text-sm font-semibold text-slate-500">
              FirstStepHack · Sprint dashboard ·{" "}
              <a href="/" className="text-cyan-600 hover:underline">
                Event site
              </a>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>

      <style>{`
        .w-webflow-badge { display: none !important; }

        /* Glassmorphism Base Classes */
        .glass-sidebar {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.5) !important;
        }

        .glass-nav-item {
          background: rgba(255, 255, 255, 0.5) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          transition: all 0.3s ease !important;
        }

        .glass-nav-item:hover {
          background: rgba(255, 255, 255, 0.8) !important;
          border-color: rgba(6, 182, 212, 0.3) !important;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.15);
          transform: translateX(4px);
        }

        .glass-nav-item[data-active="true"] {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(8, 145, 178, 0.1)) !important;
          border-color: rgba(6, 182, 212, 0.4) !important;
        }

        .glass-header {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(6, 182, 212, 0.15) !important;
        }

        .glass-hero {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        }

        .glass-timer-card {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(6, 182, 212, 0.25) !important;
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        }

        .glass-timer-segment {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.6) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
        }

        .glass-deadline-card {
          background: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(245, 158, 11, 0.25) !important;
          box-shadow: 0 8px 32px rgba(245, 158, 11, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        }

        .glass-submission-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(6, 182, 212, 0.2) !important;
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        }

        .glass-dropzone {
          background: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(12px);
          border: 2px dashed rgba(6, 182, 212, 0.4) !important;
          transition: all 0.3s ease !important;
        }

        .glass-dropzone:hover {
          background: rgba(255, 255, 255, 0.85) !important;
          border-color: rgba(6, 182, 212, 0.6) !important;
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.2) !important;
        }

        .glass-roadmap-card {
          background: rgba(248, 250, 252, 0.8) !important;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.6) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        .glass-roadmap-card:hover {
          background: rgba(255, 255, 255, 0.95) !important;
          transform: translateX(6px) !important;
          box-shadow: 0 12px 32px rgba(6, 182, 212, 0.15) !important;
        }

        .glass-leaderboard-card {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.5) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06) !important;
        }

        .glass-table-row {
          background: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.4) !important;
          transition: all 0.3s ease !important;
        }

        .glass-table-row:hover {
          background: rgba(255, 255, 255, 0.9) !important;
          box-shadow: 0 4px 16px rgba(6, 182, 212, 0.1) !important;
        }

        .glass-btn-primary {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(8, 145, 178, 0.9)) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(6, 182, 212, 0.5) !important;
          box-shadow: 0 4px 16px rgba(6, 182, 212, 0.3) !important;
          transition: all 0.3s ease !important;
        }

        .glass-btn-primary:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4) !important;
        }

        .glass-btn-secondary {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.6) !important;
          transition: all 0.3s ease !important;
        }

        .glass-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.9) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
        }

        .glass-icon-box {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.5) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
        }

        .glass-badge {
          background: rgba(6, 182, 212, 0.1) !important;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
        }

        /* Animated Orbs */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: float-orb 10s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-orb-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(8, 145, 178, 0.3));
          top: -100px;
          right: 10%;
          animation-delay: 0s;
        }

        .hero-orb-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.3));
          bottom: 20%;
          left: 5%;
          animation-delay: -3s;
        }

        .hero-orb-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(8, 145, 178, 0.4), rgba(42, 142, 158, 0.3));
          top: 40%;
          right: 30%;
          animation-delay: -6s;
        }

        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.05); }
          50% { transform: translate(-10px, 20px) scale(0.95); }
          75% { transform: translate(30px, 10px) scale(1.02); }
        }

        /* Points Roadmap */
        .points-roadmap {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .roadmap-track {
          position: absolute;
          left: 28px;
          top: 28px;
          bottom: 28px;
          width: 3px;
          background: linear-gradient(180deg, #06b6d4, #0891b2, #2a8e9e);
          border-radius: 2px;
          z-index: 0;
        }

        .roadmap-item {
          display: flex;
          gap: 24px;
          position: relative;
          padding-bottom: 28px;
        }

        .roadmap-item:last-child {
          padding-bottom: 0;
        }

        .roadmap-milestone {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .roadmap-milestone.blue {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .roadmap-milestone.orange {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }

        .roadmap-item:hover .roadmap-milestone {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .milestone-icon {
          color: white;
          z-index: 1;
        }

        .milestone-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid currentColor;
          opacity: 0;
          animation: pulse 2s ease-out infinite;
        }

        .roadmap-milestone.blue .milestone-pulse {
          border-color: #06b6d4;
        }

        .roadmap-milestone.orange .milestone-pulse {
          border-color: #f97316;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .roadmap-content {
          flex: 1;
          background: #f8fafc;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }

        .roadmap-item:hover .roadmap-content {
          background: white;
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .roadmap-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 8px;
        }

        .roadmap-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .roadmap-points {
          font-size: 13px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
        }

        .roadmap-points.blue {
          background: #cffafe;
          color: #0e7490;
        }

        .roadmap-points.orange {
          background: #ffedd5;
          color: #c2410c;
        }

        .roadmap-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 12px;
        }

        .roadmap-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }

        .roadmap-helper {
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
        }

        .roadmap-action {
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 8px;
          background: white;
          border: 1px solid #e2e8f0;
          color: #475569;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .roadmap-action:hover {
          background: #06b6d4;
          border-color: #06b6d4;
          color: white;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }

        @media (max-width: 640px) {
          .roadmap-track {
            left: 24px;
          }

          .roadmap-milestone {
            width: 48px;
            height: 48px;
          }

          .roadmap-content {
            padding: 16px;
          }

          .roadmap-title {
            font-size: 14px;
          }
        }

        .scoring-timeline {
          display: flex;
          align-items: flex-start;
          gap: 0;
          position: relative;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .timeline-track {
          position: absolute;
          top: 28px;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #06b6d4, #0891b2, #2a8e9e);
          border-radius: 2px;
          z-index: 0;
        }

        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          min-width: 140px;
          position: relative;
          z-index: 1;
        }

        .timeline-node {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 3px solid #06b6d4;
          color: #06b6d4;
          box-shadow: 0 4px 16px rgba(6, 182, 212, 0.2);
          transition: all 0.3s ease;
          margin-bottom: 16px;
        }

        .timeline-node.node-highlight {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: white;
          border-color: transparent;
          box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4);
        }

        .timeline-step:hover .timeline-node {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(6, 182, 212, 0.3);
        }

        .timeline-card {
          width: 100%;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid;
        }

        .timeline-step:hover .timeline-card {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .timeline-connector {
          position: absolute;
          top: 42px;
          right: -12px;
          display: flex;
          align-items: center;
          z-index: 2;
        }

        .connector-line {
          width: 24px;
          height: 3px;
          background: linear-gradient(90deg, #06b6d4, #0891b2);
          border-radius: 2px;
        }

        .connector-arrow {
          font-size: 18px;
          font-weight: bold;
          color: #0891b2;
          margin-left: 4px;
        }

        @media (max-width: 640px) {
          .scoring-timeline {
            flex-direction: column;
            gap: 16px;
          }

          .timeline-track {
            display: none;
          }

          .timeline-step {
            flex-direction: row;
            gap: 16px;
            align-items: flex-start;
          }

          .timeline-node {
            margin-bottom: 0;
            flex-shrink: 0;
          }

          .timeline-card {
            text-align: left;
          }

          .timeline-connector {
            display: none;
          }
        }
      `}</style>
    </TooltipProvider>
  );
}
