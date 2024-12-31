import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const More: React.FC = () => {
    return (
        <div className="mt-20 my-10 flex flex-col gap-3 justify-center items-center">
            <div className="w-[95%] md:w-2/3 lg:w-1/2">
                <h2 className="text-3xl font-semibold mb-4">a little about my journey</h2>
                <div className="flex flex-col gap-6 text-xl opacity-90">
                    <p className="flex flex-col gap-2">
                        <span className="mt-4 font-semibold">
                            setting up some context
                        </span>
                        <span>
                            i was always fascinated by websites and apps and i wanted to build one as a child. but never really cared to learn more about it.
                            years passed and i passed school and came the time to choose a major for graduation.
                        </span>
                    </p>
                    <p className="flex flex-col gap-2">
                        <span className="mt-4 font-semibold">
                            cs major and the 1st year of college
                        </span>
                        <span>
                            since i was interested in it before, i decided to go for bca(bachelors of computer application), a cs major in India
                            for students who are not from science background. <br />
                            in my senior secondary years, i went for commerce/business background and studied about economics, accountancy,
                            business and financial markets etc.
                            <br />
                            it was quite interesting but during the last year of school, covid hit and a lot
                            of things changed for me. during this time, i began exploring more fields like writing, learning more about business and tech.
                            <br />
                            <br />
                            it was 2021 and my first day of college when i wrote the first line of code to print hello world in c language and since then
                            i have been obsessing over the tech and learning and building more things.
                        </span>
                    </p>
                    <p className="flex flex-col gap-2">
                        <span className="mt-4 font-semibold">
                            failing a business in my 1st year
                        </span>
                        <span>
                            during my first year of college, i started learning c language and then switched to learning java and data structure. <br />
                            along with that, i started a side business of a writing agency. i was good at it and was already working on with a few clients
                            so i considered to convert it into an agency. <br />
                            i ran this agency for around 6 months and made a lot of mistakes. <br />
                            from poor quality of work to unsatisfied clients and poor management from my side, it was a complete failure.
                            <br /><br />
                            however, it taught me a few important lessons. around work ethics, commitment, and duty toward clients and how important
                            it is to provide value and be sincere, maintain proper communication, clear roadmap, deadline and list goes on... <br />
                            in short with that experience, i learnt the way things work and what it meant to be a professional.
                        </span>
                    </p>
                    <p className="flex flex-col gap-2">
                        <span className="mt-4 font-semibold">
                            learning dsa and web dev in 2nd year
                        </span>
                        <span>
                            in the 2 year, i practised dsa and started learning web development. learnt more about computer fundamentals, built a few static websites
                            using html, css, js...it was really fun. it still is. <br />
                            during this time i was also working as teaching assistant intern for java and dsa. didn&apos;t repeat previous mistakes and completed the internship
                            with utmost sincerity. this really boost my confidence, especially after the previous setback. <br />
                            i spent the second year learning more about web development. backend frameworks like express.js, databases like mongodb, postgresql, and built a
                            few basic projects and participated in a couple of online hackathons. didn&apos;t win any but gained good experiences.
                        </span>
                    </p>
                    <p className="flex flex-col gap-2">
                        <span className="mt-4 font-semibold">
                            final year, final story
                        </span>
                        <span>
                            during my final year, i participated majorly in hackathons and started looking for work. <br /> cleared a couple of interviews but couldn&apos;t join due to location
                            setting. won a hackathon but failed an easy interview for this large company <br /> and for another us-based startup...i was really down for a couple of months
                            as i didn&apos;t have good work experience to prove myself and couldn&apos;t find any internship opportunities.
                        </span>
                    </p>
                    <p>
                        somehow at the start of 2024 (literally the 1st of jan), i got freelance work to develop frontend for an early-age startup. <br /> i spent the next couple of months
                        working closely with the cto and senior engineer and developing this product.
                    </p>
                    <p>
                        happy with my work, they offered me an internship and i was asked to handle the backend for the app which was written in java and spring boot.
                        i took a couple of weeks to learn about the java springboot framework and have been learning more by building and breaking in the production. <br /> jk, my code didn&apos;t
                        break in prod, (okay it happened only once.)
                    </p>
                    <p>
                        i have completed my graduation now and available to work full-time. if you are wondering anything about my college, let me tell you, my college isn&apos;t very serious and i realised this in the
                        first week itself so i have been doing things in a different way and no attendance policy meant i only went to college for writing exams and assignments.
                    </p>
                    <p>
                        if you are reading this till now, i am not sure if my writing is captivating or your tolerance is high. <br /> btw drop me a message on <Link href="https://x.com/SimplerMayank" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">twitter <SquareArrowOutUpRight size={10} className="inline" /></Link> or <Link href="mailto:mayankbansal125@gmail.com" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all"> mail <SquareArrowOutUpRight size={10} className="inline" /></Link> or an anonymous message <Link href="https://mayank.sayout.net/" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all"> here <SquareArrowOutUpRight size={10} className="inline" /></Link> <br />
                        will make me happy and we can connect and share a conversation.
                    </p>
                    <p>
                        if you wondering what am i up to now, i am learning about advanced docker topics, passively reading eloquent javascript book, and at times watching technical videos on yt or reading blogs
                        on medium/ hashnode. i am trying to learn more and build a few useful products.<br /> (currently building a developer tool <Link href="https://github.com/MayankBansal12/feedback" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all"> called feedback <SquareArrowOutUpRight size={10} className="inline" />)</Link> <br />
                        i am available for hire so in case you find me interesting, feel free to reach out.
                    </p>
                    <p>
                        thanks for reading, it was my journey till mid 2024...going strong and will keep on improving.
                    </p>
                    <p className="text-xs opacity-50 py-2 text-right">
                        last update: 2024-09-15
                    </p>
                </div>
            </div>
        </div>
    )
}

export default More;