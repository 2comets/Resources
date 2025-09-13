export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'pdf';
  thumbnail: string;
  duration: string;
  rating: number;
  category: string;
  languages: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
}