/// <reference lib="webworker" />

import { groupByYear } from '../helpers/group-movies-by-year';

addEventListener('message', ({ data }) => {
  const moviesGroupByYear = groupByYear(data.movies);
  postMessage(moviesGroupByYear);
});
