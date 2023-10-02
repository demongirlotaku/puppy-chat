import { 
    Model, 
    DataTypes, 
    CreationOptional, 
    InferAttributes, 
    InferCreationAttributes, 
    HasManyHasAssociationsMixin, 
    HasManyGetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyCountAssociationsMixin,  
} from "sequelize";
import { psqlSequelize } from "@databases/postgres-db"
import ChatRoom from "./chatroom"
import Friend from "./friend";

/**
 * User model counter part in the relational database
 */
class RUser extends Model<InferAttributes<RUser>, InferCreationAttributes<RUser>> {
    declare uid: string
    declare email : string
    declare name: string
    declare avatar: string | undefined
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare getFriends: HasManyGetAssociationsMixin< Friend>
    declare removeFriends: HasManyRemoveAssociationMixin<Friend, number>
    declare hasFriends: HasManyHasAssociationsMixin<Friend, number>
    declare countFriends: HasManyCountAssociationsMixin
    declare getChatRooms: HasManyGetAssociationsMixin<ChatRoom>
    declare hasChatRooms: HasManyHasAssociationsMixin<ChatRoom, number>
}

RUser.init({
    uid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: (email: string) => {
            return email.substring(0, email.lastIndexOf('@'))
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    timestamps: true, 
    sequelize: psqlSequelize,
    paranoid: true,
    freezeTableName: true
})

RUser.belongsToMany(ChatRoom, {
    through: "RUser_ChatRoom"
})

RUser.hasMany(Friend, {
    constraints: false
})

export default RUser