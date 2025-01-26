import { Database } from "@azure/cosmos";

import { getCosmosClient } from "@/db1/cosmos-client";

let database: Database;

const DATABASE_ID = "Synnax AI Database";

export const getDatabase = async () => {
    if (!database) {
        database = (await getCosmosClient().databases.createIfNotExists({ id: DATABASE_ID })).database;
    }
    return database;
};