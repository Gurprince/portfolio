import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Work from '../components/Work';
import Marquee from '../components/Marquee';

export default function Projects() {
  useEffect(() => {
    document.title = 'Work · Gurprince Singh';
  }, []);

  return (
    <>
      <PageHeader
        index="02"
        label="Work"
        title="Selected work"
        lines={['Selected', <em key="w">work</em>]}
        lede="Products I built on my own, a granted patent, and sites clients use to find customers."
      />
      <Work />
      <Marquee />
    </>
  );
}
