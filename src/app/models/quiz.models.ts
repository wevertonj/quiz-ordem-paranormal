export interface QuizOption {
  text: string;
  scores: {
    combatente?: number;
    especialista?: number;
    ocultista?: number;
    [key: string]: number | undefined; 
  };
  tags?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  category: 'classe' | 'trilha' | 'origem' | 'personalidade';
}

export interface QuizResult {
  classe: {
    nome: string;
    pontuacao: number;
    descricao: string;
    icone: string;
  };
  trilha: {
    nome: string;
    pontuacao: number;
    descricao: string;
  };
  origem: {
    nome: string;
    pontuacao: number;
    descricao: string;
  };
  visual: {
    tags: string[];
    descricao: string;
    promptGemini: string;
    topTags: Array<{ tag: string; texto: string; ocorrencias: number }>;
  };
  distribuicaoClasses: {
    combatente: number;
    especialista: number;
    ocultista: number;
  };
  topTrilhas: Array<{ nome: string; pontuacao: number }>;
  topOrigens: Array<{ nome: string; pontuacao: number }>;
}

export interface ClasseInfo {
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  pvBase: string;
  sanBase: string;
  peBase: string;
}

export interface TrilhaInfo {
  nome: string;
  classe: string;
  descricao: string;
}

export interface OrigemInfo {
  nome: string;
  descricao: string;
  perfil: string;
}

export interface VisualOption {
  id: string;
  label: string;
  category: 'corpo' | 'pele' | 'acessorios' | 'marcas';
  tag: string;
  icon?: string; 
}