import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Unique,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column(DataType.STRING)
  picture!: string;

  @CreatedAt
  creationAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
export default User;
