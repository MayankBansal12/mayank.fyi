import Skill from '@/components/Skill';

const About: React.FC = () => {
  return (
    <div className='mt-10 md:mt-20'>
      <article>
        <h1 className='text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold'>
          about
        </h1>
        <p className='text-content text-lg py-6 leading-6 md:leading-normal lg:max-w-3xl'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolorum distinctio saepe doloremque iste consequuntur repellat blanditiis impedit dicta fugiat voluptates aliquid, odio, aut at eligendi autem fugit. Repellat, deserunt!
        </p>
      </article>
      <section className='mt-8'>
        <h1 className='text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold'>
          skills
        </h1>
        <Skill title='Languages' description='PHP - Typescript - Javascript' />
        <Skill
          title='Back end'
          description='Laravel - Node.Js - BullMQ - TRPC - Redis - MySQL - MongoDB'
        />
        <Skill
          title='Front end'
          description='Next.Js - React.Js - Vue.Js - Livewire - Alpine.Js - Tailwind - ChakraUI - Chart.Js'
        />
        <Skill title='Infraestructure' description='Mongo Atlas - NGINX - AWS - Vercel' />
      </section>
    </div>
  );
};

export default About;
