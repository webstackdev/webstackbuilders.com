/*
this.page.filePathStem: /pages/home/index
imagePath: /home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/src/assets/images/avatars/chris-southam.webp
outputDir: /home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/public/images/avatars
urlBasePath: images/avatars
lowSrc: [object Object]
highSrc: [object Object]

<picture>
  <source type="image/webp" srcSet="/img/chris-southam-24w.webp 24w, /img/chris-southam-75w.webp 75w" sizes="100vw" />

  <source type="image/jpeg" srcSet="/img/chris-southam-24w.jpeg 24w, /img/chris-southam-75w.jpeg 75w" sizes="100vw" />

  <img src="/img/chris-southam-75w.jpeg" alt="Photo of Chris Southam" width={75} height={75} />
</picture>


*/

const imageMetadata = {
  webp: [
    {
      format: 'webp',
      width: 24,
      height: 24,
      url: '/img/chris-southam-24w.webp',
      sourceType: 'image/webp',
      srcset: '/img/chris-southam-24w.webp 24w',
      filename: 'chris-southam-24w.webp',
      outputPath:
        '/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/public/images/avatars/chris-southam-24w.webp',
      size: 496,
    },
    {
      format: 'webp',
      width: 75,
      height: 75,
      url: '/img/chris-southam-75w.webp',
      sourceType: 'image/webp',
      srcset: '/img/chris-southam-75w.webp 75w',
      filename: 'chris-southam-75w.webp',
      outputPath:
        '/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/public/images/avatars/chris-southam-75w.webp',
      size: 1840,
    },
  ],
  jpeg: [
    {
      format: 'jpeg',
      width: 24,
      height: 24,
      url: '/img/chris-southam-24w.jpeg',
      sourceType: 'image/jpeg',
      srcset: '/img/chris-southam-24w.jpeg 24w',
      filename: 'chris-southam-24w.jpeg',
      outputPath:
        '/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/public/images/avatars/chris-southam-24w.jpeg',
      size: 591,
    },
    {
      format: 'jpeg',
      width: 75,
      height: 75,
      url: '/img/chris-southam-75w.jpeg',
      sourceType: 'image/jpeg',
      srcset: '/img/chris-southam-75w.jpeg 75w',
      filename: 'chris-southam-75w.jpeg',
      outputPath:
        '/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/public/images/avatars/chris-southam-75w.jpeg',
      size: 2157,
    },
  ],
}

const imageMetadataArray = Object.values(imageMetadata)

console.log(imageMetadataArray[0][0].sourceType)
