export interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tech: string[];
}

export interface ArtPiece {
  id: string;
  title: string;
  src: string;
  caption: string;
  aspect: "portrait" | "landscape" | "square";
}
