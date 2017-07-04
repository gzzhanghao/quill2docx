import units from 'units-css'
import officegen from 'officegen'

const DEFAULT_OPTIONS = {
  handleCustomOperation() {},
}

export default async function convert(delta, opts) {
  const options = Object.assign({}, DEFAULT_OPTIONS, opts)
  const docx = officegen('docx')

  for (const op of delta.ops) {
    if (!op || !op.insert) {
      return reject(new Error('Delta contains non-insert operations'))
    }
  }

  const lines = []

  delta.eachLine((line, attributes) => {
    lines.push({ line, attributes })
  })

  for (const { line, attributes } of lines) {

    // officegen only supports center, right and justify
    let align = attributes.align
    if (!['left', 'center', 'right'].includes(align)) {
      align = 'justify'
    }

    const p = docx.createP({ align })

    for (const op of line.ops) {
      const attributes = op.attributes || {}

      if (typeof op.insert !== 'string') {
        handleCptions.customOperation(p, op)
        continue
      }

      const props = {

        // only hex color are supported
        color: attributes.color.slice(1),
        link: attributes.link,

        bold: attributes.bold,
        italic: attributes.italic,
        underline: attributes.underline,
      }

      // officegen accepts font_size in points
      if (attributes.size) {
        props.font_size = units.convert('pt', `${attributes.size}px`)
      }

      p.addText(op.insert, props)
    }
  }

  return docx
}
