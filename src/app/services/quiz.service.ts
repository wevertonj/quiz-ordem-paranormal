import { Injectable, signal, computed } from '@angular/core';
import { QuizQuestion, QuizOption, QuizResult } from '../models/quiz.models';
import { QUIZ_QUESTIONS, CLASSES_INFO, TRILHAS_INFO, ORIGENS_INFO } from '../data/quiz-data';
import { VISUAL_TAGS } from '../data/visual-tags';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly questions = QUIZ_QUESTIONS;

  currentStep = signal(0);
  answers = signal<Map<number, QuizOption>>(new Map());
  isCompleted = signal(false);

  totalSteps = computed(() => this.questions.length);
  currentQuestion = computed(() => this.questions[this.currentStep()]);
  progress = computed(() => ((this.currentStep() + 1) / this.totalSteps()) * 100);
  canGoBack = computed(() => this.currentStep() > 0);
  canGoForward = computed(() => this.answers().has(this.currentStep()));

  getQuestions(): QuizQuestion[] { return this.questions; }

  answerQuestion(option: QuizOption): void {
    const currentAnswers = new Map(this.answers());
    currentAnswers.set(this.currentStep(), option);
    this.answers.set(currentAnswers);

    if (this.currentStep() < this.totalSteps() - 1) {
      setTimeout(() => this.nextStep(), 300);
    } else {
      setTimeout(() => this.isCompleted.set(true), 300);
    }
  }

  nextStep(): void { if (this.currentStep() < this.totalSteps() - 1) this.currentStep.update(s => s + 1); }
  previousStep(): void { if (this.currentStep() > 0) this.currentStep.update(s => s - 1); }
  reset(): void { this.currentStep.set(0); this.answers.set(new Map()); this.isCompleted.set(false); }

  calculateResults(): QuizResult {
    const scores: Record<string, number> = {};

    // 1. Somar pontuações
    this.answers().forEach((option: QuizOption) => {
      if (option.scores) {
        Object.entries(option.scores).forEach(([key, value]) => {
          const numericValue = typeof value === 'number' ? value : 0;
          scores[key] = (scores[key] || 0) + numericValue;
        });
      }
    });

    // 2. Lógica de Classe
    const classeScores = {
      combatente: scores['combatente'] || 0,
      especialista: scores['especialista'] || 0,
      ocultista: scores['ocultista'] || 0
    };
    const totalClassePoints = Object.values(classeScores).reduce((a, b) => a + b, 0);
    const distribuicaoClasses = {
      combatente: totalClassePoints > 0 ? Math.round((classeScores.combatente / totalClassePoints) * 100) : 33,
      especialista: totalClassePoints > 0 ? Math.round((classeScores.especialista / totalClassePoints) * 100) : 33,
      ocultista: totalClassePoints > 0 ? Math.round((classeScores.ocultista / totalClassePoints) * 100) : 34
    };
    const topClasse = Object.entries(classeScores).sort(([, a], [, b]) => b - a)[0];
    const classeInfo = CLASSES_INFO[topClasse[0]];

    // 3. Trilhas e 4. Origens
    const trilhaScores = Object.keys(TRILHAS_INFO)
      .map(key => ({ key, nome: TRILHAS_INFO[key].nome, pontuacao: scores[key] || 0, classe: TRILHAS_INFO[key].classe }))
      .filter(t => t.classe === topClasse[0])
      .sort((a, b) => b.pontuacao - a.pontuacao);
    const topTrilha = trilhaScores[0] || { key: '', nome: 'Não definida', pontuacao: 0 };

    const origemScores = Object.keys(ORIGENS_INFO)
      .map(key => ({ key, nome: ORIGENS_INFO[key].nome, pontuacao: scores[key] || 0 }))
      .sort((a, b) => b.pontuacao - a.pontuacao);
    const topOrigem = origemScores[0] || { key: '', nome: 'Não definida', pontuacao: 0 };

    // 5. Lógica de Tags
    const allSelectedTags: string[] = [];
    this.answers().forEach(opt => { if (opt.tags) allSelectedTags.push(...opt.tags); });

    // Função única para buscar no visual-tags ou retornar valor padrão
    const getVal = (prefix: string, defaultVal: string) => {
      const found = allSelectedTags
        .filter(t => t.startsWith(prefix))
        .map(t => VISUAL_TAGS[t] || t);
      return found.length > 0 ? found.join(', ') : defaultVal;
    };

    // 6. Construção do Prompt Único e Organizado
    const promptGemini = `
Crie uma ilustração de personagem de RPG com estilo semi-realista, proporções reais, sombreamento suave, paleta desaturada e acabamento de concept art.

Características do personagem:
- Raça: ${getVal('raca_', 'Humana')}
- Classe: ${classeInfo?.nome || topClasse[0]} (${topTrilha.nome})
- Origem: ${topOrigem.nome}
- Idade aparente: ${getVal('id_', 'cerca de 27 anos')}
- Gênero/aparência: ${getVal('gen_', 'Feminino, expressão séria')}
- Físico: ${getVal('fis_', 'Atlético e funcional')}
- Personalidade visual: ${getVal('per_', 'Resiliente e alerta')}
- Vestimentas: ${getVal('vest_', 'Roupas funcionais')}
- Equipamentos/armas: ${getVal('eq_', 'Equipamentos de sobrevivência e investigação')}
- Marcas visuais: ${getVal('mar_', 'Marcas de combate e cicatrizes')}
- Estado do personagem: ${getVal('est_', 'Cansado, porém atento')}

Estilo final: ilustração de personagem de RPG, dark/low fantasy, concept art detalhado, pintura digital, alta qualidade, fundo neutro escuro.
`.trim();

    return {
      classe: { nome: classeInfo?.nome || topClasse[0], pontuacao: topClasse[1], descricao: classeInfo?.descricao || '', icone: classeInfo?.icone || '❓' },
      trilha: { nome: topTrilha.nome, pontuacao: topTrilha.pontuacao, descricao: TRILHAS_INFO[topTrilha.key]?.descricao || '' },
      origem: { nome: topOrigem.nome, pontuacao: topOrigem.pontuacao, descricao: ORIGENS_INFO[topOrigem.key]?.descricao || '' },
      visual: {
        tags: allSelectedTags,
        descricao: getVal('per_', 'Visual paranormal'), // Usa personalidade como descrição curta
        promptGemini,
        topTags: []
      },
      distribuicaoClasses,
      topTrilhas: trilhaScores.slice(0, 5).map(t => ({ nome: t.nome, pontuacao: t.pontuacao })),
      topOrigens: origemScores.slice(0, 5).map(o => ({ nome: o.nome, pontuacao: o.pontuacao }))
    };
  }

  getCurrentAnswer(): QuizOption | undefined { return this.answers().get(this.currentStep()); }
}
