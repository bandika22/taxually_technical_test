import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FileManagerTypes from '../action/file-manager.action';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class FileManagerEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private apiSeervice: ApiService
  ) { }

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileManagerTypes.saveFiles),
      switchMap((action) => {
        this.apiSeervice.saveFiles(action.files);
        return of(FileManagerTypes.saveFilesSuccess());
      })
    )
  );

   getFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileManagerTypes.loadUserFiles),
      switchMap((action, state) => {
        const files = this.apiSeervice.getUsers();
        return of(FileManagerTypes.loadUserFilesSuccess({ files }));
      })
    )
  ); 

}
