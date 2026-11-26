import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import ClientWork from '../components/ClientWork';

export default function CaseStudies() {
  useEffect(() => {
    document.title = 'Case studies · Gurprince Singh';
  }, []);

  return (
    <>
      <PageHeader
        index="03"
        label="Case studies"
        title="Client case studies"
        lines={['Client', <em key="c">case studies</em>]}
        lede="Three things I built at Penthara Technologies: the problem, what I built, and what changed for the client."
      />
      <ClientWork bare />
    </>
  );
}
