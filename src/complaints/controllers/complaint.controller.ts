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
    @ApiOperation({ summary: 'Submit a complaint, suggestion, or message' })
    @ApiResponse({ status: 201, type: CreateComplaintResponseDto })
    @CreateResourceCombinedDecorators({
        responseType: CreateComplaintResponseDto,
        additionalErrors: ['badRequest'],
        public: true,
    })
    async createComplaint(
        @Body() dto: CreateComplaintRequestDto,
    ): Promise<CreateComplaintResponseDto> {
        const model = CreateComplaintModel.fromDto(dto);
        const complaint = await this.complaintService.createComplaint(model);
        return CreateComplaintResponseDto.fromModel(complaint);
    }

    /** ✅ Get Complaint by ID */
    @ApiOperation({ summary: 'Get a complaint by ID' })
    @ApiResponse({ status: 200, type: ReadComplaintResponseDto })
    @ReadResourceCombinedDecorators({
        path: 'readById/:id',
        responseType: ReadComplaintResponseDto,
        additionalErrors: ['notFound'],
        public: true,
    })
    async getComplaintById(
        @Param('id') id: string,
    ): Promise<ReadComplaintResponseDto> {
        const complaint = await this.complaintService.getComplaintById(id);
        return ReadComplaintResponseDto.fromModel(complaint);
    }

    /** ✅ Get All Complaints */
    @ApiOperation({ summary: 'Get all complaints (Admin)' })
    @ApiResponse({ status: 200, type: [ReadComplaintResponseDto] })
    @ReadResourceCombinedDecorators({
        responseType: ReadComplaintResponseDto,
        public: true,
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
    @ApiOperation({ summary: 'Get all complaints submitted by the current authenticated user' })
    @ApiResponse({ status: 200, type: [ReadComplaintResponseDto] })
    @ReadResourceCombinedDecorators({
        path: 'my-complaints',
        responseType: ReadComplaintResponseDto,
        public: true,
    })
    async getMyComplaints(
        @UserIdToken() userIdToken: DecodedIdToken,
    ): Promise<ReadComplaintResponseDto[]> {
        const complaints = await this.complaintService.getComplaintsByUserId(userIdToken.uid);
        return ReadComplaintResponseDto.fromModels(complaints);
    }
}
