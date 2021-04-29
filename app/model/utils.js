const log = require("ringo/logging").getLogger(module.id);
const utils = require("../utils");

/**
 * Updates a model instance using the data passed as argument.
 * @param {Storable} model The model to update
 * @param {Object} data The data to use
 * @returns {Object} An object containing the properties that have been updated
 */
exports.update = function(model, data) {
    log.debug("Updating {}", model);
    const changed = Object.keys(data).reduce(function(changed, key) {
        const value = data[key];
        if (!utils.isEqual(model[key], value)) {
            changed[key] = model[key];
            model[key] = value;
        }
        return changed;
    }, {});
    const changedKeys = Object.keys(changed);
    if (changedKeys.length > 0) {
        model.save();
        log.info("Updated {} (changed {})", model, changedKeys.join(", "));
    }
    return changed;
};

exports.clone = function(source) {
    const clone = new source.constructor();
    const {properties} = source.constructor.mapping;
    Object.keys(properties).forEach(function(key) {
        const propMapping = properties[key];
        const value = source[key];
        if (propMapping.isPrimitive) {
            clone[key] = value;
        }
    });
    return clone;
};