/**
 * All page schemas object
 */
const { allPageSchemas } = require(`./allPages`)
exports.allPageSchemas = allPageSchemas

/**
 * Front matter schema validation for Eleventy special data keys:
 * 'date', 'tags', 'layout', 'permalink', 'eleventyExcludeFromCollections',
 * 'templateEngineOverride', and 'eleventyComputed'.
 */
const { eleventySchema } = require(`./eleventy`)
exports.eleventySchema = eleventySchema

/**
 * Revalidator schema validation for 'avatar' key
 */
const { avatarSchema } = require(`./avatar`)
exports.avatarSchema = avatarSchema

/**
 * Revalidator schema validation for base properties in front matter:
 * 'title', 'description', and 'layout'.
 */
const { baseSchema } = require(`./base`)
exports.baseSchema = baseSchema

/**
 * Front matter schema validation for 'cardImage' key
 */
const { cardImageSchema } = require(`./cardImage`)
exports.cardImageSchema = cardImageSchema

/**
 * Front matter schema validation for 'coverImage' key
 */
const { coverImageSchema } = require(`./coverImage`)
exports.coverImageSchema = coverImageSchema

/**
 * Revalidator schema validation for 'featured' key in front matter
 */
const { featuredSchema } = require(`./featured`)
exports.featuredSchema = featuredSchema

/**
 * Front matter schema validation for 'name' key
 */
const { nameSchema } = require(`./name`)
exports.nameSchema = nameSchema

/**
 * Front matter schema validation for keys used by Navigation Plugin:
 * 'eleventyNavigation' with member properties 'keys', 'parent', 'title'
 */
const { navigationSchema } = require(`./navigation`)
exports.navigationSchema = navigationSchema

/**
 * Front matter schema validation for 'organization' key
 */
const { organizationSchema } = require(`./organization`)
exports.organizationSchema = organizationSchema

/**
 * Revalidator schema validation for 'slug' key in front matter
 */
const { slugSchema } = require(`./slug`)
exports.slugSchema = slugSchema
