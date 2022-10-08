import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserRoles } from './enums/user-roles.enum';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private rolesService: RolesService,
  ) {}

  async findOne(filter: any) {
    return await this.userModel.findOne(filter).populate('roles');
  }

  async register(data: any) {
    const createDto = await this.setDefaultRole(data);
    await this.userModel.create(createDto);
  }

  async setDefaultRole(createUserDto: any) {
    const user: any = createUserDto;
    const role = await this.rolesService.findByCode(UserRoles.USER);
    user.roles = [role];
    return user;
  }

}
