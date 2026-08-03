import { About3 } from "@/components/blocks/about-3";
import { listFeaturedProjects } from "@/lib/db/queries";
import type { Locale } from "@/lib/translations";

const AboutBlock = async ({ lang }: { lang: Locale }) => {
  const isAr = lang === "ar";
  const featured = await listFeaturedProjects(3);

  return (
    <About3
      title=""
      description=""
      featuredProjectsTitle={isAr ? "مشاريع مختارة" : "Featured Projects"}
      featuredProjectsButtonText={isAr ? "عرض المشروع" : "View project"}
      featuredProjects={featured.map((project) => ({
        slug: project.slug,
        href: `/${lang}/projects/${project.category}/${project.slug}`,
        title: isAr ? project.title_ar : project.title_en,
        location: isAr ? project.location_ar : project.location_en,
        year: project.year,
        image: {
          src: project.cover_image_url,
          alt: isAr ? project.title_ar : project.title_en,
        },
      }))}
      achievementsTitle={isAr ? "سجلّنا" : "Our Track Record"}
      achievementsDescription={
        isAr
          ? "استوديو قائم على الخبرة والانتشار والتقدير في قطاع التصميم الداخلي بالمملكة."
          : "A studio built on scale, heritage, and recognition across Saudi Arabia's design industry."
      }
      achievements={
        isAr
          ? [
              "أكثر من ١٠٠ مشروع في القطاعات السكنية، والتجارية، والضيافة.",
              "تأسيس الاستوديو في عام 2014 بمدينة جدة، المملكة العربية السعودية.",
              "سفيرة أحد أكبر معارض INDEX SAUDI ARABIA، أحد أكبر معارض التصميم الداخلي في المملكة.",
              "سفيرة معرض INTERIORS & FURNITURE SHOW JEDDAH، المتخصص في التصميم والأثاث.",
              "سفيرة معرض ORGATEC SAUDI ARABIA، المتخصص في تصميم بيئات العمل الحديثة.",
            ]
          : [
              "Over 100 projects across residential, commercial, and hospitality sectors.",
              "Founded in 2014 in Jeddah, Saudi Arabia.",
              "Ambassador of INDEX Saudi Arabia, one of the Kingdom's largest interior design exhibitions.",
              "Ambassador of the Interiors & Furniture Show Jeddah, specialized in design and furniture.",
              "Ambassador of ORGATEC Saudi Arabia, specialized in modern workplace design.",
            ]
      }
    />
  );
};

export default AboutBlock;
