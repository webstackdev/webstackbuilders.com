import Uppy from '@uppy/core'
import DragDrop from '@uppy/drag-drop'

const uppy = new Uppy({
  id: 'contact',
  debug: false,
  restrictions: {
    maxFileSize: null,
    minFileSize: null,
    maxTotalFileSize: null,
    maxNumberOfFiles: null,
    minNumberOfFiles: null,
    allowedFileTypes: null,
  },
  //onBeforeFileAdded: (currentFile, files) => true,
  //onBeforeUpload: files => true,
  logger: 'debugLogger', // justErrorsLogger
})

uppy.setMeta({ username: 'Peter' }) // set or update meta for all files.
uppy.setFileMeta('myfileID', { resize: 1500 }) // set or update meta for specific file.
uppy.use(DragDrop, { target: 'body' }) // Add a plugin to Uppy, with an optional plugin options object

uppy.upload().then(result => {
  console.info('Successful uploads:', result.successful)

  if (result.failed.length > 0) {
    console.error('Errors:')
    result.failed.forEach(file => {
      console.error(file.error)
    })
  }
})
