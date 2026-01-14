import { IPublic } from '../../common/utils/public.type';
import { CreateUserAnswerRequestDto } from '../dtos/request/create-user-answers-request.dto';


export class CreateAnswerModel {
    static fromDto(
        dto: CreateUserAnswerRequestDto,
    ): IPublic<CreateAnswerModel> {
        return {
            answer: dto.answer,
        };
    }

    answer: string;
}
