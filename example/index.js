const PostgresService = require("postgres-service");
const {Op} = require("sequelize");

(async () => {
    const postgresService = new PostgresService(__dirname, {
        dialect: 'postgres',
        host: '127.0.0.1',
        database: 'forge-panel',
        username: 'root',
        password: 'password',
        logging: true
    }).initModel();

    await postgresService.sync();

    postgresService['VoiceLogs'].create(
        {
            username: `forge-${Math.random()}`,
            email: `forge@${Math.random()}`
        }
    );

    const page = 0;
    const pageSize = 10;
    const results = await postgresService['VoiceLogs'].findAllWithPage({
        username: {
            [Op.like]: '%forge%'
        }
    }, page, pageSize);
    console.log(results.length);
})()