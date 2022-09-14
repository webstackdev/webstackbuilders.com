/**
 * Data computed at end of data cascade and available to all pages
 */
module.exports = {
  // `data` is available in this scope, explicitly declare dependencies on it
  eleventyComputed: {
    /** Metadata for JSON-LD schema generator plugin */
    meta: {
      site: {
        name: `Site title`,
        description: `Site description`,
        url: `https://example.com`,
        logo: {
          src: `https://example.com/images/logo.png`,
          width: 1200,
          height: 630,
        },
      },
      language: `en-US`,
      url: `https://example.com/page`,
      title: data => data.title,
      description: `Page description`,
      image: {
        src: `https://example.com/images/page.png`,
      },
      //organization: organizationMeta,
      //breadcrumbs: breadcrumbsMeta,
      //faq: faqMeta,
      //post: postMeta,
      //product: productMeta,
    },
  },
}

/**
 * `organization`, `breadcrumbs`, and `faq` are automatically included if
 * there is a key present for them under the `meta` key in front matter data.
 */
/*
const organizationMeta = {
  organization: {
    name: `Elite Strategies`,
    legalName: `Elite Strategies Llc`,
    url: `http://www.elite-strategies.com`,
    logo: `http://cdn.elite-strategies.com/wp-content/uploads/2013/04/elitestrategies.png`,
    description: `Mailjet SAS is an all-in-one Email Services Provider`,
    foundingDate: '2009',
    founders: {
      name: `Patrick Coombe`,
    },
    address: {
      streetAddress: `900 Linton Blvd Suite 104`,
      addressLocality: `Delray Beach`,
      addressRegion: `FL`,
      postalCode: '33444',
      addressCountry: `USA`,
    },
    contactPoint: [
      {
        telephone: `+1-888-888-9999`,
        contactType: `customer service`,
        contactOption: `TollFree`,
        areaServed: `US`,
      },
      {
        telephone: `+1-888-888-9998`,
        contactType: `Sales`,
      },
      {
        telephone: `+1-888-888-9997`,
        contactType: `technical support`,
        contactOption: `TollFree`,
        areaServed: `US`,
        availableLanguage: [
          `English`,
          `French`,
        ],
      },
      {
        telephone: `+1-888-888-9997`,
        contactType: `bill payment`,
        contactOption: `TollFree`,
        areaServed: [
          `US`,
          `GB`,
        ],
      },
    ],
    sameAs: [
      `http://www.freebase.com/m/0_h96pq`,
      `http://www.facebook.com/elitestrategies`,
      `http://www.twitter.com/delraybeachseo`,
      `http://pinterest.com/elitestrategies/`,
      `http://elitestrategies.tumblr.com/`,
      `http://www.linkedin.com/company/elite-strategies`,
      `https://plus.google.com/106661773120082093538`,
    ],
  },
}

const breadcrumbsMeta = {
  breadcrumbs: [
    {
      name: `Home`,
      url: `https://schema.org`,
      position: 1,
      image: `https://example.com/path/to/image.png`,
    },
    {
      name: `Contact`,
      url: `https://schema.org/contact`,
      position: 2,
    },
    {
      name: `About`,
      url: `https://schema.org/About`,
      position: 3,
    },
  ],
}

const faqMeta = {
  faq: [
    {
      question: `How old are you?`,
      answer: `12`,
    },
    {
      question: `What is your name?`,
      answer: "<p>Joe</p>",
    },
    {
      question: `What of it?`,
      answer: `Not much.`,
    },
  ],
}
*/
/**
 * Top level types, extending from default `page` type
 */

/*
const postMeta = {
  author: {
    name: `First Last`,
  },
  published: `2020-07-03T06:43:21.123Z`,
  modified: `2020-07-03T08:35:46.289Z`,
  // articleSection
  section: `Example`,
}

// https://github.com/quasibit/eleventy-plugin-schema/blob/master/src/script.js
const productMeta = {
  gtin: `1`,
  gtin12: `1`,
  gtin13: `1`,
  gtin14: `1`,
  gtin8: `1`,
  sku: `1`,
  mpn: `1`,
  countryOfOrigin: `USA`,
  color: `Red`,
  brand: `Pear`,
  manufacturer: `Pear`,
  material: `Plastic`,
  productID: `ISBN:1`,
  category: `cars`,
  offers: {
    price: `100`,
  },
  rating: {
    ratingValue: `4.2`,
  },
  identifier: `1`,
  reviews: [
    {
      name: `great product`,
      date: `yesterday`,
      review: `this product is amazing`,
      rating: 5,
      author: `mr president`,
      publisher: `the Whitehouse`,
    },
    {
      name: `another great product`,
      review: `this product is even more amazing`,
    },
    {
      name: `great product`,
      date: `yesterday`,
      rating: 5,
      author: `mr president`,
    },
  ]
}
*/
