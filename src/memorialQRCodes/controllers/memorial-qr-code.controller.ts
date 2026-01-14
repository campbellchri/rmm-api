import { Body, Controller, Param } from '@nestjs/common';
import { MemorialQRCodeService } from '../services/memorial-qr-code.service';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateMemorialQRCodeRequestDto } from '../dtos/request/create-memorial-qr-code-request.dto';
import { UpdateMemorialQRCodeRequestDto } from '../dtos/request/update-memorial-qr-code-request.dto';
import { CreateMemorialQRCodeResponseDto } from '../dtos/response/create-memorial-qr-code-response.dto';
import { UpdateMemorialQRCodeResponseDto } from '../dtos/response/update-memorial-qr-code-response.dto';
import { ReadMemorialQRCodeResponseDto } from '../dtos/response/read-memorial-qr-code-response.dto';
import { CreateMemorialQRCodeModel } from '../models/create-memorial-qr-code-model';
import { UpdateMemorialQRCodeModel } from '../models/update-memorial-qr-code-model';

@Controller('memorial-qr-codes')
export class MemorialQRCodeController {
    constructor(private readonly memorialQRCodeService: MemorialQRCodeService) {}

    /** ✅ Create QR Code */
    @CreateResourceCombinedDecorators({
        responseType: CreateMemorialQRCodeResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
        public:true
    })
    async createQRCode(
        @Body() dto: CreateMemorialQRCodeRequestDto,
    ): Promise<CreateMemorialQRCodeResponseDto> {
        const model = CreateMemorialQRCodeModel.fromDto(dto);
        const qrCode = await this.memorialQRCodeService.createQRCode(model);
        return CreateMemorialQRCodeResponseDto.fromModel(qrCode);
    }

    /** ✅ Get QR Code by ID */
    @ReadResourceCombinedDecorators({
        path: '/readById/:id',
        responseType: ReadMemorialQRCodeResponseDto,
        additionalErrors: ['notFound'],
        public:true
    })
    async getQRCodeById(
        @Param('id') id: string,
    ): Promise<ReadMemorialQRCodeResponseDto> {
        const qrCode = await this.memorialQRCodeService.getQRCodeById(id);
        return ReadMemorialQRCodeResponseDto.fromModel(qrCode);
    }

    /** ✅ Get QR Code by Memorial ID */
    @ReadResourceCombinedDecorators({
        path: '/memorial/:memorialId',
        responseType: ReadMemorialQRCodeResponseDto,
        additionalErrors: ['notFound'],
        public:true
    })
    async getQRCodeByMemorialId(
        @Param('memorialId') memorialId: string,
    ): Promise<ReadMemorialQRCodeResponseDto | null> {
        const qrCode = await this.memorialQRCodeService.getQRCodeByMemorialId(memorialId);
        return qrCode ? ReadMemorialQRCodeResponseDto.fromModel(qrCode) : null;
    }

    /** ✅ Update QR Code */
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateMemorialQRCodeResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
        public:true
    })
    async updateQRCode(
        @Param('id') id: string,
        @Body() dto: UpdateMemorialQRCodeRequestDto,
    ): Promise<UpdateMemorialQRCodeResponseDto> {
        const model = UpdateMemorialQRCodeModel.fromDto(dto, id);
        const qrCode = await this.memorialQRCodeService.updateQRCode(model);
        return UpdateMemorialQRCodeResponseDto.fromModel(qrCode);
    }

    /** ✅ Delete QR Code */
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: ReadMemorialQRCodeResponseDto,
        additionalErrors: ['notFound', 'conflict'],
        public:true
    })
    async deleteQRCode(@Param('id') id: string): Promise<{ id: string }> {
        return await this.memorialQRCodeService.deleteQRCode(id);
    }
}
