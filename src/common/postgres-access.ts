import { Client } from "pg";

export const setConnection = async () => {
    const client = new Client({
        host: "localhost",
        port: 15432,
        user: "yeeun",
        password: "cAzKRZQqBX2s6RZ",
        database: "exercise",
    });

    await client.connect();
    return client;
};


