import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IRequestExtended } from '../auth/models/requestExtended.interface';
import { User } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }
  //
  // findAll() {
  //   return `This action returns all admin`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} admin`;
  // }
  //
  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} admin`;
  // }

  async getPersonalData(req: IRequestExtended, res: Response): Promise<void> {
    try {
      const { id } = req.user;

      // ...imitating response delay
      setTimeout(async () => {
        await this.prismaService.user
          .findUnique({
            where: {
              id,
            },
            select: {
              firstName: true,
              lastName: true,
              createdAt: true,
              updatedAt: true,
              email: true,
            },
          })
          .then((data) => {
            const personalFormattedAdminData = this.formatData(data);

            res.status(HttpStatus.OK).json(personalFormattedAdminData);
          });
      }, 1000);
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  formatData(user: Partial<User>): Partial<User> {
    return Object.assign(user, {
      createdAt: new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(user.createdAt),
      updatedAt: new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(user.updatedAt),
    });
  }

  async changePersonalData(req: IRequestExtended, data: UpdateUserDto, res: e.Response) {
    try {
      const { id } = req.user;

      setTimeout(async () => {
        const updatedUser = await this.prismaService.user.update({
          where: {
            id,
          },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          select: {
            firstName: true,
            lastName: true,
            createdAt: true,
            updatedAt: true,
            email: true,
          },
        });
    } catch (e) {}
  }
}
