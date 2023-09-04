import { createReducer, on } from '@ngrx/store';
import * as FileManagerTypes from '../action/file-manager.action';
import { User } from '../../models/user';
import { UserFiles } from '../../models/user-files';

export interface FileManagerState {
  files: UserFiles
}

export const initialState: FileManagerState = {
  files: {} as UserFiles
}

export const fileManagerReducer = createReducer(
  initialState,
  on(FileManagerTypes.loadUserFilesSuccess, (state, action) => ({
    ...state,
    files: action.files,
    error: null
  })),
  on(FileManagerTypes.deleteFileSuccess, (state, action) => ({
    ...state,
    error: null
  }))
);