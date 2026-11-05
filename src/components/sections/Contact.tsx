import type { ComponentType, SVGProps } from "react";
import { siteConfig } from "@/config/site";
import { cn, instagramHref, telHref, whatsappHref } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon, InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { CopyButton } from "@/components/contact/CopyButton";

type Channel = {
  label: string;
  value: string;
  action: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
  copy?: string;
};

export function Contact() {
  const { contact } = siteConfig;

  const channels: Channel[] = [
    {
      label: "Email",
      value: contact.email,
      action: "Write an email",
      href: `mailto:${contact.email}`,
      icon: MailIcon,
      copy: contact.email,
    },
    {
      label: "Phone",
      value: contact.phone,
      action: "Call now",
      href: telHref(contact.phone),
      icon: PhoneIcon,
      copy: contact.phone,
    },
    {
      label: "WhatsApp",
      value: contact.phone,
      action: "Chat on WhatsApp",
      href: whatsappHref(contact.whatsapp, contact.whatsappMessage),
      icon: WhatsAppIcon,
      external: true,
    },
  ];
  if (contact.instagram) {
    channels.push({
      label: "Instagram",
      value: `@${contact.instagram}`,
      action: "See latest work",
      href: instagramHref(contact.instagram),
      icon: InstagramIcon,
      external: true,
    });
  }

  return (
    <section id="contact" className="relative border-t border-line bg-ink-2 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--ember)_10%,transparent),transparent_70%)]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            scene="07"
            label="Contact"
            title="Have footage? Let's make it *unforgettable*."
            intro="Tell me about your project, timeline and where it will live. I'll come back with ideas, a plan and a quote."
          />

          <Reveal delay={200} className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-ink px-4 py-2 text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {contact.availability}
          </Reveal>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-7 lg:self-end">
          {channels.map(({ label, value, action, href, icon: Icon, external, copy }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={150 + i * 70}
              // The first card (email) is the primary channel and spans the full row.
              className={cn("relative", i === 0 && "sm:col-span-2")}
            >
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex h-full flex-col gap-8 rounded-2xl border border-line bg-ink p-5 transition duration-500 hover:-translate-y-0.5 hover:border-ember/60 sm:p-7"
              >
                <span className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full border border-line text-xl transition group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
                    <Icon />
                  </span>
                  <ArrowUpRightIcon className="text-xl text-mute transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block">{label}</span>
                  <span
                    className={cn(
                      "mt-2 block font-display leading-tight break-words",
                      i === 0 ? "text-[clamp(1.6rem,4.5vw,3rem)]" : "text-2xl sm:text-3xl",
                    )}
                  >
                    {value}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm text-mute transition group-hover:text-ember">
                    {action}
                  </span>
                </span>
              </a>
              {copy && <CopyButton value={copy} label={label.toLowerCase()} className="absolute right-14 top-5 sm:right-16 sm:top-7" />}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
