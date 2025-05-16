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
    HasMany,
} from "sequelize-typescript";
  import Board from "./board";
  import Task from "./task";
import { CreateColumn } from "../dto/boardColumns.dto";
  
@Table({
    timestamps: true,
    tableName: "board_columns",
    modelName: "BoardColumn",
  })
  class BoardColumn extends Model<BoardColumn,CreateColumn> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

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
      allowNull: false
    })
    position!:number;
    
    @Default(0)
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    totalTasks!:number

    @CreatedAt
    creationAt!: Date;
  
    @UpdatedAt
    updatedAt!: Date;
  
    @BelongsTo(() => Board, {
      onDelete: "CASCADE"
    })
    board!: Board;

    @HasMany(()=> Task)
    tasks!: Task;
  }
  
  export default BoardColumn;
  