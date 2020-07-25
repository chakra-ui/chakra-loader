import RuleSet from 'webpack/lib/RuleSet'

/**
 * Requires module from path
 * @param {String} path Module name or absolute path
 * @returns {Module}
 */
function requireModule (path) {
  try {
    return require.resolve(path)
  } catch (e) {
    console.error(`[ChakraLoaderPlugin]: Could not resolve module at ${path}`, e)
  }
}

export default class ChakraLoaderPlugin {
  constructor(/** No construnctor options ATM */) {}

  apply (compiler) {
    // use webpack's RuleSet utility to normalize user rules
    const rawRules = compiler.options.module.rules
    const { rules } = new RuleSet(rawRules)
    this.rules = rules

    // find the rules that apply to vue files
    const vueRule = rules.find(rule => rule.use && rule.use.find(use => use.loader.includes('vue-loader')))

    if (!vueRule.length) {
      throw new Error(
        '[ChakraLoaderPlugin Error] No matching rule for vue-loader found.\n' +
        'Please make sure that vue-loader is installed and included in your webpack config.'
      )
    }

    vueRule.use.unshift({
      loader: requireModule('./loader.js')
    })
    compiler.options.module.rules = rules

    // vueRule.forEach(this.updateRule.bind(this))

    compiler.options.module.rules = rules
  }
}