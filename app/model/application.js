const store = require("./store");
const modelUtils = require("./utils");

const Example = (module.exports = store.defineEntity("Example", {
    table: "example",
    id: {
        column: "id",
        sequence: "id",
    },
    properties: {
        /**
         * The name of this datarecord 
         * @name Data.prototype.name
         * @type string
         */
        name: {
            column: "name",
            type: "string",
            nullable: false,
        },
        description: {
            column: "description",
            type: "string",
        },
        status: {
            column: "status",
            type: "string",
        },
        /**
         * The state of this datarecord (online/offline)
         * @name Data.prototype.status
         * @type integer
         */
        status: {
            column: "status",
            type: "integer",
        },
        /**
         * The createtime of this data-record
         * @name Data.prototype.createtime
         * @type Timestamp
         */
        createtime: {
            column: "createtime",
            type: "timestamp",
        },
        /**
         * The modifytime of this data-record
         * @name Data.prototype.modifytime
         * @type timestamp
         */
        modifytime: {
            column: "modifytime",
            type: "timestamp",
        },
    },
}));

Example.prototype.update = function (data) {
    return modelUtils.update(this, data);
};

Example.getAll = function () {
    return store.query("select * from Example order by id asc");
};

Example.getById = function (id) {
    return store.query("select * from Example where id = :id", {id: id});
};
