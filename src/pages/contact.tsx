import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

const Contact: React.FC = () => {
  return (
    <div className='mt-20 my-10 flex flex-col gap-3 justify-center items-center'>
      <div className='w-[95%] md:w-2/3 lg:w-1/2'>
        <h2 className='text-3xl font-semibold mb-4'>contact</h2>
        <div className='flex flex-col gap-6 text-xl opacity-90'>
          <p>you can find me online on:</p>
          <p className='flex gap-6 items-center'>
            -&gt; twitter (don&apos;t like to call it x){' '}
            <Link
              href='https://x.com/SimplerMayank'
              className='font-semibold text-lg hover:underline hover:opacity-90 transition-all'
            >
              simplermayank <SquareArrowOutUpRight size={10} className='inline' />
            </Link>{' '}
          </p>
          <p className='flex gap-6 items-center'>
            -&gt; github (trying to be consistent){' '}
            <Link
              href='https://github.com/MayankBansal12'
              className='font-semibold text-lg hover:underline hover:opacity-90 transition-all'
            >
              mayankbansal12 <SquareArrowOutUpRight size={10} className='inline' />
            </Link>{' '}
          </p>
          <p className='flex gap-6 items-center'>
            -&gt; gmail (i read all my emails ^-^){' '}
            <Link
              href='mailto:mayankbansal125@gmail.com'
              className='font-semibold text-lg hover:underline hover:opacity-90 transition-all'
            >
              mayankbansal125@gmail.com <SquareArrowOutUpRight size={10} className='inline' />
            </Link>{' '}
          </p>
          <p className='flex gap-6 items-center'>
            -&gt; linkedin (forgot linkedin passwd){' '}
            <Link
              href='https://www.linkedin.com/in/mayank-bansal200604012/'
              className='font-semibold text-lg hover:underline hover:opacity-90 transition-all'
            >
              --mb2004-- <SquareArrowOutUpRight size={10} className='inline' />
            </Link>{' '}
          </p>
          <p className='flex gap-6 items-center'>
            -&gt; my blog (not super consistent..){' '}
            <Link
              href='https://mayank12.substack.com/'
              className='font-semibold text-lg hover:underline hover:opacity-90 transition-all'
            >
              {' '}
              substack_link <SquareArrowOutUpRight size={10} className='inline' />
            </Link>
          </p>
          <p className='flex gap-6 items-center'>
            -&gt; you can schedule a online meet{' '}
            <Link
              href='https://cal.com/mayankbansal'
              className='font-semibold text-lg hover:underline hover:opacity-90 transition-all'
            >
              {' '}
              cal.com_link <SquareArrowOutUpRight size={10} className='inline' />
            </Link>{' '}
          </p>
          <p className='flex gap-6 items-center'>
            -&gt; leave anonymous mess/feedback{' '}
            <Link
              href='https://mayank.sayout.net/'
              className='font-semibold text-lg hover:underline hover:opacity-90 transition-all'
            >
              sayout_link <SquareArrowOutUpRight size={10} className='inline' />
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
