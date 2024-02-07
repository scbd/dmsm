import consola from 'consola';
import mariadb from 'mariadb';


const pools = {};
const connections = {};

export function getPool (ctx, dbName) {
  if (pools[dbName]) return pools[dbName];

  const { dbHost:host, dbPort:port, dbUser:user, dbPassword:password } = ctx.config;


  pools[dbName] = mariadb.createPool({ host, port, user, password, database: dbName, connectionLimit: 5, trace:true});

  return pools[dbName];
}

async function endPool (dbName) {
  const pool = pools[dbName];

  if (!pool) return;

  await pool.end();

  delete (pools[dbName]);
}

async function getConnection (dbName) {
  if (connections[dbName]) return connections[dbName];

  connections[dbName] = await pools[dbName].getConnection();

  return connections[dbName];
}

function closePool (dbName) {
  if (pools[dbName]) pools[dbName].end();
  delete (pools[dbName]);
}

function releaseConnection (dbName) {
  if (connections[dbName]) return connections[dbName].release();
}

function endConnection (dbName) {
  if (connections[dbName]) return connections[dbName].end();
}

const dbSet = async (dbName, queryText, queryVars, close=true) => {
  try {
    await getPool(dbName);

    const db = await getConnection(dbName);

    const response = await db.query(queryText, queryVars);

    if (!response.affectedRows) throw new Error(`dbQuery: NOT FOUND ... ${queryText} : values => ${JSON.stringify(queryVars)}`);

    // await releaseConnection(dbName)
    return !!response.affectedRows;
  } catch (e) {
    consola.error(e);
  } finally {
    await releaseConnection(dbName);// release to pool
    // if(!close) return;
    // await endConnection(dbName);
    // await endPool(dbName);
  }
};

const dbBatch = async (ctx,dbName, queryText, queryVars, close=true) => {
  try {
    await getPool(ctx,dbName);

    const db = await getConnection(dbName);

    const response = await db.batch(queryText, queryVars);

    if (!response.affectedRows) throw new Error(`dbBatch: NOT FOUND ... ${queryText} : values => ${JSON.stringify(queryVars)}`);

    return !!response.affectedRows;
  } catch (e) {
    consola.error(e);
  } finally {
    await releaseConnection(dbName);// release to pool
    // if(!close) return;
    // await endConnection(dbName);
    // await endPool(dbName);
  }
};



const dbGet = async (ctx,dbName,  queryText, queryVars=[], close=true) => {
  try {
  
    await getPool(ctx, dbName);

    const db = await getConnection(dbName);

    return db.query( queryText, queryVars)

  } catch (e) {
    consola.error(e);
  } finally {

    await releaseConnection(dbName);
    // if(!close) return;
    // await endConnection(dbName);
    // await endPool(dbName);
  }
};



export const useDB = ()=> ({getPool, dbSet, dbGet, dbBatch, endPool, closePool, endConnection, })


