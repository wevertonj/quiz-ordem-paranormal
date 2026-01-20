import { Injectable, signal, computed } from '@angular/core';
import { QuizQuestion, QuizOption, QuizResult } from '../models/quiz.models';
import { QUIZ_QUESTIONS, CLASSES_INFO, TRILHAS_INFO, ORIGENS_INFO } from '../data/quiz-data';

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

  getQuestions(): QuizQuestion[] {
    return this.questions;
  }

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

  nextStep(): void {
    if (this.currentStep() < this.totalSteps() - 1) {
      this.currentStep.update(s => s + 1);
    }
  }

  previousStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
    }
  }

  goToStep(step: number): void {
    if (step >= 0 && step < this.totalSteps()) {
      this.currentStep.set(step);
    }
  }

  reset(): void {
    this.currentStep.set(0);
    this.answers.set(new Map());
    this.isCompleted.set(false);
  }

  calculateResults(): QuizResult {
    const scores: Record<string, number> = {};

    // Somar pontuações
    this.answers().forEach((option) => {
      Object.entries(option.scores).forEach(([key, value]) => {
        scores[key] = (scores[key] || 0) + (value || 0);
      });
    });

    // Calcular classe
    const classeScores = {
      combatente: scores['combatente'] || 0,
      especialista: scores['especialista'] || 0,
      ocultista: scores['ocultista'] || 0
    };

    const totalClassePoints = classeScores.combatente + classeScores.especialista + classeScores.ocultista;
    const distribuicaoClasses = {
      combatente: totalClassePoints > 0 ? Math.round((classeScores.combatente / totalClassePoints) * 100) : 33,
      especialista: totalClassePoints > 0 ? Math.round((classeScores.especialista / totalClassePoints) * 100) : 33,
      ocultista: totalClassePoints > 0 ? Math.round((classeScores.ocultista / totalClassePoints) * 100) : 34
    };

    const topClasse = Object.entries(classeScores)
      .sort(([, a], [, b]) => b - a)[0];

    const classeInfo = CLASSES_INFO[topClasse[0]];

    // Calcular trilhas (filtrar apenas trilhas da classe escolhida ou relevantes)
    const trilhaKeys = Object.keys(TRILHAS_INFO);
    const trilhaScores = trilhaKeys
      .map(key => ({
        key,
        nome: TRILHAS_INFO[key].nome,
        pontuacao: scores[key] || 0,
        classe: TRILHAS_INFO[key].classe
      }))
      .filter(t => t.classe === topClasse[0])
      .sort((a, b) => b.pontuacao - a.pontuacao);

    const topTrilha = trilhaScores[0] || { key: '', nome: 'Não definida', pontuacao: 0 };
    const topTrilhas = trilhaScores.slice(0, 5).map(t => ({
      nome: t.nome,
      pontuacao: t.pontuacao
    }));

    // Calcular origens
    const origemKeys = Object.keys(ORIGENS_INFO);
    const origemScores = origemKeys
      .map(key => ({
        key,
        nome: ORIGENS_INFO[key].nome,
        pontuacao: scores[key] || 0
      }))
      .sort((a, b) => b.pontuacao - a.pontuacao);

    const topOrigem = origemScores[0] || { key: '', nome: 'Não definida', pontuacao: 0 };
    const topOrigens = origemScores.slice(0, 5).map(o => ({
      nome: o.nome,
      pontuacao: o.pontuacao
    }));

    return {
      classe: {
        nome: classeInfo?.nome || topClasse[0],
        pontuacao: topClasse[1],
        descricao: classeInfo?.descricao || '',
        icone: classeInfo?.icone || '❓'
      },
      trilha: {
        nome: topTrilha.nome,
        pontuacao: topTrilha.pontuacao,
        descricao: TRILHAS_INFO[topTrilha.key]?.descricao || ''
      },
      origem: {
        nome: topOrigem.nome,
        pontuacao: topOrigem.pontuacao,
        descricao: ORIGENS_INFO[topOrigem.key]?.descricao || ''
      },
      distribuicaoClasses,
      topTrilhas,
      topOrigens
    };
  }

  getCurrentAnswer(): QuizOption | undefined {
    return this.answers().get(this.currentStep());
  }
}
