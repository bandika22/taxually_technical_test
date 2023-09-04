import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileManagerState } from '../reducer/file-manager.reducer';

export const selectFileManagerState = createFeatureSelector<FileManagerState>('file');

export const userFiles = createSelector(
  selectFileManagerState,
  (state) => state.files
);