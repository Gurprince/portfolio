import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import RollText from './RollText';
import useClock from '../hooks/useClock';
import useMagnetic from '../hooks/useMagnetic';
import { scrollToTarget } from '../hooks/useLenis';
import { contact } from '../data/resume';
import useEmailDialog from '../hooks/useEmailDialog';

export default function Contact() {
  const time = useClock();
  const big = useMagnetic(0.12);
  const root = useRef(null);
  const openEmail = useEmailDialog();

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact__char',
        { autoAlpha: 0, yPercent: 40, filter: 'blur(14px)' },
        {
          autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', stagger: 0.05,
          scrollTrigger: { trigger: root.current, start: 'top 65%', once: true },
        });
    }, root);
    return () => ctx.revert();
  }, []);

  const links = [
    [`mailto:${contact.email}`, contact.email],
    [contact.phoneHref, contact.phone],
    [contact.github, 'GitHub'],
    [contact.linkedin, 'LinkedIn'],
  ];

  return (
    <footer className="contact" id="contact" ref={root}>
      <p className="contact__lead">Have a slow report, a manual process, or a product to build?</p>
      <a ref={big} className="contact__big" href={`mailto:${contact.email}`} data-cursor="Write" aria-label="Email me" onClick={openEmail}>
        {[..."Let's talk"].map((c, i) => (
          <span className="contact__char" key={i} aria-hidden="true">{c === ' ' ? ' ' : c}</span>
        ))}
      </a>
      <div className="contact__grid">
        {links.map(([href, label]) => (
          <a
            key={href}
            className="roll-host"
            href={href}
            onClick={href.startsWith('mailto:') ? openEmail : undefined}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <RollText>{label}</RollText>
          </a>
        ))}
      </div>
      <div className="contact__base">
        <p>© {new Date().getFullYear()} Gurprince Singh</p>
        <p>Mohali, <time>{time}</time> IST</p>
        <a className="roll-host" href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget(0); }}>
          <RollText>Back to top</RollText>
        </a>
      </div>
    </footer>
  );
}
