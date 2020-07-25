const RuleSet = require('webpack/lib/RuleSet')

/**
 * Requires module from path
 * @param {String} path Module name or absolute path
 * @returns {Module}
 */
function requireModule (path) {
  try {
    return require.resolve(path)
  } catch {
    // Do nothing
  }
}

const vueLoaderPath = requireModule('vue-loader')

const isVueLoader = (use) => {
  return use.ident === 'vue-loader-options' ||
    use.loader === 'vue-loader' ||
    (vueLoaderPath && use.loader === vueLoaderPath)
}

const ChakraLoaderPlugin = class ChakraLoaderPlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply (compiler) {
    // use webpack's RuleSet utility to normalize user rules
    const rawRules = compiler.options.module.rules
    const { rules } = new RuleSet(rawRules)
    this.rules = rules
    // find the rules that apply to vue files
    const vueRules = rules.filter(rule => rule.use && rule.use.find(isVueLoader))
  
    if (!vueRules.length) {
      throw new Error(
        '[ChakraLoaderPlugin Error] No matching rule for vue-loader found.\n' +
        'Please make sure that vue-loader is installed and included in your webpack config.'
      )
    }

    vueRules.forEach(this.updateRule.bind(this))
    compiler.options.module.rules = rules
  }

  updateRule(rule) {
    rule.oneOf = [
      {
        resourceQuery: '?',
        use: rule.use
      },
      {
        use: [
          {
            loader: requireModule('./loader')
          },
          ...rule.use
        ]
      },
    ]
    delete rule.use
  }
}

module.exports = ChakraLoaderPlugin