const { readFileSync } = require('fs')
const { compile, parseComponent } = require('vue-template-compiler')

/**
 * Extracts all used tags in a single template
 * @param {String} resourcePath Resource/SFC path
 */
exports.extractTags = async (resourcePath) => {
  const tags = new Set()
  const file = (await readFileSync(resourcePath)).toString('utf8')
  const component = parseComponent(file)

  if (component.template) {
    /**
     * If user uses pug as template language
     */
    if (component.template.lang === 'pug') {
      try {
        const pug = require('pug')
        component.template.content = pug.render(component.template.content, { filename: resourcePath })
      } catch (err) { /* Ignore compilation errors, they'll be picked up by other loaders */ }
    }
    compile(component.template.content, {
      modules: [{
        postTransformNode: (el) => {
          tags.add(el.tag)
        }
      }]
    })
  }

  return [...tags]
}

/**
 * Matches all used tags against chakra components and returns the matching components
 * @param {Array} tags Array of used tags in template
 * @param {Array} components Array of `@chakra-ui/vue` components
 */
exports.matcher = (tags, components) => {
  return tags.reduce((matches, tag) => {
    const match = components.find(({ pascalName, kebabName }) => [pascalName, kebabName].includes(tag))
    match && matches.push(match)
    return matches
  }, [])
}