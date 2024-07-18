import { UserDto } from '../user.dto';

export const validateProfileTypeAndPicture = (
  newUser: UserDto,
  photo: Express.Multer.File,
) => {
  if (!newUser.profileType) newUser.profileType = 'ALUNO';

  if (!photo) {
    newUser.profilePicture = {
      name: `default-picture-${newUser.name}`,
      path: '/users/default-profile-picture.png',
    };
  } else {
    newUser.profilePicture = {
      name: photo.filename,
      path: photo.path.replace('public/', ''),
    };
  }

  return {
    profileType: newUser.profileType,
    profilePicture: newUser.profilePicture,
  };
};
