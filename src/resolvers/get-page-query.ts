import groq from 'groq';

export const getPageQuery = (path: string) => {
  return {
    query: groq`
      *[_type == "Building" && buildingId == $path][0]{
        ...,
        features[]->,
        floors[]->{
          ...,
          spaces[]->{
            _id,
            _type,
            title,
            capacity,
            isActive,
            isReservable,
            name,
            systemId,
            sourceSystemRecordCode,
            audioDevice,
            displayDevice,
            videoDevice,
            description,
            images,
            spaceCode,
            spaceType[]->{
              ...,
            }
          }
        }
      }
    `,
    params: { path },
  };
};
