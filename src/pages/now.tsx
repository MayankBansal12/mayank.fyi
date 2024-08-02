import Link from "next/link"

const Now: React.FC = () => {
    return (
        <div className="mt-20 flex flex-col gap-4 justify-center items-center">
            <div className="w-1/2">
                <h2 className="text-3xl font-semibold mb-4">what am i doing now?</h2>
                <div className="flex flex-col gap-6 text-xl opacity-80">
                    <p>
                        i am working as an sde intern in an early-stage startup
                        where i am working on developing the core product mainly
                        handling backend development in java and springboot.
                    </p>
                    <p>
                        apart from that, i am building a developer tool as a side
                        project <Link href="https://github.com/MayankBansal12/feedback" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">(called feedback)</Link>. mainly using next.js, and typescript for this one and
                        building it gradually as i learn more things.
                    </p>

                    <p>
                        i am learning more about docker these days. have the basic
                        understanding of how it works, i am trying to learn more
                        advanced topics and practising more. <br />
                    </p>

                    <p>p.s.&#41; &#41; what am i doing now? i would probably be watching movies or sleeping, if not staring into my coding editor. </p>
                    <p>p.p.s.&#41; &#41; i am available for  <Link href="/hire" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">hire</Link>, it might look i am doing a lot but i am exaggerating...need more work ^-^*</p>
                </div>
            </div>
        </div>
    )
}

export default Now