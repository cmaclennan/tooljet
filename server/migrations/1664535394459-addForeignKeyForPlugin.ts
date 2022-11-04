import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class addForeignKeyForPlugin1664535394459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dsTable = await queryRunner.getTable('data_sources');
    const dsForeignKey = dsTable.foreignKeys.find((fk) => fk.columnNames.indexOf('plugin_id') !== -1);
    await queryRunner.dropForeignKey('data_sources', dsForeignKey);

    await queryRunner.createForeignKey(
      'data_sources',
      new TableForeignKey({
        columnNames: ['plugin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plugins',
        onDelete: 'CASCADE',
      })
    );

    const dqTable = await queryRunner.getTable('data_queries');
    const daForeignKey = dqTable.foreignKeys.find((fk) => fk.columnNames.indexOf('plugin_id') !== -1);
    await queryRunner.dropForeignKey('data_queries', daForeignKey);

    await queryRunner.createForeignKey(
      'data_queries',
      new TableForeignKey({
        columnNames: ['plugin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plugins',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
