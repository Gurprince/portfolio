import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { setScrollLocked } from '../hooks/useLenis';
import { EmailContext } from '../hooks/useEmailDialog';
import { contact } from '../data/resume';

const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`;

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

export function EmailProvider({ children }) {
  const dialog = useRef(null);
  const [copied, setCopied] = useState(false);

  const open = useCallback((e) => {
    e?.preventDefault();
    setCopied(false);
    dialog.current.showModal();
    setScrollLocked(true);
  }, []);

  const close = useCallback(() => dialog.current.close(), []);

  /* entrance: panel blur-rises in; scroll unlocks whenever the dialog closes (Esc included) */
  useLayoutEffect(() => {
    const el = dialog.current;
    const onClose = () => setScrollLocked(false);
    const observer = new MutationObserver(() => {
      if (!el.open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(el.querySelector('.email__panel'),
        { autoAlpha: 0, y: 24, filter: 'blur(10px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' });
    });
    observer.observe(el, { attributes: true, attributeFilter: ['open'] });
    el.addEventListener('close', onClose);
    return () => { observer.disconnect(); el.removeEventListener('close', onClose); };
  }, []);

  const onCopy = async () => setCopied(await copyText(contact.email));

  return (
    <EmailContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="email"
        aria-labelledby="email-title"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="email__panel">
          <h2 id="email-title" className="email__title">Get in touch</h2>
          <p className="email__addr">{contact.email}</p>
          <div className="email__actions">
            <button type="button" className="btn btn--solid" onClick={onCopy}>
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a className="btn btn--ghost" href={GMAIL} target="_blank" rel="noopener noreferrer" onClick={close}>Write in Gmail</a>
            <a className="btn btn--ghost" href={`mailto:${contact.email}`} onClick={close}>Open mail app</a>
          </div>
          <p className="email__status" role="status">{copied ? 'Email address copied to your clipboard.' : ''}</p>
          <button type="button" className="email__close" onClick={close} aria-label="Close">×</button>
        </div>
      </dialog>
    </EmailContext.Provider>
  );
}
