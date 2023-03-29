import mongoose from "mongoose"

const bookingSchema = mongoose.Schema(
  {
    location_id: { type: String, required: true },
    drone_shot_id: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
)

const CustomerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bookings: [bookingSchema],
    registeredNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Customer = mongoose.model("Customer", CustomerSchema)

export default Customer
