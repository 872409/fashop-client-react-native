const path = require('path');
const fs = require('fs');
// for 1.x
// const defaultVars = require('antd-mobile-rn/lib/style/themes/default');
// for 2.x
const defaultVars = require('antd-mobile-rn/lib/style/themes/default.native');
const customVars = require('../src/utils/theme');
// for 1.x
// const themePath = path.resolve(require.resolve('antd-mobile-rn'), '../style/themes/default.js');
// for 2.x
const themePath = path.resolve(require.resolve('antd-mobile-rn'), '../style/themes/default.native.js');
const themeVars = Object.assign({}, defaultVars, customVars);

if (fs.statSync(themePath).isFile()) {
  fs.writeFileSync(
    themePath,
    `var brandPrimary = "${customVars.brand_primary}"; var brandPrimaryTap = "${customVars.brand_primary_tap}";module.exports = ${JSON.stringify(themeVars)}`
  );
}
