import { extname } from 'path';
import { constants } from '../constants';
import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const MulterFileOptions = {
  storage: diskStorage({
    destination: './src/images',
    filename: (req, file: Express.Multer.File, cb) => {
      const randomName = uuidv4() + extname(file.originalname);
      return cb(null, randomName);

      // const randomName = Array(32)
      //   .fill(null)
      //   .map(() => Math.round(Math.random() * 16).toString(16))
      //   .join('');
      // return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const { mimetype, size } = file;

    if (!constants.IMAGE_MIMETYPES.includes(mimetype)) {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
      return;
    }

    if (size > constants.IMAGE_MAX_SIZE) {
      cb(new HttpException(`Too big file size`, HttpStatus.BAD_REQUEST), false);
      return;
    }

    cb(null, true);

    // if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    //   cb(null, true);
    // } else {
    //   cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    // }
  },
};
