# quill2docx

Convert Quill Delta to DocX.

__This package is under heavy development, use it at your own risk__

## Usage

```javascript
import quill2Docx from '@gzzhanghao/quill2docx'

quill2Docx(delta, {

  /**
   * Handle non-string content
   */
  handleCustomOperation(p, op) {

    // p: pObj in officegen
    // op: quill delta's operation

    // handle images, divider, etc...

    p.addText('[NOT_SUPPORTED_CONTENT]')
  },

}).then(docx => {

  // docx: officegen object

  docx.generate(outputStream)
})
```
