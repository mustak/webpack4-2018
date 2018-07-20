module.exports = {
    ident: 'postcss',
    plugins: {
        //require('postcss-flexbugs-fixes'),
        'autoprefixer': {
            flexbox: 'no-2009'
        },
        'postcss-preset-env': {}
    }
}
