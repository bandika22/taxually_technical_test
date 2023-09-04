import { createAction, props } from "@ngrx/store";
import { UserFiles } from "../../models/user-files";

export enum FileManagerActionTypes {
    SAVE_FILES = '[FileManager] Save Files',
    SAVE_FILES_SUCCESS = '[FileManager] Save Files Success',
    SAVE_FILES_ERROR = '[FileManager] Save Files Error',
    LOAD_USER_FILES = '[FileManager] Load User Files',
    LOAD_USER_FILES_SUCCESS = '[FileManager] Load User Files Success',
    LOAD_USER_FILES_ERROR = '[FileManager] Load User Files Success',
}

export const saveFiles = createAction(
    FileManagerActionTypes.SAVE_FILES, props<{ files: UserFiles }>()
);

export const saveFilesSuccess = createAction(
    FileManagerActionTypes.SAVE_FILES_SUCCESS
);

export const saveFilesError= createAction(
    FileManagerActionTypes.SAVE_FILES_ERROR, props<{ error: string }>()
);

export const loadUserFiles = createAction(
    FileManagerActionTypes.LOAD_USER_FILES, props<{ userId: number }>()
);

export const loadUserFilesSuccess = createAction(
    FileManagerActionTypes.LOAD_USER_FILES_SUCCESS, props<{ files: UserFiles }>()
);

export const loadUserFilesError = createAction(
    FileManagerActionTypes.LOAD_USER_FILES_SUCCESS, props<{ error: string  }>()
);