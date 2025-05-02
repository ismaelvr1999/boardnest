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
import User from "./user";
import BoardColumn from "./boardColumn";

@Table({
  timestamps: true,
  tableName: "boards",
  modelName: "Board",
})
class Board extends Model<Board> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  UserId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalColumns!: number;

  @CreatedAt
  creationAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => User, {
    onDelete: "CASCADE"
  })
  user!: User;

  @HasMany(()=> BoardColumn)
  boardColumns!: BoardColumn
}

export default Board;
