import { ArrowUpRight, CalendarDays, Mail } from 'lucide-react';
import BlogRow from '@/components/BlogRow';
import ExperienceAccordion from '@/components/ExperienceAccordion';
import Footer from '@/components/Footer';
import Monogram from '@/components/Monogram';
import NewsletterSection from '@/components/NewsletterSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProjectCard from '@/components/rough/ProjectCard';
import RoughCurvedArrow from '@/components/rough/RoughCurvedArrow';
import RoughSticky from '@/components/rough/RoughSticky';
import { blogPosts, experiences, profile, projects, skillGroups, socials } from '@/data/portfolio';

export default function Home() {
  return (
    <div id='top' className='portfolio-home mx-auto w-full max-w-[760px]'>
      <div className='portfolio-opening' aria-hidden>
        <span className='portfolio-cross portfolio-cross-left' />
        <span className='portfolio-cross portfolio-cross-right' />
      </div>

      <div className='portfolio-rail'>
        <section id='about' className='portfolio-hero scroll-mt-32'>
          <div className='flex items-start gap-4 sm:gap-5'>
            <Monogram />
            <div className='min-w-0 flex-1 pt-1'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                  <h1 className='text-3xl leading-none font-semibold md:text-4xl'>
                    hey. i&apos;m mayank.
                  </h1>
                  <p className='mt-2 text-sm text-board-muted md:text-base'>{profile.role}</p>
                </div>
                <RoughSticky seed={102} color='green' rotate={1} className='shrink-0'>
                  <span className='text-xs font-semibold'>available for work</span>
                </RoughSticky>
              </div>
            </div>
          </div>

          <div className='relative mt-7 max-w-2xl space-y-4 text-base leading-relaxed md:text-lg'>
            <p>{profile.intro}</p>
            <p className='opacity-80'>{profile.now}</p>
            <div className='absolute -top-10 -right-1 hidden items-end opacity-55 sm:flex'>
              <span className='mr-1 text-xs'>what i&apos;m up to</span>
              <RoughCurvedArrow seed={103} width={45} height={30} />
            </div>
          </div>

          <div className='mt-6 flex flex-wrap gap-3'>
            <a
              href={profile.calendar}
              target='_blank'
              rel='noreferrer noopener'
              className='portfolio-button'
            >
              <CalendarDays size={15} aria-hidden /> book an intro call
            </a>
            <a href={profile.email} className='portfolio-button portfolio-button-secondary'>
              <Mail size={15} aria-hidden /> send an email
            </a>
          </div>

          <div className='mt-7'>
            <p className='mb-3 text-sm text-board-muted'>find me around the internet</p>
            <div className='flex flex-wrap gap-2'>
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='social-chip group'
                  aria-label={`${social.label}: ${social.handle}`}
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className='social-chip-arrow' size={13} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </section>

        <PortfolioSection
          id='experience'
          title='experience'
          note='click a row to open it'
          seed={301}
        >
          <ExperienceAccordion items={experiences} />
        </PortfolioSection>

        <PortfolioSection
          id='projects'
          title='selected projects'
          note='things i have built'
          seed={401}
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
          </div>
          <a
            href='https://github.com/MayankBansal12?tab=repositories'
            target='_blank'
            rel='noreferrer noopener'
            className='portfolio-view-all group mt-5'
          >
            view all repositories
            <ArrowUpRight size={15} className='view-all-arrow' aria-hidden />
          </a>
        </PortfolioSection>

        <PortfolioSection id='blogs' title='writing' note='mock posts for now' seed={501}>
          <div className='portfolio-list-frame overflow-hidden'>
            {blogPosts.map((post) => (
              <BlogRow key={post.title} post={post} />
            ))}
          </div>
          <a
            href='https://mayank12.substack.com/'
            target='_blank'
            rel='noreferrer noopener'
            className='portfolio-view-all group mt-5'
          >
            visit my substack
            <ArrowUpRight size={15} className='view-all-arrow' aria-hidden />
          </a>
        </PortfolioSection>

        <PortfolioSection
          id='skills'
          title='skills & tools'
          note='used at work and in projects'
          seed={601}
        >
          <div className='space-y-5'>
            {skillGroups.map((group) => (
              <div key={group.label} className='grid gap-3 sm:grid-cols-[110px_1fr]'>
                <h3 className='pt-1 text-sm font-semibold text-board-muted'>{group.label}</h3>
                <div className='flex flex-wrap gap-2'>
                  {group.skills.map((skill) => (
                    <span key={skill} className='skill-chip'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PortfolioSection>

        <section id='newsletter' className='portfolio-section scroll-mt-32'>
          <NewsletterSection />
        </section>

        <Footer />
      </div>

      <div className='portfolio-closing' aria-hidden>
        <span className='portfolio-cross portfolio-cross-left' />
        <span className='portfolio-cross portfolio-cross-right' />
      </div>
    </div>
  );
}
