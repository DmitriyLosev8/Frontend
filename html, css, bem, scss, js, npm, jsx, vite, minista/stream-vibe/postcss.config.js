import postcssPxToRem from 'postcss-pxtorem'
import postcssPresetEnv from 'postcss-preset-env'

export default ({ env }) => {
    const isProd = env === 'production'
    const plugins = []

    if(isProd) {
       plugins.push(
         postcssPxToRem({
           propList: ['*'],  //обрабатывать все свойства
           mediaQuery: true,  //обрабатывать и медиа выражения
         })
       )
        plugins.push(
            postcssPresetEnv()
        )
    }

    return {
      plugins,
    }
}