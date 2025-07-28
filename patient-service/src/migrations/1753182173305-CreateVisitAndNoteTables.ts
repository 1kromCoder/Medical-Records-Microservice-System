import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateVisitTable1711234567899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. visit jadvalini yaratish
    await queryRunner.createTable(
      new Table({
        name: 'visit',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'visitDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'patientId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // 2. Foreign Key qo‘shish (visit -> patient)
    await queryRunner.createForeignKey(
      'visit',
      new TableForeignKey({
        columnNames: ['patientId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'patient',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Jadval mavjudligini tekshiramiz
    const table = await queryRunner.getTable('visit');
    if (table) {
      const foreignKey = table.foreignKeys.find((fk) =>
        fk.columnNames.includes('patientId'),
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('visit', foreignKey);
      }
    }

    await queryRunner.dropTable('visit');
  }
}
