import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('/get-all')
  findAll(@Query() filter: any) {
    return this.rolesService.findAll(filter);
  }

  @Get('/get-one/:id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOneById(id);
  }

  @Put('/update')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
