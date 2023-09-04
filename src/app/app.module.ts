import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './features/auth/store/reducer/auth.reducer';
import { AuthEffects } from './features/auth/store/effect/auth.effect';
import { fileManagerReducer } from './features/auth/store/reducer/file-manager.reducer';
import { FileManagerEffects } from './features/auth/store/effect/file-manager.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApiService } from './core/services/api.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      auth: authReducer,
      fileManager: fileManagerReducer
    }),
    EffectsModule.forRoot([AuthEffects, FileManagerEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
