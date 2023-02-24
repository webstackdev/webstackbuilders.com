/**
 * List of tags to use for validation in 'scripts/validate-frontmatter' build step.
 */

/** Allow normalizing non-camelCased tag names */
const exceptions = {
  apiDesign: `API Design`,
  aws: `AWS`,
  cd: `CD`,
  ci: `CI`,
  cms: `CMS`,
  crm: `CRM`,
  graphql: `GraphQl`,
  restful: `RESTful`,
  scss: `SCSS`,
  sqlOptimization: `SQL Optimization`,
  typescript: `TypeScript`,
}

const pageTags = [`articles`, `case-studies`, `contact`, `home`, `services`, `site`, `testimonials`]

const serviceTags = [
  `rails`,
  `laravel`,
  `express`,
  `react`,
  `typescript`,
  `scss`,
  `databaseNormalization`,
  `sqlOptimization`,
  `ci`,
  `cd`,
  `deployment`,
  `aws`,
  `apiDesign`,
  `restful`,
  `graphql`,
  `devPortals`,
  `marTech`,
  `adTech`,
  `cms`,
  `crm`,
]

module.exports = [
  `code`,
  `Joomla!`,
  `online-learning`,
  `cms`,
  ...pageTags,
  ...serviceTags,
]

module.exports.exceptions = exceptions
