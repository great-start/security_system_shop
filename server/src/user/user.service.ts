import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SignUpUserDto } from '../auth/dto/signUp.user.dto';
import { IOrder } from './models/order.inteface';
import { IRequestExtended } from '../auth/models/requestExtended.interface';
import express from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async saveUserToDB(user: SignUpUserDto) {
    return this.prismaService.user.create({ data: user });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  public async createFromGoogle(email: string, name: string) {
    return this.prismaService.user.create({
      data: {
        email: email,
        firstName: name,
      },
    });
  }

  public async makeAnOrder(order: IOrder, req: IRequestExtended) {
    try {
      const { productsQuantity, products } = order;
      const user = req.user;

      const { id } = await this.prismaService.basket.create({
        data: {
          userId: user.id,
          status: 'ordered',
        },
      });

      for (const product in productsQuantity) {
        await this.prismaService.basket_item.create({
          data: {
            basketId: id,
            productId: product,
            quantity: productsQuantity[product],
          },
        });
      }

      return {
        message: 'Замовлення прийняте в обробку',
      };
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getOrders(req: IRequestExtended) {
    try {
      const { id } = req.user;

      let changedOrders = [];

      await this.prismaService.basket
        .findMany({
          where: {
            userId: id,
          },
          include: {
            Product: {
              select: {
                quantity: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    title: true,
                    price: true,
                  },
                },
              },
            },
          },
        })
        .then((orders) => {
          orders.forEach((element) => {
            const formattedDate = new Intl.DateTimeFormat('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(element.createdAt);
            element = Object.assign(element, { orderTime: formattedDate });
          });
          changedOrders = orders;
        });

      return changedOrders;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async canselOrder(id: number) {
    try {
      await this.prismaService.basket.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Order canceled',
      };
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getPersonalData(req: IRequestExtended, res: express.Response) {
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
            const personalFormattedUserData = this.formatData(data);

            res.status(HttpStatus.OK).json(personalFormattedUserData);
          });
      }, 1000);
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public formatData(user: Partial<User>): Partial<User> {
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

  public async changePersonalData(
    req: IRequestExtended,
    data: UpdateUserDto,
    res: express.Response,
  ) {
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

        const updatedUserWithFormatData = this.formatData(updatedUser);

        res.status(HttpStatus.OK).json(updatedUserWithFormatData);
      }, 1000);
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
