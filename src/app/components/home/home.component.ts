import { Component, output } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home">
      <div class="home__content animate-fade-in-up">
        <div class="home__image-container animate-scale-in">
          <img 
            src="mesa.png" 
            alt="Mesa de RPG" 
            class="home__image"
            loading="eager"
          />
          <div class="home__image-overlay"></div>
        </div>
        
        <div class="home__text">
          <h1 class="home__title animate-fade-in-up delay-200">
            Descubra sua Classe
          </h1>
          <p class="home__subtitle animate-fade-in-up delay-300">
            Responda ao quiz e descubra qual classe, trilha e origem combinam mais com você no RPG Ordem Paranormal
          </p>
        </div>
        
        <button 
          class="btn btn--primary btn--lg home__cta animate-fade-in-up delay-400"
          (click)="onStart()"
        >
          <span>Começar Quiz</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        
        <div class="home__features animate-fade-in-up delay-500">
          <div class="home__feature">
            <span class="home__feature-icon">⚔️</span>
            <span class="home__feature-text">3 Classes</span>
          </div>
          <div class="home__feature">
            <span class="home__feature-icon">🎯</span>
            <span class="home__feature-text">24 Trilhas</span>
          </div>
          <div class="home__feature">
            <span class="home__feature-icon">📜</span>
            <span class="home__feature-text">23 Origens</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home {
      min-height: calc(100vh - 80px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      
      @media (min-width: 768px) {
        padding: 3rem 2rem;
      }
    }
    
    .home__content {
      max-width: 600px;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      
      @media (min-width: 768px) {
        gap: 2rem;
      }
    }
    
    .home__image-container {
      position: relative;
      width: 100%;
      max-width: 400px;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px var(--shadow-color);
    }
    
    .home__image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }
    
    .home__image-container:hover .home__image {
      transform: scale(1.05);
    }
    
    .home__image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        transparent 60%,
        rgba(0, 0, 0, 0.3) 100%
      );
      pointer-events: none;
    }
    
    .home__text {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .home__title {
      font-size: clamp(2rem, 6vw, 3rem);
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .home__subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 450px;
      margin: 0 auto;
      line-height: 1.6;
      
      @media (min-width: 768px) {
        font-size: 1.125rem;
      }
    }
    
    .home__cta {
      margin-top: 0.5rem;
      
      svg {
        transition: transform 0.3s ease;
      }
      
      &:hover svg {
        transform: translateX(4px);
      }
    }
    
    .home__features {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 1rem;
      
      @media (min-width: 768px) {
        gap: 2.5rem;
      }
    }
    
    .home__feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    
    .home__feature-icon {
      font-size: 1.75rem;
      
      @media (min-width: 768px) {
        font-size: 2rem;
      }
    }
    
    .home__feature-text {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
  `]
})
export class HomeComponent {
  startQuiz = output<void>();

  onStart(): void {
    this.startQuiz.emit();
  }
}
