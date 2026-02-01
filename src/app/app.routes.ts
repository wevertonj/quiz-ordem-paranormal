import { Routes } from '@angular/router';
import { FichaAgenteComponent } from './components/ficha-agente/ficha-agente'; // ajuste o caminho se necessário

export const routes: Routes = [
  // ... suas outras rotas
  { path: 'ficha', component: FichaAgenteComponent }
];