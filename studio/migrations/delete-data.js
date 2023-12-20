import {getCliClient} from 'sanity/cli';

const client = getCliClient();

client
  .delete({query: '*[_type in ["Building", "Floor", "Space", "SpaceType"]]'})
  .then(console.log)
  .catch(console.error)