import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerConfig = {
  storage: diskStorage({
    destination: './public/users/profile-picture',
    filename: (req, file, cb) => {
      const requiredProps = [
        'name',
        'cpf',
        'birthday',
        'cep',
        'estado',
        'numero',
        'cidade',
        'bairro',
        'logradouro',
        'phone',
        'email',
        'password',
      ];

      if (requiredProps.some((prop) => !req.body[prop])) {
        return cb(
          new BadRequestException([
            '[Multer] Required data: ' + requiredProps.join(', '),
          ]),
          null,
        );
      }

      const fileName = `profile-picture-${uuidv4()}`;

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
