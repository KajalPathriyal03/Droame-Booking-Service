import { Router } from "express"
import {
  addCustomer,
  editCustomer,
  getCustomerDetails,
} from "../controllers/customerControllers.js"
const router = Router()

router.route("/").post(addCustomer)
router.route("/:email").get(getCustomerDetails).put(editCustomer)

export default router
