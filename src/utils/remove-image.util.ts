import { unlink } from 'fs';

export const removeImage = (path: string) => {
  if (path != '/users/default-profile-picture.png') {
    unlink(`public/${path}`, () => {});
  }
};
