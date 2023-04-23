import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { NoiseSensitivityComponent } from './noise-sensitivity/noise-sensitivity.component';
import { SpeechComponent } from './speech/speech.component';
import { NoiseClassificationComponent } from './noise-classification/noise-classification.component';

const routes: Routes = [
  { path: 'noise-sensitivity', component: NoiseSensitivityComponent },
  { path: 'settings', component: ConnectionComponent },
  { path: 'speech', component: SpeechComponent },
  { path: 'classification', component: NoiseClassificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
