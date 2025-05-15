import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Board from "./board";
import BoardColumn from "./boardColumn";
import { AddTask } from "../dto/tasks.dto";

@Table({
  timestamps: true,
  tableName: "tasks",
  modelName: "Task",
})
class Task extends Model<Task,AddTask> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => BoardColumn)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  ColumnId!: string;

  @ForeignKey(() => Board)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  BoardId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  position!: number;

  @CreatedAt
  creationAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Board, {
    onDelete: "CASCADE",
  })
  board!: Board;

  @BelongsTo(() => BoardColumn, {
    onDelete: "CASCADE",
  })
  column!: Board;
}

export default Task;
