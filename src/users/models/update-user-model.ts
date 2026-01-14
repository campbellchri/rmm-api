import { IPublic } from '../../common/utils/public.type';
import { UpdateUserRequestDto } from '../dtos/requests/update-user.request.dto';
import { USER_ROLES, UserRoles } from '../enums/user-roles.enum';

export class UpdateUserModel {
    static async fromDto(dto: UpdateUserRequestDto, uid: string): Promise<IPublic<UpdateUserModel>> {
        const rolesArray: UserRoles[] = Array.isArray(dto.roles)
            ? dto.roles.filter((role) => Object.values(USER_ROLES).includes(role))
            : [];

        return {
            id: uid,
            firstName: dto.firstName,
            lastName: dto.lastName,
            password: dto.password,
            phone: dto.phone,
            roles: rolesArray.length > 0 ? rolesArray : undefined,
            gender: dto.gender,
            callingCode: dto.callingCode,
            photoId: dto.photoId,
            photoURL: dto.photoURL,
            email: dto.email,
            country: dto.country,
            street1: dto.street1,
            street2: dto.street2,
            city: dto.city,
            state: dto.state,
            postal: dto.postal,
        };
    }

    id: string;

    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    roles?: UserRoles[];
    gender?: string;
    callingCode?: string;
    email?: string;
    photoId?: string;
    photoURL?: string;
    country?: string;
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    postal?: string;
}

