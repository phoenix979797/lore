var topsort = require('topsort');

/**
 * Convert the set of hooks in Object form to a format topsort can work with
 *
 * @param {Object} hooks Set of hooks to load
 * @returns {Array} Hooks converted to an array format recognizable by topsort
 */
function getDependencyGraph(hooks) {
  var dependencyGraph = [];

  Object.keys(hooks).forEach(function(hookName) {
    if (!hooks[hookName]) {
      return;
    }

    var dependencies = hooks[hookName] || [];

    if(dependencies.length === 0) {
      dependencyGraph.push([hookName]);
    }

    dependencies.forEach(function(dependency) {
      dependencyGraph.push([dependency, hookName]);
    });
  });

  return dependencyGraph;
}

/**
 * Examines all the  hooks and reorder them so they execute in the proper sequence (so that
 * hooks that depend on other hooks are only loaded after those hooks are).
 *
 * @param {Object} hooks Set of hooks to load
 * @returns {Array} List of hooks, sorted by execution order
 */
module.exports = function sortHooksByLoadOrder(hooks) {
  var dependencyGraph = getDependencyGraph(hooks);
  //log.debug('hook dependency graph: ', dependencyGraph);

  var sortedDependencies = topsort(dependencyGraph);
  //log.debug('loading sorted hooks: ', sortedDependencies);

  return sortedDependencies;
};
