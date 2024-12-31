import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"

const Hire: React.FC = () => {
    return (
        <div className="mt-20 my-10 flex flex-col gap-4 justify-center items-center">
            <div className="w-[95%] md:w-2/3 lg:w-1/2">
                <h2 className="text-3xl font-semibold mb-4">hire me</h2>
                <div className="flex flex-col gap-6 text-xl opacity-90">
                    <p>
                        -&gt; i am currently working at an early-age startup and am available to take on part-time or contract work. <br />
                        -&gt; i have previously worked as a freelancer and as an intern and
                        managed both frontend and backend for startups. <br />
                        -&gt; i have recently graduated and am available for full-time opportunities too.
                        <span className="font-medium"> read more <Link href="/about" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">about me <SquareArrowOutUpRight size={10} className="inline" /></Link> or see my work <Link href="/work" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">here <SquareArrowOutUpRight size={10} className="inline" /></Link> </span> <br />
                    </p>
                    <p>
                        i take pride in my work ethic and commitment. i have a knack <br />
                        for handling multiple projects simultaneously (hope that won&apos;t be a
                        problem for you).<br />
                    </p>
                    <p>
                        you can reach out to me on <Link href="https://x.com/SimplerMayank" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">twitter <SquareArrowOutUpRight size={10} className="inline" /></Link> or try mail at
                        <Link href="mailto:mayankbansal125@gmail.com" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all"> mayankbansal125@gmail.com <SquareArrowOutUpRight size={10} className="inline" /></Link> <br /> you can also schedule a online meet <Link href="https://cal.com/mayankbansal" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">here <SquareArrowOutUpRight size={10} className="inline" /></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hire