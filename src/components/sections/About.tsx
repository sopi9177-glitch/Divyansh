import { siteConfig } from "@/config/site";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { about, role, location } = siteConfig;

  return (
    <section id="about" className="relative border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="eyebrow text-ember">SC.01</span>
          <span className="h-px w-10 bg-line" />
          <span className="eyebrow">About</span>
        </Reveal>
        <Reveal
          as="blockquote"
          delay={80}
          className="max-w-5xl font-display text-[clamp(2.1rem,5.5vw,4.75rem)] leading-[1.02] tracking-tight text-balance"
        >
          <Emphasis text={about.statement} />
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal as="p" key={i} delay={120 + i * 80} className="mb-5 max-w-2xl text-base leading-relaxed text-bone/75 last:mb-0 sm:text-lg">
                {paragraph}
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200} className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line min-[420px]:grid-cols-2">
              {about.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-ink-2 p-4 text-sm sm:p-5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember" />
                  {item}
                </div>
              ))}
            </Reveal>

            <Reveal delay={280} className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <p className="eyebrow">
                Role <span className="ml-2 text-bone">{role}</span>
              </p>
              <p className="eyebrow">
                Base <span className="ml-2 text-bone">{location}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
