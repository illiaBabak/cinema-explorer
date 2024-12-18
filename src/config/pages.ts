class PageConfig {
  start = '/';
  login = '/login';
  home = '/home';
  redirect = '/redirect';
  myMovies = {
    favourite: '/my-movies/favourite',
    watchlist: '/my-movies/watchlist',
  };
  movie = '/movie';
  person = '/person';
}

export const pageConfig = new PageConfig();
