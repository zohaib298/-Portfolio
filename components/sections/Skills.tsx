import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SkillCard from "@/components/SkillCard";
import { skills } from "@/lib/data";
import { STAGGER } from "@/lib/motion";

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-12 lg:px-20">
      <Reveal>
        <SectionHeading eyebrow="Skills" title="Tools I build with" number="02" />
      </Reveal>

      <StaggerGroup
        stagger={STAGGER}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map(({ label, icon: Icon }) => (
          <StaggerItem key={label}>
            <SkillCard
              label={label}
              icon={
                <Icon className="h-8 w-8 text-muted transition-colors duration-300 group-hover:text-accent" />
              }
            />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
