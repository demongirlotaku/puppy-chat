import { 
    Model, 
    DataTypes, 
    CreationOptional, 
    InferAttributes, 
    InferCreationAttributes, 
    ForeignKey,
    HasOneGetAssociationMixin
} from "sequelize";
import { psqlSequelize } from "@databases/postgres-db"
import RUser from "./ruser";


 class Friend extends Model<InferAttributes<Friend>, InferCreationAttributes<Friend>> {
    declare userId: ForeignKey<RUser["uid"]>
    declare friendId: ForeignKey<RUser["uid"]>
    declare createdAt: CreationOptional<Date>

    declare getUser: HasOneGetAssociationMixin<RUser>
}

Friend.init({
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    friendId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            isSameUser(value: string)  {
                if (value === this.userId) {
                    throw Error("Same User")
                }
            }
        }
    },
    createdAt: DataTypes.DATE
}, {
    timestamps: true,
    sequelize: psqlSequelize,
    modelName: "Friend",
    tableName: "Friend"
})


export default Friend