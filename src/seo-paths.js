const seoPaths = {
  '/courses/digital-marketing': '/digital-marketing-courses-in-mahe',
  '/courses/multimedia': '/multimedia-courses-in-mahe',
  '/courses/interior-designing': '/interior-designing-courses-in-mahe',
  '/courses/accounting': '/accounting-courses-in-mahe',
  '/courses/ms-office': '/ms-office-courses-in-mahe',
  '/courses/sap': '/sap-training-courses-in-mahe',
  '/courses/skill-developments': '/skill-development-courses-in-mahe',
  '/life': '/life-at-gtec-mahe',
};

export const seoPath = (pathname) => seoPaths[pathname] || pathname;

export const courseHref = (slug) => seoPath(`/courses/${slug}`);
