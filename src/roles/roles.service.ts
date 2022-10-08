import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRoles } from 'src/users/enums/user-roles.enum';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>
  ) { this.init() }

  async init() {
    const roleUser = await this.roleModel.findOne({ code: UserRoles.USER });
    const roleAdmin = await this.roleModel.findOne({ code: UserRoles.ADMIN });
    if (!roleUser) await this.roleModel.create({ code: UserRoles.USER, name: "user" });
    if (!roleAdmin) await this.roleModel.create({ code: UserRoles.ADMIN, name: "admin" });
  }

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleModel.create(createRoleDto);
  }

  async findAll(filter: any) {
    const data = await this.roleModel.find(filter);
    return data;
  }

  async findOneById(id: string) {
    return await this.roleModel.findOne({ _id: id });
  }

  async findByCode(code: string) {
    return await this.roleModel.findOne({ code });
  }

  async update(updateRoleDto: UpdateRoleDto) {
    return await this.roleModel.findByIdAndUpdate(updateRoleDto);
  }

  async remove(id: string) {
    return await this.roleModel.deleteOne({ _id: id });
  }
}
