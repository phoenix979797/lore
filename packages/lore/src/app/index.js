var _ = require('lodash');
var loader = require('../loader');
var getVersionAndDependencyInfo = require('./getVersionAndDependencyInfo');
var getLogger = require('./getLogger');
var getEnvironment = require('./getEnvironment');
var getHooks = require('./getHooks');
var getInitializers = require('./getInitializers');
var sortHooksByLoadOrder = require('./sortHooksByLoadOrder');
var getConfig = require('./getConfig');
var validateReactConfig = require('./validateReactConfig');

/**
 * The Lore class constructor. Exposes the following fields for use:
 *
 * lore.version
 * lore.majorVersion
 * lore.minorVersion
 * lore.patchVersion
 * lore.dependencies
 * lore.config
 * lore.loader
 * lore.log
 * lore.hooks
 *
 */
var Lore = function() {
  this.log = getLogger();

  var versionInfo = getVersionAndDependencyInfo();
  this.version = versionInfo.version;
  this.majorVersion = versionInfo.majorVersion;
  this.minorVersion = versionInfo.minorVersion;
  this.patchVersion = versionInfo.patchVersion;
  this.dependencies = versionInfo.dependencies;

  this.utils = {};
};

_.extend(Lore.prototype, {

  /**
   * Builds the application, which involves setting the environment, composing the final
   * configuration, loading the hooks, and executing any initializers.
   *
   * @param {Object} configOverride The configuration passed into lore.build(configOverride)
   */
  build: function(configOverride) {
    configOverride = configOverride || {};

    // Set the environment first, in case any parts of the build process
    // change their behavior based on the environment
    this.environment = getEnvironment({
      environment: configOverride.environment
    });

    // The loader needs to be setup before the hooks as they will need to use
    // it to set up the project files
    this.loader = loader({
      environment: this.environment
    });

    // Next we need to load the hooks before the config, as the hooks contain
    // the defaults we need to build the final configuration for the app
    this.hooks = getHooks(configOverride.hooks);

    // Generate the final config from the combination of the overrides passed
    // into the app, the default config (calculated from the hooks), and the
    // user config for the project (loaded and compiled inside this function)
    this.config = getConfig(configOverride, this.hooks, this.loader);

    // Get initializers and run them
    this.initializers = getInitializers();
    if (this.initializers.length > 0) {
      this.initializers.forEach(function(initializer) {
        initializer();
      });
    }

    // Now that we have the final, we can load the hooks, as their behavior is
    // dependant on the final configuration for the application
    sortHooksByLoadOrder(this.hooks, this.log).forEach(function(hook) {
      //this.log.silly('Loading hook: ' + hook.id);
      hook.load(this);
      //this.log.verbose(hook.id, 'hook loaded successfully.');
    }.bind(this));

    //this.log.verbose('All hooks were loaded successfully.');
  },

  /**
   * Builds the application and mounts it to the DOM
   *
   * @param {Object} configOverride The configuration passed into lore.build(configOverride)
   */
  summon: function(configOverride) {
    this.build(configOverride);
    // this.log.verbose('Mounting app...');

    // Get the React config, so we can learn how to construct the Root component
    // and mount the application
    var react = this.config.react;

    // Validate the React config has all required methods
    validateReactConfig(react);

    // Get the Root component we should mount to the DOM
    var Root = react.getRootComponent(this);

    // Mount the app!
    react.mount(Root, this);
  }

});

module.exports = Lore;
