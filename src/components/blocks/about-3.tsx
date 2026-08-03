import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

interface FeaturedProject {
  slug: string;
  href: string;
  title: string;
  location: string;
  year: string;
  image: {
    src: string;
    alt: string;
  };
}

interface About3Props {
  title?: string;
  description?: string;
  featuredProjectsTitle?: string;
  featuredProjectsDescription?: string;
  featuredProjectsButtonText?: string;
  featuredProjects?: FeaturedProject[];
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: string[];
}

const defaultAchievements = [
  "300+ companies supported across every stage of growth.",
  "800+ projects finalized on time and on budget.",
  "99% client satisfaction across completed engagements.",
  "10+ industry awards recognizing our work.",
];

const defaultFeaturedProjects: FeaturedProject[] = [
  {
    slug: "placeholder-1",
    href: "#",
    title: "Placeholder Project One",
    location: "Location",
    year: "2024",
    image: {
      src: "https://shadcnblocks.com/images/block/placeholder-1.svg",
      alt: "placeholder",
    },
  },
  {
    slug: "placeholder-2",
    href: "#",
    title: "Placeholder Project Two",
    location: "Location",
    year: "2024",
    image: {
      src: "https://shadcnblocks.com/images/block/placeholder-2.svg",
      alt: "placeholder",
    },
  },
  {
    slug: "placeholder-3",
    href: "#",
    title: "Placeholder Project Three",
    location: "Location",
    year: "2024",
    image: {
      src: "https://shadcnblocks.com/images/block/placeholder-1.svg",
      alt: "placeholder",
    },
  },
];

export const About3 = ({
  title = "About Us",
  description = "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  featuredProjectsTitle = "Featured Projects",
  featuredProjectsDescription,
  featuredProjectsButtonText = "View project",
  featuredProjects = defaultFeaturedProjects,
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  return (
    <section className="pt-32">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-3xl md:text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="mb-14">
          <div className="mb-8 gap-5 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold">
              {featuredProjectsTitle}
            </h2>

          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="flex flex-col gap-4 bg-glass"
              >
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-col gap-3 p-6 pt-0">
                  <div>
                    <p className="text-lg font-semibold">{project.title}</p>
                    <p className="text-muted-foreground">
                      {project.location} — {project.year}
                    </p>
                  </div>
                  <Button variant="outline" className="mr-auto" asChild>
                    <a href={project.href}>{featuredProjectsButtonText}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-semibold">{achievementsTitle}</h2>
            <p className="max-w-screen-sm text-2xl text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {achievements.map((fact, idx) => (
              <div className="flex items-start gap-4 bg-glass p-6" key={idx}>
                <CheckCircleIcon size={22} weight="light" className="mt-1 shrink-0" />
                <p className="text-start text-base leading-relaxed text-muted-foreground">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
