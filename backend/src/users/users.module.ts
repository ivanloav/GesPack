import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersController } from './users.controller'; // Importamos el controlador

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Importa la entidad User directamente
  ],
  controllers: [UsersController], // Añadimos el controlador aquí
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
