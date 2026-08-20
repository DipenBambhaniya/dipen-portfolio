import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Writing posts={latestPosts} />
      <Contact />
    </>
  );
}
