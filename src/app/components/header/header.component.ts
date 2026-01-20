import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header__container">
        <div class="header__logo">
          <span class="header__icon">🔮</span>
          <span class="header__title">Ordem Paranormal</span>
        </div>
        
        <button 
          class="theme-toggle" 
          (click)="themeService.toggleTheme()"
          [attr.aria-label]="themeService.theme() === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'"
        >
          @if (themeService.theme() === 'light') {
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          }
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    
    .header__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.875rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      @media (min-width: 768px) {
        padding: 1rem 2rem;
      }
    }
    
    .header__logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .header__icon {
      font-size: 1.5rem;
    }
    
    .header__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      
      @media (min-width: 768px) {
        font-size: 1.25rem;
      }
    }
    
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.25s ease;
      
      &:hover {
        background: var(--bg-tertiary);
        transform: scale(1.05);
      }
      
      &:active {
        transform: scale(0.95);
      }
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);
}
