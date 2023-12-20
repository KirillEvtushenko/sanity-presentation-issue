import { runMigration } from './utils/runMigration';
import {uuid} from '@sanity/uuid'

const twoBuildings = [
  {
    name: 'NO-ISSUE-BUILDING',
    numberOfFloors: 1,
    numberOfSpacesPerFloor: 2,
  },
  {
    name: 'ISSUE-BUILDING',
    numberOfFloors: 18,
    numberOfSpacesPerFloor: 30,
  },
];

const createData = () => {
  const documents = [];

  const spaceTypeDocument = {
    _id: uuid(),
    _type: 'SpaceType',
    title: 'Conference Room',
    name: 'Conference Room',
    value: 'Space',
    systemId: uuid(),
  };

  documents.push(spaceTypeDocument)

  for (const building of twoBuildings) {
    let buildingDocument = {
      _id: building.name,
      _type: 'Building',
      title: `${building.name} title`,
      name: building.name,
      address: `${building.name} address`,
      city: `${building.name} city`,
      zip: `${building.name} postal code`,
      buildingDescription: `${building.name} description`,
      status: '1a',
      buildingId: building.name,
      timezone: 'America/New_York',
      floors: [],
      promotedBuilding: false
    }

    for (let floorIndex = 1; floorIndex <= building.numberOfFloors; floorIndex++) {
      let floorDocument = {
        _id: uuid(),
        _type: 'Floor',
        title: `${building.name} | Floor №${floorIndex} Title`,
        name: `${building.name} | Floor №${floorIndex} Name`,
        label: `${building.name} | Floor №${floorIndex} Label`,
        spaces: []
      }
      buildingDocument.floors.push({
        _key: uuid(),
        _ref: floorDocument._id,
        _type: "reference"
      })

      for (let index = 1; index <= building.numberOfSpacesPerFloor; index++) {
        let spaceDocument = {
          _id: uuid(),
          _type: 'Space',
          title: `${building.name} | Space №${index}-${floorIndex} Title`,
          name: `${building.name} | Space №${index}-${floorIndex} Name`,
          spaceCode: uuid(),
          description: `${building.name} | Space №${index}-${floorIndex} description`,
          contactNumber: `any value`,
          capacity: index,
          isReservable: true,
          spaceType: [{
            _key: uuid(),
            _ref: spaceTypeDocument._id,
            _type: "reference"
          }],
          isActive: true,
          videoDevice: 'video device',
          displayDevice: 'display device',
          audioDevice: 'audio device',
          exchangeTags: ['tag1', 'tag2'],
          rating: index,
        }

        floorDocument.spaces.push({
          _key: uuid(),
          _ref: spaceDocument._id,
          _type: "reference"
        })

        documents.push(spaceDocument)
      }

      documents.push(floorDocument)
    }

    documents.push(buildingDocument)
  }

  return documents
}

const mutationsBuilder = () => {
  const docs = createData();
  return docs.map(doc => ({
    id: doc._id,
    create: doc,
  }))
};

const run = async () => {
  console.log('Starting a migration...');
  await runMigration({ mutationsBuilder });
  console.log('Done migrating');
};

run();