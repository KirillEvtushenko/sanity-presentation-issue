This repo was created specifically for Sanity dev team to show the performance issue with the Presentation feature.

The code is simplified in every possible way, but generally it follows the logic we use in actual application.

Please create `.env` files in root folder and `./studio/` folder using `.env.example` files.

Inside of `./studio/migrations/` there are `create-data.js` and `delete-data.js`. Please use `create-data.js` to create the whole structure for two fake buildings (Building -> Floors -> Spaces).

After installing dependencies, both Next.js app and Sanity studio (and also Presentation feature) should work fine.

Note: we understand that the "issue" building is way too big so even Next.js warns about the page size. But in real app, after fetching the data from Sanity we do a lot of extra async work (parsing/filtering etc) so in the end, props fit in 128 kB recommended threshold.

So open question is: How can we follow the same pattern with `useQuery`? We need all of this initial data to be fetched to perform our parsing/filtering afterwards.
