import { PageLayout } from '@/components';
import ContactPrompts from './components/ContactPrompts';
import EmailCallout from './components/EmailCallout';
import MakerspaceCard from './components/MakerspaceCard';

// Desktop sizes come from the 1440px-wide Figma frame, converted to vw (px / 14.4)
// so the layout keeps its proportions at any screen width. Below lg the page stacks.
export default function ContactPage() {
  return (
    <PageLayout
      as="main"
      offsetHeader={false}
      className="flex min-h-screen flex-col bg-white text-ink"
    >
      <section className="flex flex-1 flex-col gap-10 px-6 pt-34 lg:gap-[0.49vw] lg:px-[2.92vw] lg:pt-[10.21vw]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-[2.5vw]">
          <ContactPrompts />
          <EmailCallout />
        </div>

        <div className="mt-auto flex flex-col gap-10 lg:-mr-[2.92vw] lg:flex-row lg:items-end lg:justify-between lg:gap-[3.125vw]">
          <MakerspaceCard />
          <img
            src="/ContactHalftone.png"
            alt=""
            className="-mx-6 min-w-0 mix-blend-multiply lg:mx-0 lg:basis-[50.49vw]"
          />
        </div>
      </section>
    </PageLayout>
  );
}
