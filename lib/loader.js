const Module = require('module')
const loaderUtils = require('loader-utils')
const camelCase = require('lodash.camelcase')
const kebabCase = require('lodash.kebabcase')
const upperFirst = require('lodash.upperfirst')
const { extractTags, matcher } = require('./utils')

const pascalCase = function (string) {
  return upperFirst(camelCase(string))
}


/** Loads Chakra components and sakes them in array */
function loadChakraComponents () {
  const components = []
  const _export = Module._load(require.resolve('@chakra-ui/vue'))
  for (const componentName in _export) {
    if (!(componentName.startsWith('C') && _export[componentName].name.startsWith('C'))) continue
    const componentOptions = {
      pascalName: pascalCase(componentName),
      kebabName: kebabCase(componentName),
      ..._export[componentName]
    }
    components.push(componentOptions)
  }

  return components
}

const components = loadChakraComponents()

function install (content, components) {
  const imports = '{' + components.map(c => `${c.pascalName}: require('@chakra-ui/vue').${c.pascalName}`).join(', ') + '}'

  let newContent = '/* chakra-loader */\n'
  newContent += `const installChakraComponents = require(${loaderUtils.stringifyRequest(this, '!' + require.resolve('./install-components'))})\n`
  newContent += `installChakraComponents(component, ${imports})\n`

  // Insert our modification before the HMR code
  const hotReload = content.indexOf('/* hot reload */')
  if (hotReload > -1) {
    content = content.slice(0, hotReload) + newContent + '\n\n' + content.slice(hotReload)
  } else {
    content += '\n\n' + newContent
  }
  return content
}


async function loader(content) {
  this.async()
  this.cacheable()
  
  if (!this.resourceQuery) {
    this.addDependency(this.resourcePath)
    
    const tags = await extractTags(this.resourcePath)
    const matchedComponents = matcher(tags, components)

    // console.log(matchedComponents)
    if (matchedComponents.length) {
      content = install.call(this, content, matchedComponents)
    }
  }

  this.callback(null, content)
}

module.exports = loader