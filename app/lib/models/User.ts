import { MongoGenericModel } from '@/types/mongodb'
import { model, Schema, models } from 'mongoose'

// Create Schema
const UserSchema = new Schema({
  // AUTH
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  name: { type: String },
  surname: { type: String },
  phone: { type: String },
  pwdResetToken: { type: String },
  pwdResetExpiration: { type: Number },
  portfolio: { type: Array },
  // UTIL DATA
  trackedGeckoCoins: { type: [String] },
  // DATE
  date: { type: Date, default: Date.now },
})

const User =
  (models.users as MongoGenericModel<typeof UserSchema>) ||
  model('users', UserSchema)

export default User
