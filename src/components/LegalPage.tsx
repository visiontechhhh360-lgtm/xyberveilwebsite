import { useEffect, type ReactNode } from 'react'
import './LegalPage.css'

/** Shared shell for the legal documents (Privacy Policy, Terms of Service). */
export function LegalPage({ title, docTitle, children }: { title: string; docTitle: string; children: ReactNode }) {
  useEffect(() => {
    const prev = document.title
    document.title = docTitle
    window.scrollTo(0, 0)
    return () => { document.title = prev }
  }, [docTitle])

  return (
    <article id="top" className="legal" aria-labelledby="legal-title">
      <div className="legal__bg" aria-hidden="true" />
      <div className="container legal__inner">
        <header className="legal__head">
          <span className="eyebrow">Legal</span>
          <h1 id="legal-title" className="legal__title text-gradient">{title}</h1>
        </header>
        <div className="legal__body glass glass--thin">{children}</div>
      </div>
    </article>
  )
}
