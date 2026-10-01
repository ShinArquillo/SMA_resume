'use client'

import { FiArrowLeft, FiDownload, FiExternalLink } from 'react-icons/fi'

/** Real resume file hosted in /public — identical to the file you send employers. */
export const RESUME_PDF_HREF = '/Resume_Sheena_Mae_Arquillo.pdf'

/**
 * Screen-only controls above the resume document. Hidden in print via `no-print`
 * so a browser print still exports only the resume body.
 */
export default function ResumeToolbar() {
  return (
    <div className="no-print mx-auto mb-6 flex max-w-[8.5in] flex-wrap items-center gap-3 px-4">
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-700 transition-colors hover:border-neutral-500 hover:text-black"
      >
        <FiArrowLeft className="text-xs" />
        Portfolio
      </a>

      <a
        href={RESUME_PDF_HREF}
        download="Resume_Sheena_Mae_Arquillo.pdf"
        className="inline-flex items-center gap-2 rounded-full bg-[#f0b400] px-5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#1a140e] transition-transform hover:-translate-y-0.5"
      >
        <FiDownload className="text-xs" />
        Download PDF
      </a>

      <a
        href={RESUME_PDF_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-700 transition-colors hover:border-neutral-500 hover:text-black"
      >
        <FiExternalLink className="text-xs" />
        Open PDF
      </a>

      <p className="basis-full text-[13px] leading-relaxed text-neutral-600">
        The download is the same PDF sent with applications. The page below mirrors that document.
      </p>
    </div>
  )
}
