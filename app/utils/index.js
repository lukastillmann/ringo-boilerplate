const isEqual = exports.isEqual = function(value1, value2) {
    if (value1 === value2) {
        return true;
    } else if (value1 instanceof Date && value2 instanceof Date) {
        return value1.getTime() === value2.getTime();
    } else if (typeof(value1) !== "object" || typeof(value2) !== "object") {
        return value1 === value2;
    }
    return objectsAreEqual(value1, value2);
};
