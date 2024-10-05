const {Sequelize} = require("sequelize");
const fs = require("fs");
const path = require("path");

class ModelService {
    constructor(model) {
        this.model = model;
    }

    findAllWithPage(where = {}, page = 1, pageSize = 10, otherOptions = {}) {
        return new Promise(async (resolve, reject) => {
            page = page = Math.max(1, page);
            try {
                const results = await this.model.findAll({
                    where,
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                    ...otherOptions
                });
                resolve(results);
            } catch (err) {
                reject(err);
            }
        })
    }

    create(...values) {
        return new Promise(async (resolve, reject) => {
            try {
                const results = await this.model.bulkCreate(values);
                resolve(results);
            } catch (err) {
                reject(err);
            }
        })
    }
}

class PostgresService {
    constructor(directoryWork, sequelizeConfig) {
        this.directoryWork = directoryWork;
        this.sequelize = new Sequelize(sequelizeConfig);
    }

    initModel() {
        const models = fs.readdirSync(path.resolve(this.directoryWork, 'models'));
        for (let model of models.filter(model => model.endsWith(".js"))) {
            const start = new Date().getTime();
            model = model.slice(0, -3);
            const modelName = model;
            model = require(path.resolve(this.directoryWork, 'models', `${modelName}.js`));
            const modelService = new ModelService(model(this));
            delete require.cache[require.resolve(path.resolve(this.directoryWork, 'models', `${modelName}.js`))];
            this[modelName] = modelService;
            const end = new Date().getTime();
            console.log(modelName, "have been initialized in", end - start, "ms");
        }
        return this;
    }

    sync(force = false) {
        return this.sequelize.sync({
            force
        });
    }
}

module.exports = PostgresService;