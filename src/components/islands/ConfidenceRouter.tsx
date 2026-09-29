import { useId, useMemo, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { CheckCircleIcon as CheckCircle, UserFocusIcon as UserFocus } from '@phosphor-icons/react';
import { THRESHOLD_DEFAULT } from '../../i18n/shared';
import { fill } from '../../i18n/fill';
import type { RouterCopy, SampleAccount } from '../../i18n/types';

/*
 * Demo del enrutamiento por confianza de MatchCount (cuentas de muestra).
 * Motion motivado: cambio de estado. La línea del umbral se desplaza con layout y
 * cada cuenta cambia de "automática" a "revisión" sin alterar la altura del bloque.
 */

const MIN = 0.4;
const MAX = 0.95;

export default function ConfidenceRouter({ copy, accounts }: { copy: RouterCopy; accounts: SampleAccount[] }) {
  const sorted = useMemo(() => [...accounts].sort((a, b) => b.confidence - a.confidence), [accounts]);
  const reduce = useReducedMotion();
  const [threshold, setThreshold] = useState(THRESHOLD_DEFAULT);
  const inputId = useId();

  const autoCount = useMemo(() => sorted.filter((a) => a.confidence >= threshold).length, [sorted, threshold]);
  const reviewCount = sorted.length - autoCount;
  const spring = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 100, damping: 20 };

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={inputId} className="text-sm font-medium">
            {copy.label}
          </label>
          <output htmlFor={inputId} className="font-mono text-sm text-accent-ink tabular-nums">
            {threshold.toFixed(2)}
          </output>
        </div>
        <input
          id={inputId}
          type="range"
          min={MIN}
          max={MAX}
          step={0.01}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          aria-valuetext={fill(copy.valueText, { value: threshold.toFixed(2), auto: autoCount, review: reviewCount })}
          className="h-11 w-full cursor-pointer accent-(--accent)"
        />
        <p aria-live="polite" className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle size={14} weight="fill" className="text-mint-ink" aria-hidden="true" />
            {autoCount} {copy.automatic}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UserFocus size={14} className="text-accent-ink" aria-hidden="true" />
            {reviewCount} {copy.inReview}
          </span>
        </p>
      </div>

      <LayoutGroup>
        <ul className="flex flex-col" aria-label={copy.listLabel}>
          {sorted.map((acc, i) => {
            const auto = acc.confidence >= threshold;
            const prevAuto = i > 0 && sorted[i - 1].confidence >= threshold;
            const showLine = !auto && (i === 0 || prevAuto);
            return (
              <li key={acc.code} className="relative">
                {showLine && (
                  <motion.span
                    layoutId="threshold-line"
                    transition={spring}
                    aria-hidden="true"
                    className="absolute -top-px right-0 left-0 h-0.5 rounded-full bg-accent"
                  />
                )}
                <div className="flex min-h-9 items-center justify-between gap-3 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    {auto ? (
                      <CheckCircle size={16} weight="fill" className="shrink-0 text-mint-ink" aria-hidden="true" />
                    ) : (
                      <UserFocus size={16} className="shrink-0 text-accent-ink" aria-hidden="true" />
                    )}
                    <span className={['truncate transition-colors duration-300', auto ? '' : 'text-muted'].join(' ')}>
                      {acc.source}
                    </span>
                    <span className="sr-only">{auto ? copy.srAutomatic : copy.srReview}</span>
                  </span>
                  <span className="font-mono text-xs text-muted tabular-nums">{acc.confidence.toFixed(2)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
    </div>
  );
}
