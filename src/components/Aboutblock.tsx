import { About3 } from "@/components/blocks/about-3";

const AboutBlock = () => {
  return (
    <About3
      title=""
      description=""
      mainImage={{
        src: "hero.jpg",
        alt: "placeholder",
      }}
      secondaryImage={{
        src: "hero.jpg",
        alt: "placeholder",
      }}
      breakout={{
        src: "hero.jpg",
        alt: "logo",
        title: "some title here",
        description:
          "medium sized description here",
        buttonText: "Discover more",
        buttonUrl: "https://shadcnblocks.com",
      }}
      companiesTitle="Valued by clients worldwide"
      companies={[
        {
          src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
          alt: "Arc",
        },
        {
          src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
          alt: "Descript",
        },
        {
          src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
          alt: "Mercury",
        },
        {
          src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
          alt: "Ramp",
        },
        {
          src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
          alt: "Retool",
        },
        {
          src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
          alt: "Watershed",
        }
      ]}
      achievementsTitle="Our Achievements in Numbers"
      achievementsDescription="Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth."
      achievements={
        [
          { label: "Companies Supported", value: "300+" },
          { label: "Projects Finalized", value: "800+" },
          { label: "Happy Customers", value: "99%" },
          { label: "Recognized Awards", value: "10+" },
        ]
      }
    />
  );
};

export default AboutBlock;
