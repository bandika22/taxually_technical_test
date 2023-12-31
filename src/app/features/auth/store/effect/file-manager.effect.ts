import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FileManagerTypes from '../action/file-manager.action';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { FileManagerService } from '../../services/file-manager.service';

@Injectable()
export class FileManagerEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private apiService: ApiService,
    private fileManagerService: FileManagerService
  ) { }

  saveFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileManagerTypes.saveFiles),
      switchMap((action) => {
        return this.apiService.saveFiles(action.files)
          .pipe(
            map(response => FileManagerTypes.saveFilesSuccess()),
            tap(() => {
              this.fileManagerService.loadFiles();
            }),
            catchError((error) => of(FileManagerTypes.saveFilesError({ error: error })))
          );
      })
    )
  );

  getFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileManagerTypes.loadUserFiles),
      switchMap((action) => {
        return this.apiService.getFiles(action.userId)
          .pipe(
            map(response => FileManagerTypes.loadUserFilesSuccess({ files: response.body })),
            catchError((error) => of(FileManagerTypes.loadUserFilesError({ error: error })))
          );
      })
    )
  );

  deleteFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileManagerTypes.deleteFile),
      switchMap((action) => {
        return this.apiService.deleteFiles(action.userId, action.fileName)
          .pipe(
            tap(() => this.fileManagerService.loadFiles()),
            map(response => FileManagerTypes.deleteFileSuccess()),
            catchError((error) => of(FileManagerTypes.deleteFileError({ error: error })))
          );
      })
    )
  );

}
