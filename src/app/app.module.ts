import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AnimateModule} from 'primeng/animate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoiseSensitivityComponent } from './noise-sensitivity/noise-sensitivity.component';
import { VibrationSensitivityComponent } from './vibration-sensitivity/vibration-sensitivity.component';
import { ConnectionComponent } from './connection/connection.component';
import { SpeechComponent } from './speech/speech.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
