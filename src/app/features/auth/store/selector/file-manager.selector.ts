import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileManagerState } from '../reducer/file-manager.reducer';

export const selectFileManagerState = createFeatureSelector<FileManagerState>('fileManager');

export const userFiles = createSelector(
  selectFileManagerState,
  (state) => state.files
);