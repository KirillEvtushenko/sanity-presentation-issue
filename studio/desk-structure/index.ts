import { StructureBuilder } from 'sanity/desk';

const buildingsData = (S: StructureBuilder) => {
  return S.listItem()
    .title(`Building's Data`)
    .child(
      S.list()
        .title(`Building's documents`)
        .items(
          S.documentTypeListItems()
        ),
    );
};

export const structure = (S: StructureBuilder) => {
  return S.list()
    .title('Content')
    .items([
      buildingsData(S),
    ]);
};