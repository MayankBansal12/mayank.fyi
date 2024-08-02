import Link from "next/link";

const Contact: React.FC = () => {
  return (
    <div className="my-20 flex flex-col gap-3 justify-center items-center">
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold mb-4">contact</h2>
        <div className="flex flex-col gap-6 text-xl opacity-80">
          <p>you can find me online on:</p>
          <p>twitter: <Link href="https://x.com/SimplerMayank" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">simplermayank</Link> </p>
          <p>github: <Link href="https://github.com/MayankBansal12" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">mayankbansal12</Link> </p>
          <p>mail: <Link href="mailto:mayankbansal125@gmail.com" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">mayankbansal125@gmail.com</Link> </p>
          <p>linkedin: <Link href="https://www.linkedin.com/in/mayank-bansal200604012/" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">--mb2004--</Link> </p>

          <p>you can schedule a online meet using <Link href="https://cal.com/mayankbansal" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all"> cal.com.</Link></p>
          <p>my blog/newsletter (not super consistent): <Link href="https://cal.com/mayankbansal" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">substack_link</Link></p>
          <p>if you wanna leave anonymous message or feedback, <Link href="https://mayank.sayout.net/" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">use this</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
