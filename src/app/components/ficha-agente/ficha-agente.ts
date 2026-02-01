import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ficha-agente',
  standalone: true,
  imports: [CommonModule],
template: `
    <div class="ficha-container">
      <header class="ficha-header">
        <div class="header-item">
          <label>AGENTE</label>
          <input type="text" [value]="nome()" (input)="updateNome($event)" placeholder="NOME DO AGENTE">
        </div>
        <div class="header-item">
          <label>CLASSE</label>
          <div class="header-value">{{ classe() }}</div>
        </div>
        <div class="header-item">
          <label>ORIGEM</label>
          <div class="header-value">{{ origem() }}</div>
        </div>
        <div class="header-item">
          <label>NEX</label>
          <div class="header-value">5%</div>
        </div>
      </header>

      <div class="ficha-grid-3col">
        
        <section class="col-atributos">
          <div class="pentagrama-visual">
            <div class="titulo-pontos">PONTOS: {{ pontosRestantes() }}</div>
            
            <div class="attr-node agi" [class.max]="agilidade() >= 3">
              <button (click)="addPoint('agilidade')">+</button>
              <span class="attr-val">{{ agilidade() }}</span>
              <label>AGI</label>
            </div>

            <div class="attr-node for" [class.max]="forca() >= 3">
              <button (click)="addPoint('forca')">+</button>
              <span class="attr-val">{{ forca() }}</span>
              <label>FOR</label>
            </div>

            <div class="attr-node int" [class.max]="intelecto() >= 3">
              <button (click)="addPoint('intelecto')">+</button>
              <span class="attr-val">{{ intelecto() }}</span>
              <label>INT</label>
            </div>

            <div class="attr-node vig" [class.max]="vigor() >= 3">
              <button (click)="addPoint('vigor')">+</button>
              <span class="attr-val">{{ vigor() }}</span>
              <label>VIG</label>
            </div>

            <div class="attr-node pre" [class.max]="presenca() >= 3">
              <button (click)="addPoint('presenca')">+</button>
              <span class="attr-val">{{ presenca() }}</span>
              <label>PRE</label>
            </div>
          </div>

          <div class="status-bars">
            <div class="bar-container">
              <div class="bar-label">PONTOS DE VIDA <span>{{ pvMax() }}/{{ pvMax() }}</span></div>
              <div class="bar-bg"><div class="bar-fill vida" style="width: 100%"></div></div>
            </div>
            <div class="bar-container">
              <div class="bar-label">PONTOS DE ESFORÇO <span>{{ peMax() }}/{{ peMax() }}</span></div>
              <div class="bar-bg"><div class="bar-fill esforco" style="width: 100%"></div></div>
            </div>
            <div class="bar-container">
              <div class="bar-label">SANIDADE <span>{{ sanMax() }}/{{ sanMax() }}</span></div>
              <div class="bar-bg"><div class="bar-fill sanidade" style="width: 100%"></div></div>
            </div>
          </div>
        </section>

        <section class="col-pericias-central">
          <h3 class="section-title">PERÍCIAS</h3>
          <div class="pericias-scroll">
            <div class="pericia-row"><span>Acrobacia</span> <small>+{{ agilidade() * 5 }}</small></div>
            <div class="pericia-row"><span>Atletismo</span> <small>+{{ forca() * 5 }}</small></div>
            <div class="pericia-row"><span>Atualidades</span> <small>+{{ intelecto() * 5 }}</small></div>
            <div class="pericia-row"><span>Ciências</span> <small>+{{ intelecto() * 5 }}</small></div>
            <div class="pericia-row"><span>Diplomacia</span> <small>+{{ presenca() * 5 }}</small></div>
            <div class="pericia-row"><span>Fortitude</span> <small>+{{ vigor() * 5 }}</small></div>
            <div class="pericia-row"><span>Furtividade</span> <small>+{{ agilidade() * 5 }}</small></div>
            <div class="pericia-row"><span>Intimidação</span> <small>+{{ presenca() * 5 }}</small></div>
            <div class="pericia-row"><span>Investigação</span> <small>+{{ intelecto() * 5 }}</small></div>
            <div class="pericia-row"><span>Luta</span> <small>+{{ forca() * 5 }}</small></div>
            <div class="pericia-row"><span>Misticismo</span> <small>+{{ intelecto() * 5 }}</small></div>
            <div class="pericia-row"><span>Percepção</span> <small>+{{ presenca() * 5 }}</small></div>
            <div class="pericia-row"><span>Pontaria</span> <small>+{{ agilidade() * 5 }}</small></div>
            <div class="pericia-row"><span>Vontade</span> <small>+{{ presenca() * 5 }}</small></div>
          </div>
        </section>

        <section class="col-tabs-acoes">
          <nav class="tab-nav">
            <button (click)="activeTab.set('combate')" [class.active]="activeTab() === 'combate'">COMBATE</button>
            <button (click)="activeTab.set('poderes')" [class.active]="activeTab() === 'poderes'">PODERES</button>
            <button (click)="activeTab.set('itens')" [class.active]="activeTab() === 'itens'">ITENS</button>
          </nav>

          <div class="tab-content">
            @if (activeTab() === 'combate') {
              <div class="action-card" [class.open]="showMoreStates['atk1']">
                <div class="card-header" (click)="toggleShowMore('atk1')">
                  <div class="card-info">
                    <strong>Ataque com Faca</strong>
                    <span>1d4+2 | 19/x2</span>
                  </div>
                  <span class="arrow">▼</span>
                </div>
                @if (showMoreStates['atk1']) {
                  <div class="card-body">
                    <p>Ataque rápido corpo-a-corpo. Lorem ipsum dolor sit amet.</p>
                  </div>
                }
              </div>
            }

            @if (activeTab() === 'poderes') {
              <div class="action-card" [class.open]="showMoreStates['hab1']">
                <div class="card-header" (click)="toggleShowMore('hab1')">
                  <div class="card-info">
                    <strong>Sentido Aguçado</strong>
                    <span>Habilidade Passiva</span>
                  </div>
                  <span class="arrow">▼</span>
                </div>
                @if (showMoreStates['hab1']) {
                  <div class="card-body">
                    <p>Você recebe +5 em testes de Percepção. Lorem ipsum paranormalis.</p>
                  </div>
                }
              </div>
            }

            @if (activeTab() === 'itens') {
              <div class="pericia-row"><span>Mochila</span> <small>1/5</small></div>
              <div class="pericia-row"><span>Lanterna</span> <small>1 Espaço</small></div>
            }
          </div>
        </section>
      </div>
    </div>
  `,













  
  styles: [`
    :host { --accent: #ff0000; --bg: #0a0a0a; --card: #151515; }
    
    .ficha-container {
      background: var(--bg);
      min-height: 100vh;
      color: white;
      padding: 20px;
      font-family: 'Courier New', Courier, monospace;
    }


    /* GRID DE 3 COLUNAS */
    .ficha-grid-3col {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr 1.2fr; /* Coluna do meio um pouco menor */
      gap: 20px;
      align-items: start;
    }

    /* COLUNA CENTRAL DE PERÍCIAS */
    .col-pericias-central {
      background: rgba(255,255,255,0.03);
      border: 1px solid #222;
      padding: 15px;
      height: 600px;
      display: flex;
      flex-direction: column;
    }

    .pericias-scroll {
      overflow-y: auto;
      padding-right: 5px;
    }

    .pericia-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid #1a1a1a;
      font-size: 0.85rem;
    }

    .pericia-row small { color: var(--accent); font-weight: bold; }

    /* CARDS COM SETINHA (ACCORDION) */
    .action-card {
      background: #111;
      border: 1px solid #333;
      margin-bottom: 10px;
      transition: all 0.3s;
    }

    .action-card.open { border-color: var(--accent); }

    .card-header {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .card-info { display: flex; flex-direction: column; }
    .card-info strong { font-size: 0.9rem; color: var(--accent); }
    .card-info span { font-size: 0.7rem; color: #888; }

    .arrow {
      font-size: 0.6rem;
      transition: transform 0.3s;
      color: #555;
    }

    .open .arrow { transform: rotate(180deg); color: var(--accent); }

    .card-body {
      padding: 12px;
      border-top: 1px solid #222;
      font-size: 0.8rem;
      color: #bbb;
      background: #0a0a0a;
    }

    /* Custom Scrollbar para parecer C.R.I.S. */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: var(--accent); }


    .ficha-header {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      background: var(--card);
      padding: 20px;
      border-bottom: 3px solid var(--accent);
      margin-bottom: 20px;
    }

    .header-item label { color: var(--accent); font-size: 0.7rem; font-weight: bold; }
    .header-item input { background: transparent; border: none; border-bottom: 1px solid #333; color: white; width: 100%; font-size: 1.1rem; }
    .header-value { font-size: 1.1rem; text-transform: uppercase; }

    .ficha-main { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }

    /* Estilo do Pentagrama Humano */
    .pentagrama-visual {
      height: 400px;
      position: relative;
      background: radial-gradient(circle, rgba(255,0,0,0.05) 0%, transparent 70%);
      margin-bottom: 30px;
    }

    .titulo-pontos { text-align: center; color: #666; font-size: 0.8rem; margin-top: 10px; }

    .attr-node {
      position: absolute;
      width: 70px;
      height: 70px;
      background: #111;
      border: 2px solid #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }

    /* --- CSS DAS TABS E PERÍCIAS --- */
    .tab-nav {
      display: flex;
      gap: 10px;
      border-bottom: 1px solid #333;
      margin-bottom: 20px;
      overflow-x: auto;
    }

    .tab-nav button {
      background: transparent;
      border: none;
      color: #666;
      padding: 10px 15px;
      cursor: pointer;
      font-family: inherit;
      font-weight: bold;
      transition: 0.3s;
      white-space: nowrap;
    }

    .tab-nav button.active {
      color: var(--accent);
      border-bottom: 2px solid var(--accent);
    }

    .tab-content {
      background: rgba(255, 255, 255, 0.02);
      padding: 15px;
      border-radius: 5px;
      max-height: 500px;
      overflow-y: auto;
    }

    .pericias-list {
      display: grid;
      grid-template-columns: 1fr 1fr; /* Aqui faz as duas colunas */
      gap: 10px;
    }

    .show-more {
      color: var(--accent);
      font-size: 0.7rem;
      text-decoration: underline;
      cursor: pointer;
      margin-top: 5px;
    }

    .description-box {
      background: #000;
      border-left: 2px solid var(--accent);
      padding: 10px;
      margin-top: 10px;
      font-size: 0.8rem;
      color: #ccc;
      animation: fadeIn 0.3s ease;
    }

    .combate-section, .habilidades-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .arma-card {
      background: #1a1a1a;
      padding: 10px;
      border: 1px solid #333;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .attr-node.max { border-color: var(--accent); box-shadow: 0 0 10px rgba(255,0,0,0.3); }

    .attr-node button { background: var(--accent); border: none; color: white; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; position: absolute; top: -10px; }
    .attr-val { font-size: 1.8rem; font-weight: bold; }
    .attr-node label { font-size: 0.6rem; color: #888; }

    /* Posições Circulares */
    .agi { top: 10%; left: 50%; transform: translateX(-50%); }
    .int { top: 35%; right: 10%; }
    .vig { bottom: 10%; right: 20%; }
    .pre { bottom: 10%; left: 20%; }
    .for { top: 35%; left: 10%; }

    .status-bars { display: flex; flex-direction: column; gap: 15px; }
    .bar-bg { background: #222; height: 10px; border-radius: 5px; overflow: hidden; margin-top: 5px; }
    .bar-fill { height: 100%; transition: width 0.3s; }
    .vida { background: #ff3e3e; }
    .esforco { background: #3e8bff; }
    .sanidade { background: #3effda; }

    .section-title { border-left: 4px solid var(--accent); padding-left: 10px; margin-bottom: 15px; }
    .pericia-item { display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #222; }
    .pericia-item small { color: var(--accent); }
  `]
})
export class FichaAgenteComponent {
  nome = signal('Henri');
  classe = signal('Ocultista');
  origem = signal('Acadêmico');

  // Atributos iniciais (começam com 1)
  forca = signal(1);
  agilidade = signal(1);
  intelecto = signal(1);
  vigor = signal(1);
  presenca = signal(1);
  activeTab = signal('pericias');

  pontosRestantes = computed(() => {
    const gastos = (this.forca() - 1) + (this.agilidade() - 1) +
      (this.intelecto() - 1) + (this.vigor() - 1) + (this.presenca() - 1);
    return 4 - gastos;
  });

  // Fórmulas de Vida/Sanidade/PE (Exemplo simplificado de 5%)
  pvMax = computed(() => 12 + this.vigor());
  peMax = computed(() => 2 + this.presenca());
  sanMax = computed(() => 12);

  updateNome(event: Event) {
    this.nome.set((event.target as HTMLInputElement).value);
  }

  addPoint(attr: 'forca' | 'agilidade' | 'intelecto' | 'vigor' | 'presenca') {
    if (this.pontosRestantes() > 0 && this[attr]() < 3) {
      this[attr].set(this[attr]() + 1);
    }
  }

  // Objeto para controlar quais "Show More" estão abertos
  showMoreStates: { [key: string]: boolean } = {};

  toggleShowMore(id: string) {
    this.showMoreStates[id] = !this.showMoreStates[id];
  }
}


