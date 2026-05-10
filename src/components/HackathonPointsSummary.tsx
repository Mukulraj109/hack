import { ClipboardList, Gavel, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const scoringLanes = [
  {
    label: "Sprint tasks",
    value: "100 pts max",
    hint: "Verified tasks during the sprint window",
    Icon: ClipboardList,
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
  {
    label: "Judge score",
    value: "Up to 150",
    hint: "After submissions close — rubric-based",
    Icon: Gavel,
    color: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.5)",
    isHighlight: true,
  },
  {
    label: "Bonus lane",
    value: "+20",
    hint: "Newsletter, sponsors, surprise drops",
    Icon: Sparkles,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
] as const;

export function HackathonPointsSummary() {
  return (
    <div className="glass-scoring-container">
      {/* Animated background orbs */}
      <div className="glass-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="glass-card">
        <div className="glass-header">
          <div className="glass-title-group">
            <h2 className="glass-title">How scoring works now</h2>
            <p className="glass-subtitle">
              Rack up to 100 points during the sprint from tasks below; judges add up to 150 after submissions close.
            </p>
          </div>
          <Badge className="glass-badge">
            <span className="badge-dot"></span>
            Live rules
          </Badge>
        </div>

        <Separator className="glass-separator" />

        <div className="scoring-track">
          {scoringLanes.map(({ label, value, hint, Icon, color, glowColor, isHighlight }, index) => (
            <div key={label} className={`track-step ${isHighlight ? 'step-highlight' : ''}`}>
              {/* Connector line */}
              {index > 0 && <div className="track-connector" style={{ background: `linear-gradient(90deg, ${scoringLanes[index - 1].color}, ${color})` }}></div>}

              {/* Step node */}
              <div className="step-node-container">
                <div className="step-node" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)`, boxShadow: `0 0 30px ${glowColor}` }}>
                  <Icon className="node-icon" strokeWidth={2} />
                  <div className="node-shine"></div>
                </div>
                <div className="node-ring" style={{ borderColor: color }}></div>
              </div>

              {/* Step content */}
              <div className="step-content glassy-card" style={{ borderColor: `${color}40`, '--card-glow': glowColor }}>
                <div className="step-label" style={{ color }}>
                  <span className="step-number">0{index + 1}</span>
                  {label}
                </div>
                <div className="step-value" style={{ color }}>{value}</div>
                <p className="step-hint">{hint}</p>
                <div className="step-shimmer" style={{ background: `linear-gradient(90deg, transparent, ${color}20, transparent)` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-info-box">
          <div className="info-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <p>Verified uploads and referrals sync here — refresh after each milestone so your rank stays accurate.</p>
        </div>

        <Separator className="glass-separator" />

        <div className="glass-footer">
          <Button asChild className="glass-btn-primary">
            <a href="#hackathon-roadmap">Open roadmap</a>
          </Button>
          <Button variant="outline" asChild className="glass-btn-secondary">
            <a href="/">Back to event site</a>
          </Button>
        </div>
      </div>

      <style>{`
        .glass-scoring-container {
          position: relative;
          padding: 24px 0;
        }

        .glass-orbs {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.3));
          top: -100px;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(245, 158, 11, 0.3));
          top: 50%;
          right: -50px;
          animation-delay: -3s;
        }

        .orb-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(42, 142, 158, 0.4));
          bottom: -50px;
          left: 30%;
          animation-delay: -5s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.05); }
          50% { transform: translate(-10px, 20px) scale(0.95); }
          75% { transform: translate(30px, 10px) scale(1.02); }
        }

        .glass-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          padding: 32px;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .glass-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }

        .glass-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px;
          background: linear-gradient(135deg, #0f172a, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        .glass-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 100px;
          color: #0891b2;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #06b6d4;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .glass-separator {
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
          height: 1px;
          margin: 24px 0;
        }

        .scoring-track {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 0;
          perspective: 1000px;
        }

        .track-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-width: 0;
        }

        .track-connector {
          position: absolute;
          top: 28px;
          right: 50%;
          width: 100%;
          height: 3px;
          z-index: 0;
        }

        .step-node-container {
          position: relative;
          margin-bottom: 20px;
          z-index: 2;
        }

        .step-node {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }

        .step-node:hover {
          transform: scale(1.15) rotateY(180deg);
        }

        .node-icon {
          width: 28px;
          height: 28px;
          position: relative;
          z-index: 1;
        }

        .node-shine {
          position: absolute;
          top: 0;
          left: -50%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: skewX(-20deg);
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes shine {
          0%, 100% { left: -50%; }
          50% { left: 150%; }
        }

        .node-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px dashed;
          opacity: 0;
          animation: ring-rotate 8s linear infinite;
        }

        .step-highlight .node-ring {
          opacity: 0.5;
          animation: ring-pulse 2s ease-in-out infinite;
        }

        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ring-pulse {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.5; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.8; }
        }

        .step-content {
          width: 100%;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 24px 20px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .step-content:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px var(--card-glow, rgba(0, 0, 0, 0.15));
          background: rgba(255, 255, 255, 0.85);
        }

        .step-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .step-content:hover .step-shimmer {
          animation: shimmer-slide 2s ease-in-out infinite;
        }

        @keyframes shimmer-slide {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .step-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .step-number {
          font-size: 10px;
          padding: 2px 6px;
          background: currentColor;
          color: white !important;
          border-radius: 4px;
        }

        .step-value {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 8px;
          text-shadow: 0 2px 10px currentColor;
        }

        .step-hint {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        .step-highlight .step-content {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05));
          border-color: rgba(139, 92, 246, 0.3);
        }

        .step-highlight .step-value {
          background: linear-gradient(135deg, #8b5cf6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-info-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(226, 232, 240, 0.5);
          border-radius: 16px;
          margin-top: 24px;
        }

        .info-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 10px;
          color: #0891b2;
        }

        .glass-info-box p {
          font-size: 14px;
          color: #475569;
          margin: 0;
          line-height: 1.6;
        }

        .glass-footer {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .glass-btn-primary {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          color: white !important;
          border: none !important;
          padding: 12px 24px !important;
          font-weight: 600;
          border-radius: 12px !important;
          box-shadow: 0 4px 16px rgba(6, 182, 212, 0.3);
          transition: all 0.3s ease;
        }

        .glass-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4);
        }

        .glass-btn-secondary {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
          color: #475569 !important;
          padding: 12px 24px !important;
          font-weight: 600;
          border-radius: 12px !important;
          transition: all 0.3s ease;
        }

        .glass-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.95) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .glass-card {
            padding: 24px 20px;
          }

          .scoring-track {
            flex-direction: column;
            gap: 32px;
          }

          .track-step {
            flex-direction: row;
            gap: 20px;
            align-items: flex-start;
          }

          .track-connector {
            display: none;
          }

          .step-node-container {
            margin-bottom: 0;
          }

          .step-node {
            width: 56px;
            height: 56px;
          }

          .step-content {
            text-align: left;
            padding: 16px;
          }

          .step-value {
            font-size: 28px;
          }

          .glass-header {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
