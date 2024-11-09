export type User = {
  user_id: string;
  created_at: Date;
  name: string;
  sex: string;
  age: string;
  place: string;
  top_tech: string;
  top_teches: string[];
  teches: string[];
  hobby?: string;
  occupation: string;
  affiliation?: string;
  qualification: string[];
  editor?: string;
  github?: string;
  twitter?: string;
  qiita?: string;
  zenn?: string;
  atcoder?: string;
  message?: string;
  updated_at?: Date;
  portfolio?: string;
  graduate?: string;
  desired_occupation?: string;
  faculty?: string;
  experience: string[];
  image_url?: string;
  qiita_access_token?: string;
  github_access_token?: string;
  github_username?: string;
  rank?: string;
  level?: string;
  next_level_points?: string;
  life?: string;
  coin?: string;
  items: string[];
  position_x?: string;
  position_y?: string;
  last_login_date?: Date;
  login_streak?: string;
  monthly_login_count?: string;
  total_login_count?: string;
  current_avatar?: string;
  online: boolean;
  motivation?: string;
  start_work_time?: Date;
};

export type TopUserResponse = {
  user_id: string;
  name: string;
  top_teches: string[];
  image_url: string;
};

export type UserRandomResponse = {
  user_id: string;
  name: string;
  sex: string;
  age: string;
  place: string;
  occupation: string;
  top_teches: string[];
  image_url: string;
};

export type MessageUserResponse = {
  user_id: string;
  name: string;
  sex: string;
  age: string;
  top_teches: string[];
  image_url: string;
};

export type RequestUserID = {
  uuid: string;
};
