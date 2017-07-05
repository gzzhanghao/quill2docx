# quill2docx

Convert Quill Delta to DocX.

## Usage

```javascript
import quill2Docx from 'quill2docx'

quill2Docx(delta, {

  handleCustomOperation(p, op) {

    // p: pObj in officegen
    // op: quill delta's operation

    // handle images, divider, etc...
  },

}).then(docx => {

  // docx: officegen object

  docx.generate(outputStream)
})
```
