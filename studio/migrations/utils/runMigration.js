import {getCliClient} from 'sanity/cli';

const client = getCliClient();

const createTransaction = mutations => {
  return mutations.reduce((tx, mutation) => {
    if (mutation.patch) {
      return tx.patch(mutation.id, mutation.patch);
    }
    if (mutation.delete) {
      return tx.delete(mutation.delete);
    }
    if (mutation.create) {
      return tx.createIfNotExists(mutation.create);
    }
  }, client.transaction());
};

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async ({ mutationsBuilder }) => {
  const mutations = await mutationsBuilder();

  if (mutations.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }

  console.log(`Migrating ${mutations.length} docs`);

  const transaction = createTransaction(mutations);

  return await commitTransaction(transaction);
};

export const runMigration = ({ mutationsBuilder }) =>
  migrateNextBatch({ mutationsBuilder }).catch(err => {
    console.error(err);
    process.exit(1);
  });
