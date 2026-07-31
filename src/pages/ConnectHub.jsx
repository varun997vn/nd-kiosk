import { Mail, MapPin, Phone } from 'lucide-react';
import PageShell from '../components/ui/PageShell';
import PageHeader from '../components/ui/PageHeader';
import Panel from '../components/ui/Panel';
import QRTile from '../components/ui/QRTile';
import EdgeFadeScroll from '../components/ui/EdgeFadeScroll';
import { KolamMark, KolamRule } from '../components/ui/Kolam';
import { connectLinks, contact, publications, trusts } from '../connectData';

function SectionHeading({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <KolamMark size={24} />
      <h2 className="font-serif text-headline text-ink">{children}</h2>
    </div>
  );
}

export default function ConnectHub() {
  return (
    <PageShell>
      <PageHeader
        title="Connect &amp; Support"
        subtitle="Publications, registered trusts, and how to reach us."
      />

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-[1fr_1fr] gap-10">
        <EdgeFadeScroll className="min-h-0">
          <div className="flex flex-col gap-8 pr-2">
            <section>
              <SectionHeading>Publications &amp; Stores</SectionHeading>
              <div className="grid grid-cols-2 gap-6">
                {publications.map((item) => (
                  <Panel key={item.id} tone="raised" className="overflow-hidden">
                    <div className="photo-frame h-[190px]">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="border-t border-line p-6">
                      <p className="font-sans text-label font-bold uppercase tracking-[0.08em] text-saffron-ink">
                        {item.subtitle}
                      </p>
                      <h3 className="mt-1 font-serif text-title text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-sans text-body text-ink-muted">
                        {item.body}
                      </p>
                    </div>
                  </Panel>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading>Contribution</SectionHeading>
              <Panel tone="raised" className="p-8">
                <p className="font-sans text-body text-ink-muted">
                  Contributions may be sent to any of our registered trusts.
                </p>
                <KolamRule className="my-5 opacity-60" width={240} />
                <ul className="flex flex-col gap-4">
                  {trusts.map((trust) => (
                    <li
                      key={trust.name}
                      className="flex items-baseline justify-between gap-5 border-b border-line pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="font-sans text-body text-ink">
                        {trust.name}
                      </span>
                      <span className="flex shrink-0 gap-2">
                        {trust.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line-strong px-3 py-1 font-sans text-label font-bold text-saffron-ink"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
            </Panel>
          </section>
          </div>
        </EdgeFadeScroll>

        {/* This column deliberately does not scroll. The QR codes are the
            payoff of the screen, and EdgeFadeScroll's gradient mask would fade
            the modules of whichever tile sat at a scroll boundary — enough to
            stop a phone reading it. */}
        <div className="flex min-h-0 flex-col gap-8">
          <section className="shrink-0">
            <SectionHeading>Contact Us</SectionHeading>
            <Panel tone="raised" ornament className="p-8">
                <p className="font-sans text-label font-bold uppercase tracking-[0.08em] text-saffron-ink">
                  {contact.office}
                </p>
                <address className="mt-4 flex flex-col gap-4 not-italic">
                  <span className="flex gap-4">
                    <MapPin
                      size={26}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-ink-faint"
                    />
                    <span className="font-sans text-body-lg text-ink">
                      {contact.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="flex gap-4">
                    <Phone
                      size={26}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-ink-faint"
                    />
                    <span className="font-sans text-body-lg text-ink">
                      {contact.phone.map((number) => (
                        <span key={number} className="block">
                          {number}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="flex gap-4">
                    <Mail
                      size={26}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-ink-faint"
                    />
                    <span className="font-sans text-body-lg text-ink">
                      {contact.email}
                    </span>
                  </span>
                </address>
            </Panel>
          </section>

          <section className="flex min-h-0 flex-1 flex-col">
            <SectionHeading>Scan to Connect</SectionHeading>
            <p className="mb-5 font-sans text-body text-ink-muted">
              Point your phone&rsquo;s camera at a code to open it there.
            </p>
            <div className="grid grid-cols-4 gap-5">
              {connectLinks.map((link) => (
                <QRTile
                  key={link.id}
                  url={link.url}
                  name={link.name}
                  caption={link.caption}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
