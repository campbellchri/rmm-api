import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ComplaintService } from '../services/complaint.service';
import {
    CreateResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { UserIdToken } from 'src/common/decorators/user-id-token.decorator';
import { DecodedIdToken } from 'src/common/interfaces/decoded-id-token.interface';
import { CreateComplaintRequestDto } from '../dtos/request/create-complaint-request.dto';
import { CreateComplaintResponseDto } from '../dtos/response/create-complaint-response.dto';
import { ReadComplaintResponseDto } from '../dtos/response/read-complaint-response.dto';
import { CreateComplaintModel } from '../models/create-complaint-model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) {}

    /** ✅ Create Complaint */
    @Post()
    @ApiOperation({ summary: 'Submit a complaint, suggestion, or message' })
    @ApiResponse({ status: 201, type: CreateComplaintResponseDto })
    @CreateResourceCombinedDecorators({
        responseType: CreateComplaintResponseDto,
        additionalErrors: ['badRequest'],
    })
    async createComplaint(
        @Body() dto: CreateComplaintRequestDto,
        @UserIdToken() userIdToken?: DecodedIdToken,
    ): Promise<CreateComplaintResponseDto> {
        // If user is authenticated, link the complaint to their account
        const userId = userIdToken?.uid;
        const model = CreateComplaintModel.fromDto(dto, userId);
        const complaint = await this.complaintService.createComplaint(model);
        return CreateComplaintResponseDto.fromModel(complaint);
    }

    /** ✅ Get Complaint by ID */
    @Get('readById/:id')
    @ApiOperation({ summary: 'Get a complaint by ID' })
    @ApiResponse({ status: 200, type: ReadComplaintResponseDto })
    @ReadResourceCombinedDecorators({
        path: 'readById/:id',
        responseType: ReadComplaintResponseDto,
        additionalErrors: ['notFound'],
    })
    async getComplaintById(
        @Param('id') id: string,
    ): Promise<ReadComplaintResponseDto> {
        const complaint = await this.complaintService.getComplaintById(id);
        return ReadComplaintResponseDto.fromModel(complaint);
    }

    /** ✅ Get All Complaints */
    @Get()
    @ApiOperation({ summary: 'Get all complaints (Admin)' })
    @ApiResponse({ status: 200, type: [ReadComplaintResponseDto] })
    @ReadResourceCombinedDecorators({
        responseType: ReadComplaintResponseDto,
    })
    async getAllComplaints(
        @Query('type') messageType?: string,
        @Query('email') email?: string,
    ): Promise<ReadComplaintResponseDto[]> {
        let complaints;
        
        if (messageType) {
            complaints = await this.complaintService.getComplaintsByMessageType(messageType);
        } else if (email) {
            complaints = await this.complaintService.getComplaintsByEmail(email);
        } else {
            complaints = await this.complaintService.getAllComplaints();
        }
        
        return ReadComplaintResponseDto.fromModels(complaints);
    }

    /** ✅ Get My Complaints (Current User) */
    @Get('my-complaints')
    @ApiOperation({ summary: 'Get all complaints submitted by the current authenticated user' })
    @ApiResponse({ status: 200, type: [ReadComplaintResponseDto] })
    @ReadResourceCombinedDecorators({
        path: 'my-complaints',
        responseType: ReadComplaintResponseDto,
    })
    async getMyComplaints(
        @UserIdToken() userIdToken: DecodedIdToken,
    ): Promise<ReadComplaintResponseDto[]> {
        const complaints = await this.complaintService.getComplaintsByUserId(userIdToken.uid);
        return ReadComplaintResponseDto.fromModels(complaints);
    }
}
