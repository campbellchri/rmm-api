import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class AddPageURLAndQRCodeTable1759200000000 implements MigrationInterface {
    name = 'AddPageURLAndQRCodeTable1759200000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add pageURL column to memorials table
        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'pageURL',
                type: 'varchar',
                isNullable: true,
            }),
        );

        // Create memorial_qr_codes table
        await queryRunner.createTable(
            new Table({
                name: 'memorial_qr_codes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'memorialId',
                        type: 'uuid',
                    },
                    {
                        name: 'qrCodeData',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'qrCodeImageURL',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'qrCodeImageId',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['memorialId'],
                        referencedTableName: 'memorials',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop memorial_qr_codes table
        await queryRunner.dropTable('memorial_qr_codes');

        // Remove pageURL column from memorials
        await queryRunner.dropColumn('memorials', 'pageURL');
    }
}
