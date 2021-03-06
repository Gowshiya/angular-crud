import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultipleformComponent } from './crud/multipleform/multipleform.component';
import { ViewComponent } from './crud/view/view.component';
import { CreateComponent } from './crud/create/create.component';
import { UpdateComponent } from './crud/update/update.component';
import { ReadComponent } from './crud/read/read.component';
import { MultibatchComponent } from './multibatch/multibatch.component';



const routes: Routes = [
    {path: '', component: ViewComponent},
    {path: 'create', component: CreateComponent},
    {path: 'update/:id', component: UpdateComponent},
    {path: 'view/:id', component: ReadComponent},

    {path: 'multipleform', component: MultipleformComponent},
    {path: 'mcreate', component: MultipleformComponent},
    {path: 'mupdate/:id', component: MultipleformComponent},
    {path: 'mview/:id', component: MultipleformComponent},

    {path: 'multibatch', component: MultibatchComponent}

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
