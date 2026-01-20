import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { QuizStepComponent } from './components/quiz-step/quiz-step.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizService } from './services/quiz.service';
import { QuizOption, QuizResult } from './models/quiz.models';

type AppState = 'home' | 'quiz' | 'result';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeComponent,
    QuizStepComponent,
    QuizResultComponent
  ],
  template: `
    <app-header />
    
    <main class="main-content">
      @switch (appState()) {
        @case ('home') {
          <app-home (startQuiz)="startQuiz()" />
        }
        @case ('quiz') {
          <app-quiz-step
            [question]="quizService.currentQuestion()!"
            [currentStep]="quizService.currentStep()"
            [totalSteps]="quizService.totalSteps()"
            [selectedAnswer]="quizService.getCurrentAnswer()"
            [canGoBack]="quizService.canGoBack()"
            [isEntering]="isEntering()"
            (selectAnswer)="onAnswer($event)"
            (goBack)="onGoBack()"
            (finish)="showResults()"
          />
        }
        @case ('result') {
          <app-quiz-result
            [result]="quizResult()!"
            (restart)="restartQuiz()"
          />
        }
      }
    </main>
  `,
  styles: [`
    .main-content {
      padding-top: 72px;
      min-height: 100vh;
    }
  `]
})
export class App {
  quizService = inject(QuizService);

  appState = signal<AppState>('home');
  quizResult = signal<QuizResult | null>(null);
  isEntering = signal(false);

  startQuiz(): void {
    this.quizService.reset();
    this.appState.set('quiz');
    this.triggerEnterAnimation();
  }

  onAnswer(option: QuizOption): void {
    this.quizService.answerQuestion(option);
    this.triggerEnterAnimation();

    if (this.quizService.isCompleted()) {
      setTimeout(() => this.showResults(), 300);
    }
  }

  onGoBack(): void {
    this.quizService.previousStep();
    this.triggerEnterAnimation();
  }

  showResults(): void {
    const result = this.quizService.calculateResults();
    this.quizResult.set(result);
    this.appState.set('result');
  }

  restartQuiz(): void {
    this.quizService.reset();
    this.quizResult.set(null);
    this.appState.set('home');
  }

  private triggerEnterAnimation(): void {
    this.isEntering.set(false);
    setTimeout(() => this.isEntering.set(true), 10);
  }
}
