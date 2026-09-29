import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'motion/react';
import {
  ChartLineUpIcon as ChartLineUp,
  CheckCircleIcon as CheckCircle,
  DatabaseIcon as Database,
  GaugeIcon as Gauge,
  PauseIcon as Pause,
  PlayIcon as Play,
  SparkleIcon as Sparkle,
  StackIcon as Stack,
  UserFocusIcon as UserFocus,
} from '@phosphor-icons/react';
import { THRESHOLD_DEFAULT } from '../../i18n/shared';
import { fill } from '../../i18n/fill';
import type { PipelineCopy, SampleAccount } from '../../i18n/types';

/*
 * Narra el flujo real de MatchCount con cuentas de muestra:
 * ERP -> agente Gemini -> umbral de confianza (-> revisión humana) -> DW -> DashBI.
 * Motion motivado: storytelling. El paquete salta entre etapas con layoutId.
 */

type Pos = 0 | 1 | 2 | 'review' | 3 | 4;

const STEP_MS = 1500;

const pathFor = (r: SampleAccount): Pos[] =>
  r.confidence >= THRESHOLD_DEFAULT ? [0, 1, 2, 3, 4] : [0, 1, 2, 'review', 3, 4];

const fmt = (n: number) => n.toFixed(2);

type Stage = { pos: Pos; icon: ReactNode; title: string; sub: string; place: string };

function buildStages(t: PipelineCopy): Stage[] {
  const s = t.stages;
  return [
    {
      pos: 0,
      icon: <Database size={22} weight="duotone" />,
      title: s.erp[0],
      sub: s.erp[1],
      place: 'lg:col-start-1 lg:row-start-1',
    },
    {
      pos: 1,
      icon: <Sparkle size={22} weight="duotone" />,
      title: s.agent[0],
      sub: s.agent[1],
      place: 'lg:col-start-2 lg:row-start-1',
    },
    {
      pos: 2,
      icon: <Gauge size={22} weight="duotone" />,
      title: s.gate[0],
      sub: fill(s.gate[1], { t: fmt(THRESHOLD_DEFAULT) }),
      place: 'lg:col-start-3 lg:row-start-1',
    },
    {
      pos: 'review',
      icon: <UserFocus size={22} weight="duotone" />,
      title: s.review[0],
      sub: s.review[1],
      place: 'lg:col-start-3 lg:row-start-2',
    },
    {
      pos: 3,
      icon: <Stack size={22} weight="duotone" />,
      title: s.dw[0],
      sub: s.dw[1],
      place: 'lg:col-start-4 lg:row-start-1',
    },
    {
      pos: 4,
      icon: <ChartLineUp size={22} weight="duotone" />,
      title: s.bi[0],
      sub: s.bi[1],
      place: 'lg:col-start-5 lg:row-start-1',
    },
  ];
}

function packetCopy(t: PipelineCopy, r: SampleAccount, pos: Pos): { top: string; bottom: ReactNode } {
  const ok = r.confidence >= THRESHOLD_DEFAULT;
  switch (pos) {
    case 0:
      return { top: r.code, bottom: r.source };
    case 1:
      return { top: `${t.confidence} ${fmt(r.confidence)}`, bottom: r.target };
    case 2:
      return {
        top: ok ? t.autoApproved : t.needsReview,
        bottom: `${fmt(r.confidence)} ${ok ? '≥' : '<'} ${fmt(THRESHOLD_DEFAULT)}`,
      };
    case 'review':
      return { top: t.approved, bottom: r.target };
    case 3:
      return { top: t.stored, bottom: r.target };
    case 4:
      return { top: t.ready, bottom: r.target };
  }
}

export default function PipelineLive({ copy, records: RECORDS }: { copy: PipelineCopy; records: SampleAccount[] }) {
  const STAGES = useMemo(() => buildStages(copy), [copy]);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [playing, setPlaying] = useState(true);
  const [{ rec, step }, setState] = useState({ rec: 0, step: 0 });

  // Con movimiento reducido arranca en pausa y en un estado representativo (registro en el DW).
  useEffect(() => {
    if (reduce) {
      setPlaying(false);
      setState({ rec: 0, step: 3 });
    }
  }, [reduce]);

  useEffect(() => {
    if (!playing || !inView) return;
    const id = window.setInterval(() => {
      setState((prev) => {
        const path = pathFor(RECORDS[prev.rec]);
        if (prev.step + 1 < path.length) return { rec: prev.rec, step: prev.step + 1 };
        return { rec: (prev.rec + 1) % RECORDS.length, step: 0 };
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, inView]);

  const record = RECORDS[rec];
  const pos = pathFor(record)[step];
  const packet = packetCopy(copy, record, pos);
  const isFinal = pos === 4;

  return (
    <div
      ref={ref}
      role="figure"
      aria-label={copy.ariaLabel}
      className="shadow-tinted hud relative rounded-2xl border border-line bg-surface/70 p-4 md:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-xs text-muted">
          <span aria-hidden="true" className="live-dot inline-block size-2 rounded-full bg-mint" />
          {copy.title}
          <span className="hidden sm:inline">{copy.titleSuffix}</span>
        </p>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={!playing}
          aria-label={playing ? copy.pause : copy.resume}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink active:scale-[0.98]"
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      </div>

      <LayoutGroup>
        <ol className="relative grid grid-cols-1 gap-2.5 lg:grid-cols-5 lg:grid-rows-[auto_auto] lg:gap-3">
          {/* Conector horizontal detrás de las etapas (solo desktop) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[34px] right-[10%] left-[10%] hidden h-px bg-line-strong lg:block"
          />
          {STAGES.map((stage) => {
            const active = stage.pos === pos;
            const isReview = stage.pos === 'review';
            return (
              <li
                key={String(stage.pos)}
                className={[
                  stage.place,
                  'relative flex flex-col gap-3 rounded-2xl border p-3.5 transition-colors duration-500 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch lg:justify-start',
                  isReview ? 'ml-6 border-dashed lg:ml-0' : '',
                  active ? 'border-accent/60 bg-bg' : 'border-line bg-bg/60',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={[
                      'grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-500',
                      active ? 'bg-accent-soft text-accent-ink' : 'bg-surface text-muted',
                    ].join(' ')}
                  >
                    {stage.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm leading-tight font-medium">{stage.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted">{stage.sub}</p>
                  </div>
                </div>

                {/* Ranura reservada: evita saltos de layout cuando llega o se va el paquete */}
                <div
                  className={[
                    'sm:w-60 sm:shrink-0 lg:w-auto',
                    isReview ? 'min-h-[52px]' : 'min-h-[52px] lg:min-h-[60px]',
                  ].join(' ')}
                >
                  {active && (
                    <motion.div
                      layoutId="packet"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 100, damping: 20 }}
                      className={[
                        'rounded-2xl border px-3 py-2',
                        isFinal ? 'border-mint/40 bg-mint-soft' : 'border-accent/30 bg-accent-soft',
                      ].join(' ')}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={`${rec}-${String(pos)}`}
                          initial={reduce ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -4 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p
                            className={[
                              'flex items-center gap-1.5 font-mono text-[11px] leading-tight',
                              isFinal ? 'text-mint-ink' : 'text-accent-ink',
                            ].join(' ')}
                          >
                            {isFinal && <CheckCircle size={13} weight="fill" aria-hidden="true" />}
                            {packet.top}
                          </p>
                          <p className="mt-1 truncate text-xs leading-tight">{packet.bottom}</p>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </LayoutGroup>
    </div>
  );
}
