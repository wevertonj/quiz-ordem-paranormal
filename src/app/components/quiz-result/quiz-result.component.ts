import {
  Component,
  input,
  output,
  ElementRef,
  viewChild,
  afterNextRender,
  signal
} from '@angular/core';
import { QuizResult } from '../../models/quiz.models';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  template: `
    <div class="result">
      <div class="result__header animate-fade-in-down">
        <h1 class="result__title">Seu Resultado</h1>
        <p class="result__subtitle">Baseado nas suas respostas, descobrimos seu perfil ideal!</p>
      </div>
      
      <div class="result__main-card animate-scale-in delay-200">
        <div class="result__classe">
          <span class="result__classe-icon">{{ result().classe.icone }}</span>
          <div class="result__classe-info">
            <span class="result__classe-label">Sua Classe</span>
            <h2 class="result__classe-name">{{ result().classe.nome }}</h2>
          </div>
        </div>
        <p class="result__classe-desc">{{ result().classe.descricao }}</p>
      </div>
      
      <div class="result__secondary">
        <div class="result__card animate-fade-in-up delay-300">
          <div class="result__card-header">
            <span class="result__card-icon">🎯</span>
            <h3 class="result__card-title">Trilha Sugerida</h3>
          </div>
          <div class="result__card-content">
            <span class="result__card-value">{{ result().trilha.nome }}</span>
            <p class="result__card-desc">{{ result().trilha.descricao }}</p>
          </div>
        </div>
        
        <div class="result__card animate-fade-in-up delay-400">
          <div class="result__card-header">
            <span class="result__card-icon">📜</span>
            <h3 class="result__card-title">Origem Sugerida</h3>
          </div>
          <div class="result__card-content">
            <span class="result__card-value">{{ result().origem.nome }}</span>
            <p class="result__card-desc">{{ result().origem.descricao }}</p>
          </div>
        </div>
      </div>
      
      <div class="result__charts">
        <div class="result__chart-container animate-fade-in-up delay-500" #radarContainer>
          <h3 class="result__chart-title">Distribuição de Classes</h3>
          <div class="result__chart-wrapper">
            <canvas #radarChart></canvas>
          </div>
        </div>
        
        <div class="result__chart-container animate-fade-in-up delay-500" #barContainer>
          <h3 class="result__chart-title">Top 5 Trilhas</h3>
          <div class="result__chart-wrapper">
            <canvas #barChart></canvas>
          </div>
        </div>
        
        <div class="result__chart-container animate-fade-in-up delay-500" #doughnutContainer>
          <h3 class="result__chart-title">Top 5 Origens</h3>
          <div class="result__chart-wrapper">
            <canvas #doughnutChart></canvas>
          </div>
        </div>
      </div>
      
      <div class="result__actions animate-fade-in-up delay-500">
        <button class="btn btn--primary btn--lg" (click)="restart.emit()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          <span>Refazer Quiz</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .result {
      padding: 1.5rem 1rem 3rem;
      max-width: 1200px;
      margin: 0 auto;
      
      @media (min-width: 768px) {
        padding: 2rem 2rem 4rem;
      }
    }
    
    .result__header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .result__title {
      font-size: clamp(1.75rem, 5vw, 2.5rem);
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .result__subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
    }
    
    .result__main-card {
      background: linear-gradient(135deg, 
        rgba(98, 0, 238, 0.1), 
        rgba(3, 218, 198, 0.1)
      );
      border: 2px solid var(--accent-primary);
      border-radius: 20px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      
      @media (min-width: 768px) {
        padding: 2rem;
      }
    }
    
    .result__classe {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .result__classe-icon {
      font-size: 3rem;
      
      @media (min-width: 768px) {
        font-size: 4rem;
      }
    }
    
    .result__classe-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .result__classe-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .result__classe-name {
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 700;
      color: var(--text-primary);
    }
    
    .result__classe-desc {
      color: var(--text-secondary);
      line-height: 1.6;
      font-size: 0.9375rem;
    }
    
    .result__secondary {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
      
      @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .result__card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.25rem;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px var(--shadow-color);
      }
    }
    
    .result__card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    
    .result__card-icon {
      font-size: 1.5rem;
    }
    
    .result__card-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .result__card-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .result__card-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    
    .result__card-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    
    .result__charts {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
      
      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .result__chart-container {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.25rem;
      
      @media (min-width: 768px) {
        &:first-child {
          grid-column: span 2;
        }
      }
      
      @media (min-width: 1024px) {
        &:first-child {
          grid-column: span 1;
        }
      }
    }
    
    .result__chart-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .result__chart-wrapper {
      position: relative;
      height: 250px;
      width: 100%;
      
      canvas {
        max-width: 100%;
        max-height: 100%;
      }
    }
    
    .result__actions {
      display: flex;
      justify-content: center;
      padding-top: 1rem;
    }
  `]
})
export class QuizResultComponent {
  result = input.required<QuizResult>();
  restart = output<void>();

  radarChart = viewChild<ElementRef<HTMLCanvasElement>>('radarChart');
  barChart = viewChild<ElementRef<HTMLCanvasElement>>('barChart');
  doughnutChart = viewChild<ElementRef<HTMLCanvasElement>>('doughnutChart');
  radarContainer = viewChild<ElementRef<HTMLDivElement>>('radarContainer');
  barContainer = viewChild<ElementRef<HTMLDivElement>>('barContainer');
  doughnutContainer = viewChild<ElementRef<HTMLDivElement>>('doughnutContainer');

  private charts: Chart[] = [];
  private observer: IntersectionObserver | null = null;
  private chartsInitialized = signal({
    radar: false,
    bar: false,
    doughnut: false
  });

  constructor() {
    afterNextRender(() => {
      this.setupIntersectionObserver();
    });
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (target === this.radarContainer()?.nativeElement && !this.chartsInitialized().radar) {
              this.initRadarChart();
              this.chartsInitialized.update(s => ({ ...s, radar: true }));
            } else if (target === this.barContainer()?.nativeElement && !this.chartsInitialized().bar) {
              this.initBarChart();
              this.chartsInitialized.update(s => ({ ...s, bar: true }));
            } else if (target === this.doughnutContainer()?.nativeElement && !this.chartsInitialized().doughnut) {
              this.initDoughnutChart();
              this.chartsInitialized.update(s => ({ ...s, doughnut: true }));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (this.radarContainer()?.nativeElement) {
      this.observer.observe(this.radarContainer()!.nativeElement);
    }
    if (this.barContainer()?.nativeElement) {
      this.observer.observe(this.barContainer()!.nativeElement);
    }
    if (this.doughnutContainer()?.nativeElement) {
      this.observer.observe(this.doughnutContainer()!.nativeElement);
    }
  }

  private getChartColors(): { primary: string; secondary: string; tertiary: string; text: string; grid: string; } {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      primary: isDark ? '#bb86fc' : '#6200ee',
      secondary: isDark ? '#03dac6' : '#03dac6',
      tertiary: isDark ? '#ff7043' : '#ff5722',
      text: isDark ? '#f5f5f5' : '#1a1a1a',
      grid: isDark ? '#3d3d3d' : '#e0e0e0'
    };
  }

  private initRadarChart(): void {
    const canvas = this.radarChart()?.nativeElement;
    if (!canvas) return;

    const colors = this.getChartColors();
    const data = this.result().distribuicaoClasses;

    const chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['Combatente', 'Especialista', 'Ocultista'],
        datasets: [{
          label: 'Afinidade',
          data: [data.combatente, data.especialista, data.ocultista],
          backgroundColor: `${colors.primary}33`,
          borderColor: colors.primary,
          borderWidth: 2,
          pointBackgroundColor: colors.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false
            },
            grid: {
              color: colors.grid
            },
            angleLines: {
              color: colors.grid
            },
            pointLabels: {
              color: colors.text,
              font: {
                size: 13,
                weight: 600
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`
            }
          }
        }
      }
    });

    this.charts.push(chart);
  }

  private initBarChart(): void {
    const canvas = this.barChart()?.nativeElement;
    if (!canvas) return;

    const colors = this.getChartColors();
    const trilhas = this.result().topTrilhas;

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: trilhas.map(t => t.nome),
        datasets: [{
          label: 'Pontuação',
          data: trilhas.map(t => t.pontuacao),
          backgroundColor: [
            colors.primary,
            colors.secondary,
            colors.tertiary,
            `${colors.primary}88`,
            `${colors.secondary}88`
          ],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: colors.grid
            },
            ticks: {
              color: colors.text
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              color: colors.text,
              font: {
                size: 11
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    this.charts.push(chart);
  }

  private initDoughnutChart(): void {
    const canvas = this.doughnutChart()?.nativeElement;
    if (!canvas) return;

    const colors = this.getChartColors();
    const origens = this.result().topOrigens;

    const chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: origens.map(o => o.nome),
        datasets: [{
          data: origens.map(o => o.pontuacao || 1),
          backgroundColor: [
            colors.primary,
            colors.secondary,
            colors.tertiary,
            `${colors.primary}88`,
            `${colors.secondary}88`
          ],
          borderWidth: 0,
          spacing: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: colors.text,
              padding: 12,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 11
              }
            }
          }
        }
      }
    });

    this.charts.push(chart);
  }

  ngOnDestroy(): void {
    this.charts.forEach(chart => chart.destroy());
    this.observer?.disconnect();
  }
}
