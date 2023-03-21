import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';
import { ListboxModule } from 'primeng/listbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AnimateModule } from 'primeng/animate';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputNumberModule} from 'primeng/inputnumber';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoiseSensitivityComponent } from './noise-sensitivity/noise-sensitivity.component';
import { VibrationSensitivityComponent } from './vibration-sensitivity/vibration-sensitivity.component';
import { ConnectionComponent } from './connection/connection.component';
import { SpeechComponent } from './speech/speech.component';
import { ConfirmationService } from 'primeng/api';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { connectionReducer } from './store/connection/connection.reducer';
import { inputReducer } from './store/input/input.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConnectionEffects } from './store/connection/connection.effects';
import { InputEffects } from './store/input/input.effects';
import { STTEffects } from './store/speech-to-text/stt.effects';
import { sttReducer } from './store/speech-to-text/stt.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NoiseSensitivityComponent,
    VibrationSensitivityComponent,
    ConnectionComponent,
    SpeechComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AnimateModule,
    AppRoutingModule,
    MenubarModule,
    SliderModule,
    CardModule,
    DividerModule,
    ButtonModule,
    InputTextareaModule,
    SkeletonModule,
    ListboxModule,
    ToggleButtonModule,
    MessagesModule,
    MessageModule,
    HttpClientModule,
    InputNumberModule,
    ConfirmPopupModule,
    StoreModule.forRoot({input: inputReducer, connection: connectionReducer, stt: sttReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot(ConnectionEffects,InputEffects, STTEffects),
  ],
  providers: [DialogService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
