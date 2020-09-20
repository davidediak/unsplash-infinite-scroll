export interface UnsplashImage {
  alt_description: string;
  created_at: string;
  description: string;
  id: string;
  liked_by_user: boolean;
  likes: number;
  updated_at: string;
  urls: {
    full: string;
    thumb: string;
  };
  user: {
    name: string;
  };
}
