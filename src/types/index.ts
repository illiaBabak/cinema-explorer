export type TokenResponse = {
  request_token: string;
};

export type ValidateErrorResponse = TokenResponse & { status_message?: string };

export type SessionResponse = {
  session_id: string;
};

export type User = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };

  id: number;
  username: string;
};

export type MovieBaseType = {
  id: number;
  poster_path: string | null;
  original_title: string;
  title: string;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
};

export type MovieWithGenres = MovieBaseType & {
  genre_ids: number[];
};

export type MovieDetails = MovieBaseType & {
  runtime: number;
  status: string;
  genres: {
    id: number;
    name: string;
  }[];
};

export type MovieResponse = {
  results: MovieWithGenres[];
  total_pages: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};

export type CastMember = {
  name: string;
  profile_path: string | null;
  character: string;
  id: number;
};

export type MovieCredits = {
  cast: CastMember[];
};

export type Person = {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  name: string;
  place_of_birth: string | null;
  profile_path: string;
  known_for_department: string;
};

export type MoviePageData = {
  movies: MovieWithGenres[];
  page: number;
  maxPages: number;
};

export type AlertProps = {
  text: string;
  type: 'success' | 'error';
  position: 'top' | 'bottom';
  onClose: () => void;
  onMouseLeave: () => void;
  onMouseEnter: () => void;
};
