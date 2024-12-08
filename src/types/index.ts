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
  genre_ids: number[];
  original_title: string;
};

export type MovieResponse = {
  results: MovieType[];
  total_pages: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};
