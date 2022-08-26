/**
 * Schema for All Pages
 *
 * Set a function-like syntax with options to over-ride by deep merge:
 * avatarSchema({ image: { required: true } })
 */

/** Article page schema */
const articlePageSchema = [
  'eleventySchema',
  'baseSchema',
  'cardImageSchema',
  'coverImageSchema',
  'featuredSchema',
  'navigationSchema',
  'slugSchema',
]

/** Case studies page schema */
const caseStudiesPageSchema = [
  'eleventySchema',
  'baseSchema',
  'cardImageSchema',
  'coverImageSchema',
  'featuredSchema',
  'navigationSchema',
  'slugSchema',
]

/** Contact page schema */
const contactPageSchema = ['eleventySchema', 'baseSchema', 'navigationSchema']

/** Home page schema */
const homePageSchema = ['eleventySchema', 'baseSchema']

/** Services page schema */
const servicesPageSchema = ['eleventySchema', 'baseSchema', 'navigationSchema', 'slugSchema']

/** Site page schema */
const sitePageSchema = ['eleventySchema', 'baseSchema']

/** Testimonial page schema */
const testimonialPageSchema = [
  'eleventySchema',
  'avatarSchema',
  'featuredSchema',
  'nameSchema',
  'organizationSchema',
]

exports.allPageSchemas = [
  {
    glob: `./src/pages/articles/**/*.{md,njk}`,
    properties: articlePageSchema,
  },
  {
    glob: `./src/pages/case-studies/**/*.{md,njk}`,
    properties: caseStudiesPageSchema,
  },
  {
    glob: `./src/pages/contact/**/*.{md,njk}`,
    properties: contactPageSchema,
  },
  {
    glob: `./src/pages/services/**/*.{md,njk}`,
    properties: servicesPageSchema,
  },
  {
    glob: `./src/pages/site/**/*.{md,njk}`,
    properties: sitePageSchema,
  },
  {
    glob: `./src/pages/testimonials/**/*.{md,njk}`,
    properties: testimonialPageSchema,
  },
  {
    glob: `./src/pages//*.njk`,
    properties: sitePageSchema,
  },
]
