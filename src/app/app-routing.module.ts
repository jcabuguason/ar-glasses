import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { NoiseSensitivityComponent } from './noise-sensitivity/noise-sensitivity.component';
import { SpeechComponent } from './speech/speech.component';
import { VibrationSensitivityComponent } from './vibration-sensitivity/vibration-sensitivity.component';

const routes: Routes = [
  { path: 'noise-sensitivity', component: NoiseSensitivityComponent },
  { path: 'settings', component: ConnectionComponent },
  { path: 'speech', component: SpeechComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
