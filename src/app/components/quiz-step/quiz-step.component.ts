import { Component, input, output, computed } from '@angular/core';
import { QuizQuestion, QuizOption } from '../../models/quiz.models';

@Component({
  selector: 'app-quiz-step',
  standalone: true,
  template: `
    <div class="quiz-step" [class.quiz-step--entering]="isEntering()">
      <div class="quiz-step__progress">
        <div class="quiz-step__progress-bar">
          <div 
            class="quiz-step__progress-fill" 
            [style.width.%]="progressPercentage()"
          ></div>
        </div>
        <span class="quiz-step__progress-text">
          {{ currentStep() + 1 }} de {{ totalSteps() }}
        </span>
      </div>
      
      <div class="quiz-step__content">
        <div class="quiz-step__question-container">
          <span class="quiz-step__category">{{ getCategoryLabel() }}</span>
          <h2 class="quiz-step__question">{{ question().question }}</h2>
        </div>
        
        <div class="quiz-step__options">
          @for (option of question().options; track option.text; let i = $index) {
            <button 
              class="quiz-step__option"
              [class.quiz-step__option--selected]="isSelected(option)"
              [style.animation-delay.ms]="i * 100"
              (click)="selectOption(option)"
            >
              <span class="quiz-step__option-indicator">{{ getOptionLetter(i) }}</span>
              <span class="quiz-step__option-text">{{ option.text }}</span>
            </button>
          }
        </div>
      </div>
      
      <div class="quiz-step__navigation">
        <button 
          class="btn btn--secondary"
          [disabled]="!canGoBack()"
          (click)="goBack.emit()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Voltar</span>
        </button>
        
        @if (isLastStep()) {
          <button 
            class="btn btn--primary"
            [disabled]="!hasAnswer()"
            (click)="finish.emit()"
          >
            <span>Ver Resultado</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .quiz-step {
      min-height: calc(100vh - 80px);
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      max-width: 700px;
      margin: 0 auto;
      animation: slideInRight 0.4s ease-out;
      
      @media (min-width: 768px) {
        padding: 2rem;
      }
      
      &--entering {
        animation: slideInRight 0.4s ease-out;
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .quiz-step__progress {
      margin-bottom: 2rem;
    }
    
    .quiz-step__progress-bar {
      height: 6px;
      background: var(--bg-tertiary);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }
    
    .quiz-step__progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 3px;
      transition: width 0.4s ease;
    }
    
    .quiz-step__progress-text {
      font-size: 0.875rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    
    .quiz-step__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      
      @media (min-width: 768px) {
        gap: 2rem;
      }
    }
    
    .quiz-step__question-container {
      text-align: center;
    }
    
    .quiz-step__category {
      display: inline-block;
      padding: 0.375rem 0.875rem;
      background: var(--accent-primary);
      color: white;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 1rem;
    }
    
    .quiz-step__question {
      font-size: clamp(1.25rem, 4vw, 1.75rem);
      font-weight: 600;
      line-height: 1.4;
      color: var(--text-primary);
    }
    
    .quiz-step__options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      
      @media (min-width: 768px) {
        gap: 1rem;
      }
    }
    
    .quiz-step__option {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: var(--card-bg);
      border: 2px solid var(--border-color);
      border-radius: 14px;
      cursor: pointer;
      text-align: left;
      transition: all 0.25s ease;
      animation: fadeInUp 0.4s ease-out both;
      
      @media (min-width: 768px) {
        padding: 1.25rem 1.5rem;
      }
      
      &:hover {
        border-color: var(--accent-primary);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px var(--shadow-color);
      }
      
      &--selected {
        border-color: var(--accent-primary);
        background: linear-gradient(135deg, 
          rgba(98, 0, 238, 0.1), 
          rgba(3, 218, 198, 0.1)
        );
        
        .quiz-step__option-indicator {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .quiz-step__option-indicator {
      width: 36px;
      height: 36px;
      min-width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--border-color);
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-secondary);
      transition: all 0.25s ease;
    }
    
    .quiz-step__option-text {
      font-size: 0.9375rem;
      color: var(--text-primary);
      line-height: 1.5;
      
      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }
    
    .quiz-step__navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class QuizStepComponent {
  question = input.required<QuizQuestion>();
  currentStep = input.required<number>();
  totalSteps = input.required<number>();
  selectedAnswer = input<QuizOption | undefined>();
  canGoBack = input<boolean>(false);
  isEntering = input<boolean>(false);

  selectAnswer = output<QuizOption>();
  goBack = output<void>();
  finish = output<void>();

  progressPercentage = computed(() => ((this.currentStep() + 1) / this.totalSteps()) * 100);

  isLastStep(): boolean {
    return this.currentStep() === this.totalSteps() - 1;
  }

  hasAnswer(): boolean {
    return this.selectedAnswer() !== undefined;
  }

  isSelected(option: QuizOption): boolean {
    return this.selectedAnswer()?.text === option.text;
  }

  selectOption(option: QuizOption): void {
    this.selectAnswer.emit(option);
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getCategoryLabel(): string {
    const category = this.question().category;
    const labels: Record<string, string> = {
      classe: 'Classe',
      trilha: 'Trilha',
      origem: 'Origem',
      personalidade: 'Personalidade'
    };
    return labels[category] || category;
  }
}
