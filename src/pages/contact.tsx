import { ArrowUpRight, CalendarDays, Mail, SketchIcon } from 'sketchicon';
import PageShell from '@/components/rough/PageShell';
import { links } from '@/data/portfolio';

const channels = [
  {
    label: 'email (i read all my emails ^-^)',
    href: links.email,
    text: links.email.replace('mailto:', ''),
    icon: Mail,
  },
  {
    label: 'schedule a call',
    href: links.calendar,
    text: 'cal.com',
    icon: CalendarDays,
  },
  {
    label: "twitter (don't like to call it x)",
    href: links.twitter,
    text: 'simplermayank',
    icon: ArrowUpRight,
  },
  {
    label: 'github (trying to be consistent)',
    href: links.github,
    text: 'mayankbansal12',
    icon: ArrowUpRight,
  },
  {
    label: 'linkedin (forgot linkedin passwd)',
    href: links.linkedin,
    text: '--mb2004--',
    icon: ArrowUpRight,
  },
  {
    label: 'my blog (not super consistent..)',
    href: links.substack,
    text: 'substack',
    icon: ArrowUpRight,
  },
  {
    label: 'leave an anonymous note or feedback',
    href: links.anonymousNote,
    text: 'sayout',
    icon: ArrowUpRight,
  },
];

export default function Contact() {
  return (
    <PageShell title='contact'>
      <ul className='writing-list'>
        {channels.map(({ href, label, text, icon }) => (
          <li key={href} className='writing-item'>
            <a
              href={href}
              target={href === links.email ? undefined : '_blank'}
              rel={href === links.email ? undefined : 'noreferrer noopener'}
              className='writing-row'
              data-sound-hover
              data-sound-click
            >
              <span className='writing-title'>
                <span aria-hidden>{'->'}</span>
                <span>{label}</span>
              </span>
              <span className='flex max-w-full items-center gap-1.5 pl-4 text-sm sm:pl-0'>
                <span className='wrap-anywhere'>{text}</span>
                <SketchIcon
                  icon={icon}
                  size={14}
                  roughness={1.8}
                  className='shrink-0'
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
