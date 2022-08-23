import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SignUpUserDto } from '../auth/dto/signUp.user.dto';
import { IOrder } from './models/order.inteface';
import { GoogleAuthProfileDto } from '../auth/dto/google.auth.profile.dto';
import { IRequestExtended } from '../auth/models/requestExtended.interface';
import e from 'express';

export { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // async findAll() {
  //   return this.prismaService.user.findMany();
  // }

  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async saveUserToDB(user: SignUpUserDto) {
    return this.prismaService.user.create({ data: user });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async createFromGoogle(user: GoogleAuthProfileDto) {
    return this.prismaService.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
      },
    });
  }

  async makeAnOrder(order: IOrder, req: IRequestExtended) {
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

  async getOrders(req: IRequestExtended) {
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

  async canselOrder(id: number) {
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

  async getPersonalData(req: IRequestExtended, res: e.Response) {
    try {
      const { id } = req.user;

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
              email: true,
            },
          })
          .then((data) => {
            Object.assign(data, {
              createdAt: new Intl.DateTimeFormat('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(data.createdAt),
            });

            res.status(HttpStatus.OK).json(data);
          });
      }, 1000);
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  changePersonalData(req: IRequestExtended, res: e.Response) {
    
  }
}
