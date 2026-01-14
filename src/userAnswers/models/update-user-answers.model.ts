import { IPublic } from '../../common/utils/public.type';
import { UpdateUserAnswerRequestDto } from '../dtos/request/update-user-answers-request.dto';


export class UpdateAnswerModel {
    static fromDto(
        dto: UpdateUserAnswerRequestDto,
        id: string,
    ): IPublic<UpdateAnswerModel> {
        return {
            id,
            answer: dto.answer,
        };
    }

    id: string;
    answer?: string;
}
