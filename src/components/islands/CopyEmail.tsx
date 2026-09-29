import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  CheckIcon as Check,
  CopyIcon as Copy,
  WarningCircleIcon as WarningCircle,
} from '@phosphor-icons/react';

import { fill } from '../../i18n/fill';
import type { CopyEmailCopy } from '../../i18n/types';

type Status = 'idle' | 'copied' | 'error';

export default function CopyEmail({ email, copy: t }: { email: string; copy: CopyEmailCopy }) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const id = window.setTimeout(() => setStatus('idle'), 2400);
    return () => window.clearTimeout(id);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  };

  const Icon = status === 'copied' ? Check : status === 'error' ? WarningCircle : Copy;

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-12 min-w-[12.5rem] items-center justify-center gap-2 rounded-full border border-line-strong px-6 font-medium whitespace-nowrap transition-[background-color,transform] duration-300 hover:bg-surface active:scale-[0.98]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={[
            'inline-flex items-center gap-2',
            status === 'copied' ? 'text-mint-ink' : '',
            status === 'error' ? 'text-accent-ink' : '',
          ].join(' ')}
        >
          <Icon size={18} aria-hidden="true" />
          {t[status]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? fill(t.srCopied, { email }) : status === 'error' ? fill(t.srError, { email }) : ''}
      </span>
    </button>
  );
}
