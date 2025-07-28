import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePatientTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create `patient` table
    await queryRunner.createTable(
      new Table({
        name: 'patient',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dob',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'doctorId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    // 2. Add foreign key to doctor table
    await queryRunner.createForeignKey(
      'patient',
      new TableForeignKey({
        columnNames: ['doctorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctor',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Jadvalni olishga harakat qilamiz
    const table = await queryRunner.getTable('patient');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('doctorId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('patient', foreignKey);
      }

      // 2. Jadvalni o‘chiramiz
      await queryRunner.dropTable('patient');
    }
  }
}
