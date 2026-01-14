import { Injectable, InternalServerErrorException } from '@nestjs/common';
import cloudinary from 'src/common/providers/cloudinary/cloudinary-provider';


@Injectable()
export class UploadService {
    async uploadFile(
        file: Express.Multer.File,
        folder = 'user_media',
    ): Promise<{ url: string; publicId: string; resourceType: string }> {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                folder,
                resource_type: 'auto', // supports image, video, audio
            });

            return {
                url: result.secure_url,
                publicId: result.public_id,
                resourceType: result.resource_type,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                `Cloudinary upload failed: ${error.message}`,
            );
        }
    }
}
