/// <reference path="../../../@types/@github-docs/frontmatter.d.ts" />
/**
 * Revalidator schema validation for schema.org JSON-LD meta properties in front matter
 * https://github.com/flatiron/revalidator#schema
 */
import type { FrontmatterSchema } from '@github-docs/frontmatter'
//import { slugRegex } from '../util'

export const siteMeta: FrontmatterSchema = {
  name: {
    type: `string`,
    description: `The name of the website`,
    required: false,
    messages: {
      type: `The name must be a string, received %(actual)u`,
    },
  },
  description: {
    type: `string`,
    description: `A description of the website`,
    required: false,
    messages: {
      type: `The description must be a string , received %(actual)u`,
    },
  },
  url: {
    type: `string`,
    description: `URL of the website`,
    required: false,
    messages: {
      type: `The URL must be a string, received %(actual)u`,
    },
  },
  logo: {
    type: 'object',
    description: 'The logo image for the website',
    required: false,
    properties: {
      src: {
        type: `string`,
        description: `URL to the logo image source`,
        required: false,
        messages: {
          type: `The URL must be valid, received %(actual)u`,
        },
      },
      width: {
        type: `number`,
        description: `The width of the logo image`,
        required: false,
        messages: {
          type: `The width must be a reasonable number, received %(actual)u`,
        },
      },
      height: {
        type: `number`,
        description: `The height of the logo image`,
        required: false,
        messages: {
          type: `The type must be a reasonable number, received %(actual)u`,
        },
      },
    },
  },
}

export const organizationMeta: FrontmatterSchema = {
  name: {
    type: `string`,
    description: `The name of the organization`,
    required: false,
    messages: {
      type: `The name must be a string, received %(actual)u`,
    },
  },
  legalName: {
    type: `string`,
    description: `The legal name of the website owner`,
    required: false,
    messages: {
      type: `The name must be a string, received %(actual)u`,
    },
  },
  url: {
    type: `string`,
    description: `URL of the organization`,
    required: false,
    messages: {
      type: `The URL must be a string, received %(actual)u`,
    },
  },
  logo: {
    type: `string`,
    description: `URL of the organization's logo image`,
    required: false,
    messages: {
      type: `The logo image URL must be a string, received %(actual)u`,
    },
  },
  description: {
    type: `string`,
    description: `A description of the organization`,
    required: false,
    messages: {
      type: `The organization description must be a string, received %(actual)u`,
    },
  },
  foundingDate: {
    type: `string`,
    description: `Date the organization was founded`,
    required: false,
    messages: {
      type: `The founding date must be a valid date, received %(actual)u`,
    },
  },
  founders: {
    type: 'object',
    description: 'A list of people who founded this organization',
    required: false,
    properties: {
      name: {
        type: `string`,
        description: `The name of one of the organization's founders`,
        required: false,
        messages: {
          type: `The name must be a string, received %(actual)u`,
        },
      },
    },
  },
  address: {
    type: 'object',
    description: 'Physical address of the organization',
    required: false,
    properties: {
      streetAddress: {
        type: `string`,
        description: `The street address, e.g. 1600 Ampitheater Pkwy.`,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
      addressLocality: {
        type: `string`,
        description: `The locality in which the street address is and which is in the region, e.g. Mountain View.`,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
      addressRegion: {
        type: `string`,
        description: `The region in which the locality is and which is in the country, e.g. California`,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
      postalCode: {
        type: `string`,
        description: `The postal code, e.g. 94043`,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
      addressCountry: {
        type: `string`,
        description: `The country, e.g. USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.`,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
    },
  },
  contactPoint: {
    type: 'object',
    description: '',
    required: false,
    properties: {
      telephone: {
        type: `string`,
        description: ``,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
      contactType: {
        type: `string`,
        description: ``,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
      contactOption: {
        type: `string`,
        description: ``,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
      areaServed: {
        type: `string`,
        description: ``,
        required: false,
        messages: {
          type: `The type must be , received %(actual)u`,
        },
      },
    },
  },
  sameAs: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
}

export const breadcrumbsMeta: FrontmatterSchema = {
  name: {
    type: `string`,
    description: `The name of the breadcrumb link`,
    required: false,
    messages: {
      type: `The breadcrumb link must be a string, received %(actual)u`,
    },
  },
  url: {
    type: `string`,
    description: `URL of the breadcrumb link`,
    required: false,
    messages: {
      type: `The breadcrumb link URL must be a string, received %(actual)u`,
    },
  },
  position: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
  image: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
}

export const faqMeta: FrontmatterSchema = {
  question: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
  answer: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
}

export const postMeta: FrontmatterSchema = {
  author: {
    type: 'object',
    description: '',
    required: false,
    properties: {
      name: {
        type: `string`,
        description: `The name of the page content author`,
        required: false,
        messages: {
          type: `The author's name must be a string, received %(actual)u`,
        },
      },
    },
  },
  published: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
  modified: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
  section: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
}

export const productMeta: FrontmatterSchema = {
  x: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
}

export const metaSchema: FrontmatterSchema = {
  site: siteMeta,
  language: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
  url: {
    type: `string`,
    description: `URL of the page`,
    required: false,
    messages: {
      type: `The page URL must be a string, received %(actual)u`,
    },
  },
  title: {
    type: `string`,
    description: ``,
    required: false,
    messages: {
      type: `The type must be , received %(actual)u`,
    },
  },
  description: {
    type: `string`,
    description: `A description of the page`,
    required: false,
    messages: {
      type: `The page description must be a string , received %(actual)u`,
    },
  },
  image: {
    type: 'object',
    description: '',
    required: false,
    properties: {
      src: {
        type: `string`,
        description: `URL to an image source for the page`,
        required: false,
        messages: {
          type: `The URL must be valid, received %(actual)u`,
        },
      },
    },
  },
  organization: organizationMeta,
  breadcrumbs: breadcrumbsMeta,
  faq: faqMeta,
  post: postMeta,
  product: productMeta,
}

export default metaSchema
