class PageConfig {
  start = '/';
  login = '/login';
  home = '/home';
  redirect = '/redirect';
  myMovies = {
    favourite: '/my-movies/favourite',
    watchlist: '/my-movies/watchlist',
  };
}

export const pageConfig = new PageConfig();
