const { alias } = require('react-app-rewired');
const path = require('path');

module.exports = {
  webpack: function (config, env) {
    config = alias({
      '@': path.resolve(__dirname, 'src'),  // This sets '@' to your 'src' folder
    })(config);

    return config;
  },
};
