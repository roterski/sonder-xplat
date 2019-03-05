import {MigrationInterface, QueryRunner} from "typeorm";

export class FixPoints1543006152974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "points" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "points" DROP DEFAULT`);
    }

}
