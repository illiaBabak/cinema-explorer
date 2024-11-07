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

  username: string;
};
