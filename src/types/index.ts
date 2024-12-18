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

export type MovieType = {
  id: number;
  poster_path: string | null;
  original_title: string;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
};

export type MovieIncomplete = MovieType & {
  genre_ids: number[];
};

export type MovieDetails = MovieType & {
  runtime: number;
  status: string;
  genres: {
    id: number;
    name: string;
  }[];
};

export type MovieResponse = {
  results: MovieIncomplete[];
  total_pages: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};

export type CastEl = {
  name: string;
  profile_path: string | null;
  character: string;
  id: number;
};

export type Credits = {
  cast: CastEl[];
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
