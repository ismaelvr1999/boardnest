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
  
@Table({
    timestamps: true,
    tableName: "board_columns",
    modelName: "BoardColumn",
  })
  class BoardColumn extends Model<BoardColumn> {
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
    index!:number // TODO: change this to whatever because it's a mariadb's reserved word 
    
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
  }
  
  export default BoardColumn;
  