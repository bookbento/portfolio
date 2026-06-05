"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  TEAM,
  PIPELINES,
  FLOW_ORDER,
  EXAMPLE_TASKS,
  PORTRAIT_GRADIENTS,
  AGENT_IMAGES,
  type Agent,
  type Pipeline,
} from "@/constants/ai-team-data";

type PageTab = "team" | "pipeline";
type NodeStatus = "active" | "done" | "pending";

interface AiTeamViewProps {
  fontVars: string;
}

// ---- AgentCard ----

interface AgentCardProps {
  agent: Agent;
  index: number;
  total: number;
  onOpen: (id: string) => void;
}

function AgentCard({ agent, index, total, onOpen }: AgentCardProps) {
  const pipelineMeta = PIPELINES.find((p) => p.id === agent.pipeline);
  const portrait = AGENT_IMAGES[agent.id];
  const grad = PORTRAIT_GRADIENTS[agent.id] ?? ["#222", "#444", "#666"];
  const monogram = (agent.handle[0] ?? "?").toUpperCase();

  return (
    <button
      className="card"
      style={
        {
          "--g0": grad[0],
          "--g1": grad[1],
          "--g2": grad[2],
          "--pipeline-dot": pipelineMeta?.dot ?? "#666",
        } as React.CSSProperties
      }
      onClick={() => onOpen(agent.id)}
      aria-label={`Open details for ${agent.handle}, ${agent.title}`}
    >
      <div className="card-portrait">
        {portrait && (
          <Image
            src={portrait}
            alt={agent.handle}
            fill
            className="object-cover object-top"
            sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, (max-width: 1100px) 33vw, 25vw"
          />
        )}
      </div>
      <div className="card-monogram" aria-hidden="true">
        {monogram}
      </div>

      <div className="card-meta">
        <span className="index">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="pipeline">
          <span className="dot" />
          {agent.pipeline}
        </span>
      </div>

      <div className="card-name">
        <div className="name">{agent.handle}</div>
        <div className="role">{agent.title}</div>
      </div>

      <div className="card-info">
        <div className="card-info-top">
          <div className="role-block">
            <div className="role-label">{agent.pipeline}</div>
            <div className="role-title">{agent.title}</div>
          </div>
          <div className="quote">{agent.tagline}</div>
        </div>
        <div className="cta">
          <span>Open profile</span>
          <span className="arrow" />
        </div>
      </div>
    </button>
  );
}

// ---- AgentModal ----

interface AgentModalProps {
  agentId: string | null;
  onClose: () => void;
}

function AgentModal({ agentId, onClose }: AgentModalProps) {
  const agent = TEAM.find((a) => a.id === agentId) ?? null;
  const isOpen = agent !== null;

  // Keep last-rendered agent around during close transition (ref latch — no extra render)
  const shownRef = useRef<Agent | null>(agent);
  if (agent) shownRef.current = agent;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const a = agent ?? shownRef.current;
  if (!a) return null;

  const pipelineMeta = PIPELINES.find((p) => p.id === a.pipeline);
  const portrait = AGENT_IMAGES[a.id];
  const grad = PORTRAIT_GRADIENTS[a.id] ?? ["#222", "#444", "#666"];
  const monogram = (a.handle[0] ?? "?").toUpperCase();
  const agentIndex = TEAM.findIndex((t) => t.id === a.id);

  const wf = a.workflow;

  const fmtList = (arr: string[]) => {
    if (!arr || arr.length === 0)
      return <span className="none">—</span>;
    return arr.map((h, i) => (
      <span key={h + String(i)}>
        {i > 0 && <span className="arrow"> · </span>}
        <span>{h}</span>
      </span>
    ));
  };

  return (
    <>
      <div
        className="scrim"
        data-open={isOpen ? "true" : "false"}
        onClick={onClose}
      />
      <div
        className="modal"
        data-layout="modal"
        data-open={isOpen ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={
          {
            "--g0": grad[0],
            "--g1": grad[1],
            "--g2": grad[2],
            "--pipeline-dot": pipelineMeta?.dot ?? "#666",
          } as React.CSSProperties
        }
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 2 L12 12 M12 2 L2 12" />
          </svg>
        </button>

        <div className="modal-body">
          <div className="modal-portrait">
            {portrait && (
              <Image
                src={portrait}
                alt={a.handle}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            )}
            <div className="meta-top">
              <span>
                Profile · {String(agentIndex + 1).padStart(2, "0")} /{" "}
                {String(TEAM.length).padStart(2, "0")}
              </span>
              <span className="pipeline">
                <span className="dot" />
                {a.pipeline}
              </span>
            </div>
            <div className="meta-bottom">
              <div className="name" id="modal-title">
                {a.handle}
              </div>
              <div className="file">{a.file}</div>
            </div>
          </div>

          <div className="modal-content">
            <div className="title-block">
              <h2 className="section-h">Role</h2>
              <p className="title">{a.title}</p>
              <p className="summary">{a.summary}</p>
            </div>

            <div>
              <h3 className="section-h">Personality</h3>
              <div className="tag-list">
                {a.personality.map((p) => (
                  <span className="tag" key={p}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="section-h">Workflow</h3>
              <div className="workflow-block">
                <div className="workflow-row">
                  <span className="lbl">Receives from</span>
                  <span className="val">{fmtList(wf.receivesFrom)}</span>
                </div>
                <div className="workflow-row">
                  <span className="lbl">Hands off to</span>
                  <span className="val">{fmtList(wf.handsOffTo)}</span>
                </div>
                <div className="workflow-row">
                  <span className="lbl">Stage role</span>
                  <span
                    className="val"
                    style={{
                      fontSize: 15,
                      fontStyle: "normal",
                      fontFamily: "var(--font-sans)",
                      color: "var(--at-ink-soft)",
                      lineHeight: 1.5,
                    }}
                  >
                    {wf.role}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="section-h">Tools &amp; models</h3>
              <div className="tool-list">
                {a.tools.map((t) => (
                  <span className="tool" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="stats-row">
              <div className="stat">
                <div className="num">{a.stats.handled}</div>
                <div className="lbl">Tasks handled</div>
              </div>
              <div className="stat">
                <div className="num">{a.stats.uptime}</div>
                <div className="lbl">Uptime</div>
              </div>
              <div className="stat">
                <div className="num">{a.stats.avgRouting}</div>
                <div className="lbl">Avg time on stage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ---- FlowNode ----

interface FlowNodeProps {
  agent: Agent;
  status: NodeStatus;
}

function FlowNode({ agent, status }: FlowNodeProps) {
  const pipelineMeta = PIPELINES.find((p) => p.id === agent.pipeline);
  return (
    <div
      className={`flow-node${status === "active" ? " active" : ""}${status === "done" ? " done" : ""}`}
      style={{ "--dot": pipelineMeta?.dot ?? "#666" } as React.CSSProperties}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="handle">{agent.pipeline.toLowerCase()}</span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: pipelineMeta?.dot ?? "#666",
            opacity: status === "active" ? 1 : 0.55,
          }}
        />
      </div>
      <div className="name">{agent.handle}</div>
      <div className="role">{agent.title}</div>
    </div>
  );
}

// ---- FlowLegend ----

function FlowLegend() {
  return (
    <div className="flow-legend">
      <span className="item">
        <span className="dot" style={{ background: "var(--at-accent)" }} />
        Active
      </span>
      <span className="item">
        <span className="dot" style={{ background: "var(--at-ink-faint)", opacity: 0.5 }} />
        Visited
      </span>
      <span className="item">
        <span className="dot" style={{ background: "var(--at-line)" }} />
        Pending
      </span>
      <div style={{ flex: 1 }} />
      {PIPELINES.map((p: Pipeline) => (
        <span key={p.id} className="item">
          <span className="dot" style={{ background: p.dot }} />
          {p.label}
        </span>
      ))}
    </div>
  );
}

// ---- GraphDiagram ----

interface DiagramProps {
  currentAgentId: string;
  stageIdx: number;
}

function GraphDiagram({ currentAgentId, stageIdx }: DiagramProps) {
  const W = 1240;
  const H = 540;
  const W_NODE = 180;
  const H_NODE = 78;

  const layout: Record<string, { x: number; y: number }> = {
    palm: { x: 530, y: 0 },
    utahime: { x: 530, y: 100 },
    nitta: { x: 530, y: 200 },
    "code-viview": { x: 40, y: 310 },
    fondy: { x: 270, y: 310 },
    benji: { x: 500, y: 310 },
    ieiri: { x: 730, y: 310 },
    "the-end": { x: 960, y: 200 },
    "silent-hunter": { x: 960, y: 100 },
    "performante-optimizer": { x: 960, y: 0 },
  };

  type Side = "top" | "bottom" | "left" | "right";
  const center = (id: string, side: Side) => {
    const p = layout[id];
    if (!p) return { x: 0, y: 0 };
    if (side === "right") return { x: p.x + W_NODE, y: p.y + H_NODE / 2 };
    if (side === "left") return { x: p.x, y: p.y + H_NODE / 2 };
    if (side === "top") return { x: p.x + W_NODE / 2, y: p.y };
    return { x: p.x + W_NODE / 2, y: p.y + H_NODE };
  };

  const edgeSpecs: Array<{ from: string; to: string; sides: [Side, Side] }> = [
    { from: "palm", to: "utahime", sides: ["bottom", "top"] },
    { from: "utahime", to: "nitta", sides: ["bottom", "top"] },
    { from: "nitta", to: "code-viview", sides: ["bottom", "top"] },
    { from: "code-viview", to: "fondy", sides: ["right", "left"] },
    { from: "fondy", to: "benji", sides: ["right", "left"] },
    { from: "benji", to: "ieiri", sides: ["right", "left"] },
    { from: "ieiri", to: "the-end", sides: ["top", "bottom"] },
    { from: "the-end", to: "silent-hunter", sides: ["top", "bottom"] },
    { from: "silent-hunter", to: "performante-optimizer", sides: ["top", "bottom"] },
    { from: "performante-optimizer", to: "palm", sides: ["top", "right"] },
  ];

  const litEdgeIdx = stageIdx - 1 >= 0 ? stageIdx - 1 : -1;

  return (
    <div className="flow-diagram">
      <div className="flow-graph" style={{ minHeight: H + 20, position: "relative" }}>
        <svg
          className="edges"
          viewBox={`0 0 ${W} ${H + 20}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: H + 20 }}
        >
          {edgeSpecs.map((spec, i) => {
            const a = center(spec.from, spec.sides[0]);
            const b = center(spec.to, spec.sides[1]);
            const isReturn =
              spec.from === "performante-optimizer" && spec.to === "palm";
            let d: string;
            if (isReturn) {
              d = `M ${a.x} ${a.y} L ${a.x} ${a.y - 40} L ${b.x + 30} ${a.y - 40} L ${b.x + 30} ${b.y} L ${b.x} ${b.y}`;
            } else {
              d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
            }
            const isLit = i === litEdgeIdx;
            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke={isLit ? "var(--at-accent)" : "var(--at-line)"}
                  strokeWidth={isLit ? 2 : 1.25}
                  strokeDasharray={isReturn ? "4 4" : "0"}
                  style={{ transition: "stroke 240ms ease, stroke-width 240ms ease" }}
                />
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={isLit ? 4 : 2.5}
                  fill={isLit ? "var(--at-accent)" : "var(--at-ink-faint)"}
                  style={{ transition: "all 240ms ease" }}
                />
              </g>
            );
          })}
        </svg>

        {TEAM.map((agent) => {
          const p = layout[agent.id];
          if (!p) return null;
          const firstIdx = FLOW_ORDER.indexOf(agent.id);
          const lastIdx = FLOW_ORDER.lastIndexOf(agent.id);
          let status: NodeStatus = "pending";
          if (agent.id === currentAgentId) status = "active";
          else if (stageIdx > lastIdx) status = "done";
          else if (stageIdx > firstIdx) status = "done";
          return (
            <div
              key={agent.id}
              className="node-abs"
              style={{
                left: `${(p.x / W) * 100}%`,
                top: p.y,
                width: `${(W_NODE / W) * 100}%`,
                maxWidth: W_NODE,
              }}
            >
              <FlowNode agent={agent} status={status} />
            </div>
          );
        })}
      </div>
      <FlowLegend />
    </div>
  );
}

// ---- TeamGridSection ----

interface TeamGridSectionProps {
  onOpen: (id: string) => void;
}

function TeamGridSection({ onOpen }: TeamGridSectionProps) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const toggleFilter = useCallback((id: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    if (activeFilters.size === 0) return TEAM;
    return TEAM.filter((a) => activeFilters.has(a.pipeline));
  }, [activeFilters]);

  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow eyebrow">Creator team credits</div>
        <h1 className="hero-title">
          Code doesn&apos;t ship alone.
          <br />
          It has a <em className="accent">ma team</em>.
        </h1>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="num">{TEAM.length}</span>
            <span className="lbl">Agents</span>
          </div>
          <div className="hero-stat">
            <span className="num">{PIPELINES.length}</span>
            <span className="lbl">Pipelines</span>
          </div>
          <div className="hero-stat">
            <span className="num">1</span>
            <span className="lbl">Orchestrator</span>
          </div>
          <div className="hero-stat">
            <span className="num">0</span>
            <span className="lbl">Humans harmed</span>
          </div>
        </div>
      </section>

      <div className="filter-row">
        <span className="filter-label">Pipelines</span>
        {PIPELINES.map((p) => (
          <button
            key={p.id}
            className="filter-chip"
            aria-pressed={activeFilters.has(p.id) ? "true" : "false"}
            style={{ "--dot": p.dot } as React.CSSProperties}
            onClick={() => toggleFilter(p.id)}
          >
            <span className="dot" />
            {p.label}
          </button>
        ))}
        {activeFilters.size > 0 && (
          <button
            className="filter-chip"
            onClick={() => setActiveFilters(new Set())}
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid-wrap">
        <div className="at-grid">
          {filtered.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={TEAM.findIndex((t) => t.id === agent.id)}
              total={TEAM.length}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ---- PipelineSection ----

function PipelineSection() {
  const [taskIdx, setTaskIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const SPEED_MS = 1400;

  const flow = FLOW_ORDER;

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStageIdx((s) => {
        if (s + 1 >= flow.length) {
          setTaskIdx((t) => (t + 1) % EXAMPLE_TASKS.length);
          return 0;
        }
        return s + 1;
      });
    }, SPEED_MS);
    return () => clearInterval(timer);
  }, [playing, flow.length]);

  const currentAgentId = flow[stageIdx] ?? "";
  const currentAgent = TEAM.find((a) => a.id === currentAgentId) ?? null;
  const currentTask = EXAMPLE_TASKS[taskIdx];
  const isShipping = stageIdx === flow.length - 1;

  const restart = useCallback(() => {
    setStageIdx(0);
  }, []);

  const next = useCallback(() => {
    setStageIdx((s) => {
      if (s + 1 >= flow.length) {
        setTaskIdx((t) => (t + 1) % EXAMPLE_TASKS.length);
        return 0;
      }
      return s + 1;
    });
  }, [flow.length]);

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  if (!currentTask) return null;

  return (
    <div className="pipeline-wrap">
      <section className="pipeline-hero">
        <div className="hero-eyebrow eyebrow">Pipeline flow</div>
        <h1
          className="hero-title"
          style={{ fontSize: "clamp(28px, 6vw, 92px)" }}
        >
          One task,
          <br />
          ten <em className="accent">specialists</em>.
        </h1>
        <p
          style={{
            marginTop: 18,
            maxWidth: "64ch",
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--at-ink-soft)",
          }}
        >
          Every commit walks the same path. palm dispatches, utahime plans,
          nitta writes the failing test, four quality gates run in sequence,
          the test stack proves it, and the performance optimizer signs off
          before palm finally ships it.
        </p>
      </section>

      <div className="pipeline-task-strip">
        <span className="now-label">In flight</span>
        <span className="task-pill">
          <span className="kind">{currentTask.kind}</span>
          {currentTask.label}
        </span>
        <div style={{ flex: 1 }} />
        <span className="stage-now">
          <span className="label">Stage</span>
          {isShipping ? (
            <em>shipping →</em>
          ) : (
            <em>{currentAgent?.handle ?? ""}</em>
          )}
        </span>
        <div className="controls">
          <button className="ctrl" onClick={restart} title="Restart">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M2 6 a4 4 0 1 1 1.5 3.1" />
              <path d="M2 2 V6 H6" />
            </svg>
          </button>
          <button
            className="ctrl"
            onClick={togglePlay}
            title={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg viewBox="0 0 12 12" fill="currentColor">
                <rect x="3" y="2" width="2" height="8" />
                <rect x="7" y="2" width="2" height="8" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" fill="currentColor">
                <polygon points="3,2 10,6 3,10" />
              </svg>
            )}
          </button>
          <button className="ctrl" onClick={next} title="Step">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M3 2 L8 6 L3 10" />
              <path d="M9 2 V10" />
            </svg>
          </button>
        </div>
      </div>

      <GraphDiagram currentAgentId={currentAgentId} stageIdx={stageIdx} />
    </div>
  );
}

// ---- Main view ----

export default function AiTeamView({ fontVars }: AiTeamViewProps) {
  const [page, setPage] = useState<PageTab>("team");
  const [openId, setOpenId] = useState<string | null>(null);

  const handleOpen = useCallback((id: string) => setOpenId(id), []);
  const handleClose = useCallback(() => setOpenId(null), []);

  return (
    <div className={`ai-team-page ${fontVars}`}>
      <div className="at-topbar">
        <nav className="nav-pills" aria-label="AI Team sections">
          <button
            className="nav-pill"
            aria-current={page === "team" ? "true" : "false"}
            onClick={() => setPage("team")}
          >
            Team grid
          </button>
          <button
            className="nav-pill"
            aria-current={page === "pipeline" ? "true" : "false"}
            onClick={() => setPage("pipeline")}
          >
            Pipeline flow
          </button>
        </nav>
      </div>

      {page === "team" && <TeamGridSection onOpen={handleOpen} />}
      {page === "pipeline" && <PipelineSection />}

      <AgentModal agentId={openId} onClose={handleClose} />
    </div>
  );
}
