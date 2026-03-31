'use client';

import { motion } from 'framer-motion';
import posthog from 'posthog-js';
import { useRef, useState } from 'react';
import { useCookieConsent } from '@/components/CookieConsent';
import { EmailWallModal } from '@/components/EmailWallModal';

const CATEGORIES = [
  {
    id: 'process',
    label: 'Beantwortungsprozess',
    items: [
      {
        id: 'p1',
        text: 'Wir erhalten regelmäßig Anfragen von Kunden zu Produktkonformität — z.B. Materialdeklarationen, Stoffverbotsnachweise oder Lieferantenerklärungen.',
      },
      {
        id: 'p2',
        text: 'Diese Anfragen werden heute überwiegend manuell bearbeitet: durch Suche in ERP-Systemen, Laufwerken oder per E-Mail an interne Stellen.',
      },
      {
        id: 'p3',
        text: 'Unsere Mitarbeitenden übertragen Daten regelmäßig in Kundenportale (z.B. Assent, CDX, BOMcheck) oder individuelle PDF-/Excel-Templates.',
      },
      {
        id: 'p4',
        text: 'Es gibt Mitarbeitende, deren Arbeitszeit zu einem wesentlichen Teil durch die Beantwortung solcher Anfragen gebunden ist.',
      },
    ],
  },
  {
    id: 'data',
    label: 'Datenlage',
    items: [
      {
        id: 'd1',
        text: 'Unsere produktbezogenen Compliance-Daten liegen an mehreren Orten verteilt vor — ohne zentrale, strukturierte Ablage.',
      },
      {
        id: 'd2',
        text: 'Bei neuen Regularien haben wir Schwierigkeiten, schnell zu prüfen, welche Produkte betroffen sind.',
      },
      {
        id: 'd3',
        text: 'Für bestimmte Produkte oder Komponenten fehlen uns Nachweise von Vorlieferanten, die wir regelmäßig neu anfordern müssen.',
      },
    ],
  },
  {
    id: 'outlook',
    label: 'Regulatorischer Ausblick',
    items: [
      {
        id: 'o1',
        text: 'Als Tier-1/2/3-Lieferant sind wir bereits mit strukturierten Datenanforderungen von OEMs konfrontiert — über klassische Konformitätserklärungen hinaus.',
      },
      {
        id: 'o2',
        text: 'Wir beschäftigen uns mit dem Digitalen Produktpass (DPP) oder Manufacturing-X, haben aber noch keine konkrete Umsetzungsstrategie.',
      },
      {
        id: 'o3',
        text: 'Wir erwarten, dass das Volumen oder die Tiefe der Compliance-Anfragen in den nächsten 1–3 Jahren weiter zunehmen wird.',
      },
    ],
  },
];

const ALL_ITEMS = CATEGORIES.flatMap(c => c.items);
const AUTO_TRIGGER_THRESHOLD = 3;

export function MatchCheck() {
  const consent = useCookieConsent();
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const autoTriggered = useRef(false);

  const score = checked.size;

  function track(event: string, props?: Record<string, unknown>) {
    if (consent === 'accepted') {
      posthog.capture(event, props);
    }
  }

  function toggle(id: string, category: string) {
    setChecked(prev => {
      const next = new Set(prev);
      const nowChecked = !next.has(id);
      nowChecked ? next.add(id) : next.delete(id);

      track('match_check_item_toggled', {
        item_id: id,
        category,
        checked: nowChecked,
        total_checked: next.size,
      });

      if (next.size >= AUTO_TRIGGER_THRESHOLD && !autoTriggered.current) {
        autoTriggered.current = true;
        // Defer so state settles first
        setTimeout(() => {
          setModalOpen(true);
          track('match_check_modal_shown', { trigger: 'auto', score: next.size });
        }, 300);
      }

      return next;
    });
  }

  function openModal() {
    setModalOpen(true);
    track('match_check_modal_shown', { trigger: 'button', score });
  }

  return (
    <>
      <section
        id="match-check"
        className="py-24 border-t"
        style={{ background: '#0A0A12', borderColor: 'rgba(123,92,245,0.1)' }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-14 max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                Passt Pareo zu Ihnen?
              </span>
            </div>
            <h2
              className="mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 'clamp(30px, 4vw, 50px)',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              Wenn viele dieser Aussagen zutreffen,{' '}
              <span style={{ color: '#7B5CF5' }}>lassen Sie uns sprechen.</span>
            </h2>
            <p
              className="text-base"
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-ibm)',
                fontWeight: 300,
              }}
            >
              Wählen Sie alle Aussagen aus, die auf Ihr Unternehmen zutreffen.
            </p>
          </motion.div>

          {/* Score bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center gap-4"
          >
            <div
              className="flex-1 h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#7B5CF5' }}
                animate={{ width: `${(score / ALL_ITEMS.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              />
            </div>
            <span
              className="text-sm font-semibold tabular-nums shrink-0"
              style={{
                color: score > 0 ? '#7B5CF5' : 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-ibm)',
              }}
            >
              {score} / {ALL_ITEMS.length}
            </span>
          </motion.div>

          {/* Categories */}
          <div className="space-y-10">
            {CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: ci * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-semibold tracking-[0.15em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}
                  >
                    {cat.label}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.items.map((item, ii) => {
                    const isChecked = checked.has(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => toggle(item.id, cat.id)}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.08 + ii * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-start gap-3 rounded-xl p-4 text-left transition-all"
                        style={{
                          background: isChecked ? 'rgba(123,92,245,0.12)' : '#16162A',
                          border: `1px solid ${isChecked ? 'rgba(123,92,245,0.4)' : 'rgba(123,92,245,0.1)'}`,
                          cursor: 'pointer',
                        }}
                      >
                        {/* Checkbox indicator */}
                        <div
                          className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center transition-all"
                          style={{
                            background: isChecked ? '#7B5CF5' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${isChecked ? '#7B5CF5' : 'rgba(123,92,245,0.25)'}`,
                          }}
                        >
                          {isChecked && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: isChecked ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                            fontFamily: 'var(--font-ibm)',
                            fontWeight: 300,
                            transition: 'color 0.15s',
                          }}
                        >
                          {item.text}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-14 flex flex-col sm:flex-row items-center gap-5"
          >
            <button
              type="button"
              onClick={openModal}
              className="px-8 py-3.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#6d4ee0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#7B5CF5')}
            >
              {score >= AUTO_TRIGGER_THRESHOLD
                ? `${score} von ${ALL_ITEMS.length} treffen zu — Gespräch anfragen`
                : 'Unverbindlich sprechen'}
            </button>
            {score === 0 && (
              <p
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-ibm)' }}
              >
                Wählen Sie die Aussagen aus, die auf Sie zutreffen.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <EmailWallModal open={modalOpen} onOpenChange={setModalOpen} score={score} />
    </>
  );
}
