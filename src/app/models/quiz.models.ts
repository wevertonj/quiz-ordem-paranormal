export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  category: 'classe' | 'trilha' | 'origem' | 'personalidade';
}

export interface QuizOption {
  text: string;
  scores: {
    combatente?: number;
    especialista?: number;
    ocultista?: number;
    // Trilhas Combatente
    agenteSecreto?: number;
    aniquilador?: number;
    cacador?: number;
    comandanteDeCampo?: number;
    guerreiro?: number;
    monstruoso?: number;
    operacoesEspeciais?: number;
    tropaDeChoque?: number;
    // Trilhas Especialista
    atiradorDeElite?: number;
    bibliotecario?: number;
    infiltrador?: number;
    medicoDeCampo?: number;
    muambeiro?: number;
    negociador?: number;
    perseverante?: number;
    tecnico?: number;
    // Trilhas Ocultista
    conduite?: number;
    exorcista?: number;
    flagelador?: number;
    graduado?: number;
    intuitivo?: number;
    laminaParanormal?: number;
    parapsicologo?: number;
    possuido?: number;
    // Origens
    academico?: number;
    agenteDeSaude?: number;
    amnesico?: number;
    artista?: number;
    atleta?: number;
    colegial?: number;
    criminoso?: number;
    cultistaArrependido?: number;
    desgarrado?: number;
    engenheiro?: number;
    executivo?: number;
    investigador?: number;
    lutador?: number;
    militar?: number;
    operario?: number;
    policial?: number;
    religioso?: number;
    teoricoConspiracao?: number;
    ti?: number;
    trabalhadorRural?: number;
    trambiqueiro?: number;
    universitario?: number;
    vitima?: number;
  };
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
  distribuicaoClasses: {
    combatente: number;
    especialista: number;
    ocultista: number;
  };
  topTrilhas: Array<{ nome: string; pontuacao: number; }>;
  topOrigens: Array<{ nome: string; pontuacao: number; }>;
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
