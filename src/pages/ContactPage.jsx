import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import useClock from '../hooks/useClock';
import useEmailDialog from '../hooks/useEmailDialog';
import { contact, roles } from '../data/resume';

/* pointer-lit border on whichever card the pointer is over */
const spot = (e) => {
  const card = e.target.closest('.reach__card');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function ContactPage() {
  const time = useClock();
  const openEmail = useEmailDialog();

  useEffect(() => {
    document.title = 'Contact · Gurprince Singh';
  }, []);

  const ext = { target: '_blank', rel: 'noopener noreferrer' };
  const channels = [
    { label: 'Phone', value: contact.phone, href: contact.phoneHref, cursor: 'Call' },
    { label: 'LinkedIn', value: 'Gurprince Singh', href: contact.linkedin, cursor: 'Open', ...ext },
    { label: 'GitHub', value: 'github.com/Gurprince', href: contact.github, cursor: 'Open', ...ext },
    { label: 'Résumé', value: 'One-page PDF', href: contact.resume, cursor: 'Save', download: true },
  ];

  return (
    <>
      <PageHeader
        index="04"
        label="Contact"
        title="Let's build something useful"
        lines={["Let's build", <span key="s">something <em>useful</em></span>]}
        lede="Have a slow report, a manual process, or a product to build? Email is the quickest way to reach me."
      />

      <section className="reach" aria-label="Ways to reach me">
        <Reveal as="ul" className="reach__grid" stagger={0.08} onPointerMove={spot}>
          <li className="reach__main">
            <a className="reach__card" href={`mailto:${contact.email}`} onClick={openEmail} data-cursor="Write">
              <span className="reach__label">Email</span>
              <span className="reach__email">{contact.email}</span>
              <span className="reach__go">Write to me</span>
            </a>
          </li>
          {channels.map(({ label, value, cursor, ...link }) => (
            <li key={label}>
              <a className="reach__card" data-cursor={cursor} {...link}>
                <span className="reach__label">{label}</span>
                <span className="reach__value">{value}</span>
                <span className="reach__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </Reveal>

        <Reveal as="dl" className="reach__facts" stagger={0.06}>
          <div><dt>Based in</dt><dd>Mohali, Punjab, India</dd></div>
          <div><dt>Local time</dt><dd><time>{time}</time> IST</dd></div>
          <div><dt>Currently</dt><dd>{roles[0].title}, {roles[0].org.split(',')[0]}</dd></div>
          <div><dt>Good fit</dt><dd>Web apps, Azure and Power Platform automations, AI features</dd></div>
        </Reveal>
      </section>
    </>
  );
}
