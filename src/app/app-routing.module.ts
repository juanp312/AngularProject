import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarMedicamentoComponent } from './feature/agregarMedicamento.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "medicamento-form", component: AgregarMedicamentoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }