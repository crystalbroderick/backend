// models/userToken.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserTokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: String,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
});

const UserToken = mongoose.model("userToken", UserTokenSchema);

export default UserToken;
