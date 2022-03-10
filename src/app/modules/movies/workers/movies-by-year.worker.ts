/// <reference lib="webworker" />

import { groupByYear } from '../helpers/group-movies-by-year';

addEventListener('message', ({ data }) => {
  const moviesGroupedByYear = groupByYear(data.movies);
  postMessage(moviesGroupedByYear);
});
