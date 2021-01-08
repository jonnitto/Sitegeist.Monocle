const brand = require('@neos-project/brand');
const brandVars = brand.generateCssVarsObject(brand.config, 'brand');

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-css-variables')({
            variables: Object.assign({
                //
                // Spacings
                //
                '--goldenUnit': '40px',
                '--spacing': '16px',
                '--halfSpacing': '8px',

                //
                // Sizes
                //
                '--sidebarWidth': '320px',

                //
                // Font sizes
                //
                '--baseFontSize': '14px'
            }, brandVars)
        }),
        require('postcss-nested')(),
        require('postcss-hexrgba')(),
        require('cssnano')({
            preset: 'default',
        }),
    ]
};
