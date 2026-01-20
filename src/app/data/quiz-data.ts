import { QuizQuestion, ClasseInfo, TrilhaInfo, OrigemInfo } from '../models/quiz.models';

export const CLASSES_INFO: Record<string, ClasseInfo> = {
  combatente: {
    nome: 'Combatente',
    descricao: 'Treinado para lutar com todo tipo de armas, e com a força e a coragem para encarar os perigos de frente. É o tipo de agente que prefere abordagens mais diretas e costuma atirar primeiro e perguntar depois.',
    icone: '⚔️',
    cor: '#f44336',
    pvBase: '20 + Vigor',
    sanBase: '12',
    peBase: '2 + Presença'
  },
  especialista: {
    nome: 'Especialista',
    descricao: 'Um agente que confia mais em esperteza do que em força bruta. Um especialista se vale de conhecimento técnico, raciocínio rápido ou mesmo lábia para resolver mistérios e enfrentar o paranormal.',
    icone: '🔍',
    cor: '#2196f3',
    pvBase: '16 + Vigor',
    sanBase: '16',
    peBase: '3 + Presença'
  },
  ocultista: {
    nome: 'Ocultista',
    descricao: 'O Outro Lado é misterioso, perigoso e, de certa forma, cativante. Existem aqueles que visam compreender e dominar os mistérios paranormais para usá-los para combater o próprio Outro Lado.',
    icone: '🔮',
    cor: '#9c27b0',
    pvBase: '12 + Vigor',
    sanBase: '20',
    peBase: '4 + Presença'
  }
};

export const TRILHAS_INFO: Record<string, TrilhaInfo> = {
  // Combatente
  agenteSecreto: { nome: 'Agente Secreto', classe: 'combatente', descricao: 'Espionagem e infiltração com habilidades de combate' },
  aniquilador: { nome: 'Aniquilador', classe: 'combatente', descricao: 'Dano máximo e destruição total' },
  cacador: { nome: 'Caçador', classe: 'combatente', descricao: 'Especialista em rastrear e eliminar alvos' },
  comandanteDeCampo: { nome: 'Comandante de Campo', classe: 'combatente', descricao: 'Liderança tática e suporte ao grupo' },
  guerreiro: { nome: 'Guerreiro', classe: 'combatente', descricao: 'Combate corpo a corpo tradicional' },
  monstruoso: { nome: 'Monstruoso', classe: 'combatente', descricao: 'Transformação e poderes bestiais' },
  operacoesEspeciais: { nome: 'Operações Especiais', classe: 'combatente', descricao: 'Táticas militares e precisão' },
  tropaDeChoque: { nome: 'Tropa de Choque', classe: 'combatente', descricao: 'Tanque de linha de frente' },

  // Especialista
  atiradorDeElite: { nome: 'Atirador de Elite', classe: 'especialista', descricao: 'Precisão com armas de fogo à distância' },
  bibliotecario: { nome: 'Bibliotecário', classe: 'especialista', descricao: 'Conhecimento oculto e pesquisa' },
  infiltrador: { nome: 'Infiltrador', classe: 'especialista', descricao: 'Furtividade e espionagem' },
  medicoDeCampo: { nome: 'Médico de Campo', classe: 'especialista', descricao: 'Cura e suporte médico ao grupo' },
  muambeiro: { nome: 'Muambeiro', classe: 'especialista', descricao: 'Equipamentos, engenhocas e recursos' },
  negociador: { nome: 'Negociador', classe: 'especialista', descricao: 'Diplomacia, persuasão e manipulação social' },
  perseverante: { nome: 'Perseverante', classe: 'especialista', descricao: 'Resistência mental e determinação' },
  tecnico: { nome: 'Técnico', classe: 'especialista', descricao: 'Tecnologia, hackeamento e engenharia' },

  // Ocultista
  conduite: { nome: 'Conduíte', classe: 'ocultista', descricao: 'Canaliza energia paranormal diretamente' },
  exorcista: { nome: 'Exorcista', classe: 'ocultista', descricao: 'Especialista em banir entidades' },
  flagelador: { nome: 'Flagelador', classe: 'ocultista', descricao: 'Usa dor e sacrifício para poder' },
  graduado: { nome: 'Graduado', classe: 'ocultista', descricao: 'Estudioso formal do oculto' },
  intuitivo: { nome: 'Intuitivo', classe: 'ocultista', descricao: 'Poderes psíquicos e percepção sobrenatural' },
  laminaParanormal: { nome: 'Lâmina Paranormal', classe: 'ocultista', descricao: 'Combate corpo a corpo com poderes ocultos' },
  parapsicologo: { nome: 'Parapsicólogo', classe: 'ocultista', descricao: 'Investigação científica do paranormal' },
  possuido: { nome: 'Possuído', classe: 'ocultista', descricao: 'Compartilha corpo com entidade' }
};

export const ORIGENS_INFO: Record<string, OrigemInfo> = {
  academico: { nome: 'Acadêmico', descricao: 'Pesquisador, professor ou estudante dedicado', perfil: 'Intelectual, curioso' },
  agenteDeSaude: { nome: 'Agente de Saúde', descricao: 'Médico, enfermeiro ou paramédico', perfil: 'Cuidador, altruísta' },
  amnesico: { nome: 'Amnésico', descricao: 'Perdeu suas memórias do passado', perfil: 'Misterioso, adaptável' },
  artista: { nome: 'Artista', descricao: 'Músico, ator, pintor ou criador', perfil: 'Criativo, expressivo' },
  atleta: { nome: 'Atleta', descricao: 'Esportista profissional ou amador dedicado', perfil: 'Disciplinado, competitivo' },
  colegial: { nome: 'Colegial', descricao: 'Estudante do ensino médio', perfil: 'Jovem, adaptável' },
  criminoso: { nome: 'Criminoso', descricao: 'Ladrão, golpista ou ex-presidiário', perfil: 'Astuto, pragmático' },
  cultistaArrependido: { nome: 'Cultista Arrependido', descricao: 'Ex-membro de culto paranormal', perfil: 'Traumatizado, conhecedor' },
  desgarrado: { nome: 'Desgarrado', descricao: 'Sem lar, sem vínculos fixos', perfil: 'Sobrevivente, resiliente' },
  engenheiro: { nome: 'Engenheiro', descricao: 'Profissional técnico e construtor', perfil: 'Lógico, construtor' },
  executivo: { nome: 'Executivo', descricao: 'Empresário, gerente ou líder corporativo', perfil: 'Líder, ambicioso' },
  investigador: { nome: 'Investigador', descricao: 'Detetive particular ou jornalista', perfil: 'Curioso, persistente' },
  lutador: { nome: 'Lutador', descricao: 'Praticante de artes marciais', perfil: 'Disciplinado, forte' },
  militar: { nome: 'Militar', descricao: 'Soldado ou oficial das forças armadas', perfil: 'Disciplinado, leal' },
  operario: { nome: 'Operário', descricao: 'Trabalhador braçal', perfil: 'Resistente, prático' },
  policial: { nome: 'Policial', descricao: 'Agente da lei', perfil: 'Justo, protetor' },
  religioso: { nome: 'Religioso', descricao: 'Padre, pastor ou devoto', perfil: 'Devoto, esperançoso' },
  teoricoConspiracao: { nome: 'Teórico da Conspiração', descricao: 'Busca a verdade oculta', perfil: 'Paranoico, observador' },
  ti: { nome: 'T.I.', descricao: 'Programador ou hacker', perfil: 'Tecnológico, analítico' },
  trabalhadorRural: { nome: 'Trabalhador Rural', descricao: 'Fazendeiro ou agricultor', perfil: 'Prático, resistente' },
  trambiqueiro: { nome: 'Trambiqueiro', descricao: 'Vigarista ou charlatão', perfil: 'Manipulador, carismático' },
  universitario: { nome: 'Universitário', descricao: 'Estudante do ensino superior', perfil: 'Jovem, especializado' },
  vitima: { nome: 'Vítima', descricao: 'Sobrevivente de trauma paranormal', perfil: 'Determinado, marcado' }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Perguntas de Classe (1-6)
  {
    id: 1,
    question: 'Você está em uma missão e encontra uma criatura paranormal bloqueando o caminho. Qual é sua primeira reação?',
    category: 'classe',
    options: [
      { text: 'Pego minha arma e parto para o confronto direto', scores: { combatente: 3, guerreiro: 2, tropaDeChoque: 1 } },
      { text: 'Analiso a situação e procuro um ponto fraco ou rota alternativa', scores: { especialista: 3, infiltrador: 2, investigador: 1 } },
      { text: 'Tento usar um ritual ou poder paranormal para lidar com ela', scores: { ocultista: 3, conduite: 2, exorcista: 1 } }
    ]
  },
  {
    id: 2,
    question: 'O que você considera mais valioso em uma equipe?',
    category: 'classe',
    options: [
      { text: 'Força e capacidade de proteger os companheiros', scores: { combatente: 3, tropaDeChoque: 2, comandanteDeCampo: 1 } },
      { text: 'Conhecimento técnico e habilidades especializadas', scores: { especialista: 3, tecnico: 2, bibliotecario: 1 } },
      { text: 'Conexão com forças além da compreensão comum', scores: { ocultista: 3, intuitivo: 2, graduado: 1 } }
    ]
  },
  {
    id: 3,
    question: 'Como você lida com o medo do desconhecido?',
    category: 'classe',
    options: [
      { text: 'Enfrento de frente - o medo não me paralisa', scores: { combatente: 3, aniquilador: 2, atleta: 1, lutador: 1 } },
      { text: 'Busco informações para entender e neutralizar a ameaça', scores: { especialista: 3, bibliotecario: 2, academico: 1, investigador: 1 } },
      { text: 'Aceito que existem forças maiores e aprendo a usá-las', scores: { ocultista: 3, possuido: 2, cultistaArrependido: 1 } }
    ]
  },
  {
    id: 4,
    question: 'Qual destes recursos você gostaria de ter acesso ilimitado?',
    category: 'classe',
    options: [
      { text: 'Arsenal completo de armas e equipamentos táticos', scores: { combatente: 3, operacoesEspeciais: 2, militar: 1 } },
      { text: 'Biblioteca infinita com conhecimento de todas as áreas', scores: { especialista: 3, bibliotecario: 3, academico: 2 } },
      { text: 'Grimório com todos os rituais paranormais conhecidos', scores: { ocultista: 3, graduado: 2, parapsicologo: 1 } }
    ]
  },
  {
    id: 5,
    question: 'Um aliado está em perigo mortal. O que você faz?',
    category: 'classe',
    options: [
      { text: 'Me coloco na linha de fogo para protegê-lo', scores: { combatente: 3, tropaDeChoque: 3, policial: 1 } },
      { text: 'Uso minhas habilidades para criar uma distração ou plano de fuga', scores: { especialista: 3, infiltrador: 2, negociador: 1 } },
      { text: 'Canalizo meus poderes paranormais para ajudá-lo', scores: { ocultista: 3, conduite: 2, exorcista: 1 } }
    ]
  },
  {
    id: 6,
    question: 'Se pudesse escolher uma habilidade sobrenatural, qual seria?',
    category: 'classe',
    options: [
      { text: 'Força e resistência sobre-humanas', scores: { combatente: 3, monstruoso: 3, atleta: 1 } },
      { text: 'Inteligência amplificada ou perícia instantânea', scores: { especialista: 3, tecnico: 2, ti: 1 } },
      { text: 'Controle sobre elementos ou energia paranormal', scores: { ocultista: 3, conduite: 3, flagelador: 1 } }
    ]
  },

  // Perguntas de Trilha (7-12)
  {
    id: 7,
    question: 'Em combate, qual é seu estilo preferido?',
    category: 'trilha',
    options: [
      { text: 'Corpo a corpo, sentindo cada golpe', scores: { guerreiro: 3, laminaParanormal: 2, lutador: 2, combatente: 1 } },
      { text: 'À distância, com precisão cirúrgica', scores: { atiradorDeElite: 3, cacador: 2, operacoesEspeciais: 1, especialista: 1 } },
      { text: 'Suporte, ajudando os outros a lutar melhor', scores: { medicoDeCampo: 3, comandanteDeCampo: 2, agenteDeSaude: 1 } },
      { text: 'Usando poderes e habilidades especiais', scores: { conduite: 3, flagelador: 2, ocultista: 2 } }
    ]
  },
  {
    id: 8,
    question: 'Qual ambiente você domina melhor?',
    category: 'trilha',
    options: [
      { text: 'Campo de batalha aberto', scores: { tropaDeChoque: 3, operacoesEspeciais: 2, combatente: 1, militar: 1 } },
      { text: 'Infiltração em locais restritos', scores: { infiltrador: 3, agenteSecreto: 2, criminoso: 1 } },
      { text: 'Ambientes sociais e negociações', scores: { negociador: 3, trambiqueiro: 2, executivo: 1 } },
      { text: 'Locais com forte presença paranormal', scores: { exorcista: 3, parapsicologo: 2, conduite: 1, ocultista: 1 } }
    ]
  },
  {
    id: 9,
    question: 'Como você prefere obter vantagem sobre o inimigo?',
    category: 'trilha',
    options: [
      { text: 'Força bruta e intimidação', scores: { aniquilador: 3, tropaDeChoque: 2, combatente: 1 } },
      { text: 'Táticas e planejamento estratégico', scores: { comandanteDeCampo: 3, operacoesEspeciais: 2, especialista: 1 } },
      { text: 'Equipamentos e tecnologia avançada', scores: { tecnico: 3, muambeiro: 2, engenheiro: 1, ti: 1 } },
      { text: 'Conhecimento oculto e rituais', scores: { graduado: 3, bibliotecario: 2, ocultista: 1, academico: 1 } }
    ]
  },
  {
    id: 10,
    question: 'O que você faria se descobrisse que possui uma conexão com uma entidade?',
    category: 'trilha',
    options: [
      { text: 'Tentaria controlá-la e usar seu poder', scores: { possuido: 3, monstruoso: 2, ocultista: 2 } },
      { text: 'Estudaria para entender a natureza dessa conexão', scores: { parapsicologo: 3, graduado: 2, academico: 1 } },
      { text: 'Buscaria me livrar dela a qualquer custo', scores: { exorcista: 2, perseverante: 3, religioso: 1 } },
      { text: 'Usaria como ferramenta quando necessário', scores: { intuitivo: 3, conduite: 2 } }
    ]
  },
  {
    id: 11,
    question: 'Qual sua maior força em uma equipe?',
    category: 'trilha',
    options: [
      { text: 'Sou o escudo que protege todos', scores: { tropaDeChoque: 3, combatente: 2, policial: 1 } },
      { text: 'Encontro informações que ninguém mais consegue', scores: { bibliotecario: 3, investigador: 2, teoricoConspiracao: 1 } },
      { text: 'Mantenho todos vivos e funcionando', scores: { medicoDeCampo: 3, agenteDeSaude: 2, perseverante: 1 } },
      { text: 'Lido com ameaças que outros não conseguem', scores: { exorcista: 3, conduite: 2, ocultista: 1 } }
    ]
  },
  {
    id: 12,
    question: 'Como você reage quando está encurralado?',
    category: 'trilha',
    options: [
      { text: 'Luto até o fim com tudo que tenho', scores: { guerreiro: 3, aniquilador: 2, combatente: 1, lutador: 1 } },
      { text: 'Encontro uma saída que ninguém percebeu', scores: { infiltrador: 3, agenteSecreto: 2, especialista: 1 } },
      { text: 'Negocio uma solução', scores: { negociador: 3, trambiqueiro: 2, executivo: 1 } },
      { text: 'Uso poderes que guardo para emergências', scores: { flagelador: 3, possuido: 2, ocultista: 1 } }
    ]
  },

  // Perguntas de Origem (13-18)
  {
    id: 13,
    question: 'Qual era sua vida antes de descobrir o paranormal?',
    category: 'origem',
    options: [
      { text: 'Estudava ou pesquisava em alguma instituição', scores: { academico: 2, universitario: 2, colegial: 1 } },
      { text: 'Trabalhava com segurança ou forças armadas', scores: { militar: 2, policial: 2, lutador: 1 } },
      { text: 'Vivia nas sombras, fazendo o que era necessário', scores: { criminoso: 2, desgarrado: 1, trambiqueiro: 1 } },
      { text: 'Já tinha contato com o sobrenatural de alguma forma', scores: { cultistaArrependido: 2, vitima: 2, religioso: 1 } }
    ]
  },
  {
    id: 14,
    question: 'O que te motivou a entrar para a Ordem?',
    category: 'origem',
    options: [
      { text: 'Perdi alguém para o paranormal e quero vingança', scores: { vitima: 3, perseverante: 1, policial: 1 } },
      { text: 'Curiosidade científica sobre o Outro Lado', scores: { academico: 2, investigador: 2, parapsicologo: 1 } },
      { text: 'Quero proteger pessoas inocentes', scores: { policial: 2, agenteDeSaude: 1, religioso: 1 } },
      { text: 'Busco poder e conhecimento proibido', scores: { cultistaArrependido: 1, ocultista: 2, graduado: 1 } }
    ]
  },
  {
    id: 15,
    question: 'Qual habilidade você desenvolveu ao longo da vida?',
    category: 'origem',
    options: [
      { text: 'Sou bom com tecnologia e computadores', scores: { ti: 3, tecnico: 2, engenheiro: 1 } },
      { text: 'Sei me expressar e convencer pessoas', scores: { artista: 2, negociador: 1, executivo: 1, trambiqueiro: 1 } },
      { text: 'Tenho força física e resistência acima da média', scores: { atleta: 2, operario: 1, trabalhadorRural: 1, lutador: 1 } },
      { text: 'Tenho conhecimento médico ou científico', scores: { agenteDeSaude: 2, academico: 1, medicoDeCampo: 1 } }
    ]
  },
  {
    id: 16,
    question: 'Como as pessoas te descreveriam?',
    category: 'origem',
    options: [
      { text: 'Intelectual e sempre estudando algo', scores: { academico: 2, bibliotecario: 1, graduado: 1, universitario: 1 } },
      { text: 'Carismático e bom de conversa', scores: { artista: 1, negociador: 2, trambiqueiro: 1, executivo: 1 } },
      { text: 'Forte e intimidador', scores: { atleta: 1, militar: 1, lutador: 2, combatente: 1 } },
      { text: 'Misterioso e reservado', scores: { amnesico: 2, desgarrado: 1, infiltrador: 1, criminoso: 1 } }
    ]
  },
  {
    id: 17,
    question: 'O que você faz quando não está em missão?',
    category: 'origem',
    options: [
      { text: 'Leio, pesquiso e estudo', scores: { academico: 2, bibliotecario: 2, universitario: 1 } },
      { text: 'Treino e mantenho a forma física', scores: { atleta: 2, lutador: 2, militar: 1 } },
      { text: 'Socializo e faço contatos', scores: { artista: 1, executivo: 2, negociador: 1 } },
      { text: 'Fico na minha, processando o que vi', scores: { vitima: 2, desgarrado: 1, perseverante: 1, amnesico: 1 } }
    ]
  },
  {
    id: 18,
    question: 'Qual é seu maior arrependimento?',
    category: 'origem',
    options: [
      { text: 'Não ter conseguido salvar alguém importante', scores: { vitima: 2, agenteDeSaude: 1, policial: 1, medicoDeCampo: 1 } },
      { text: 'Ter me envolvido com coisas que não deveria', scores: { cultistaArrependido: 3, criminoso: 1 } },
      { text: 'Não ter aproveitado oportunidades quando tive chance', scores: { desgarrado: 1, universitario: 1, colegial: 1 } },
      { text: 'Não lembro... ou prefiro não lembrar', scores: { amnesico: 3, vitima: 1 } }
    ]
  }
];
