import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

export enum FileManagerActionTypes {
    SAVE_FILES = '[FileManager] Save Files',
    SAVE_FILES_SUCCESS = '[FileManager] Save Files Success',
    SAVE_FILES_ERROR = '[FileManager] Save Files Error',
}

export const saveFiles = createAction(
    FileManagerActionTypes.SAVE_FILES, props<{ user: User }>()
);

export const saveFilesSuccess = createAction(
    FileManagerActionTypes.SAVE_FILES_SUCCESS
);

export const saveFilesError= createAction(
    FileManagerActionTypes.SAVE_FILES_ERROR, props<{ error: string }>()
);