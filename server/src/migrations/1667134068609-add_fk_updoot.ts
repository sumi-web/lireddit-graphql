import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFkUpdoot1667134068609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "updoot" ADD CONSTRAINT "user_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );

    await queryRunner.query(
      `ALTER TABLE "updoot" ADD CONSTRAINT "post_fk" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
