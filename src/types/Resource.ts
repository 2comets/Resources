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
  embedUrl?: string; // For embedded video display
  youtubeUrl?: string; // For YouTube redirect
  audioUrl?: string; // For embedded audio playback
  audioExternalUrl?: string; // For external audio redirect
  pdfUrl?: string; // For PDF preview
  pdfDownloadUrl?: string; // For PDF download
}