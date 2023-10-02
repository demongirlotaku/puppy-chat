import { 
    Model, 
    DataTypes, 
    CreationOptional, 
    InferAttributes, 
    InferCreationAttributes, 
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin
} from "sequelize";
import { psqlSequelize } from "@databases/postgres-db"
import { UUIDV4 } from "sequelize";
import RUser from "./ruser";

/**
 * CHATROOM MODEL
 */
class ChatRoom extends Model<
    InferAttributes<ChatRoom>,
    InferCreationAttributes<ChatRoom>
> {
    declare id: string
    declare name: string | undefined
    declare createdAt: CreationOptional<Date>

    declare getRUsers: HasManyGetAssociationsMixin<RUser>
    declare hasRUsers: HasManyHasAssociationMixin<RUser, number>
}

ChatRoom.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
}, {   
    timestamps: true,
    sequelize: psqlSequelize,
    paranoid: true,
    freezeTableName:true
})

ChatRoom.belongsToMany(RUser, {
    through: "RUser_ChatRoom"
})

export default ChatRoom