import Link from "next/link";

const About: React.FC = () => {
  return (
    <div className="mt-20 my-10 flex flex-col gap-3 justify-center items-center">
      <div className="w-[95%] md:w-2/3 lg:w-1/2">
        <h2 className="text-3xl font-semibold mb-4">about</h2>

        <div className="flex flex-col gap-6 text-xl opacity-90">
          <p>
            hey. i am mayank.
          </p>
          <p>
            -&gt; working as sde intern at <Link href="https://echio.in" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">echio.</Link>
          </p>
          <p>
            -&gt; i have been building products, dev tools, tech projects. obsessed over learning more tech and pushing my limits of what i can build.
          </p>
          <p>
            -&gt; i have worked in different programming languages and frameworks both professionally and in projects, hackathons...java and javascript are the two i have used the most. <br />
            javascript has become my go-to language whenever i need to experiment or try out a new idea.
          </p>
          <p>
            -&gt; i am always looking to work on more projects so if you have something interesting, feel free to <Link href="/contact" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">contact</Link> me and let&apos;s discuss how can i add value.
          </p>

          <p className="flex flex-col">
            <span>
              see my work <Link href="/work" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">here</Link>, my <Link href="https://github.com/mayankbansal12" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">github</Link>
            </span>
            <span>
              want to hire me? look <Link href="/hire" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">here</Link>
            </span>
            <span>
              what am i doing now? read <Link href="/now" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">here</Link>
            </span>
            <span>
              if you wanna know more about my journey, read <Link href="/more" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all"> here</Link>
            </span>
          </p>
          <p></p>
          <p>
            p.s.&#41; &#41; if you are wondering why is everything in lowercase, it’s my cool design blend—it just works.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
