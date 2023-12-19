import { Router } from "express";
import * as auth from '../controllers/auth'
import * as events from '../controllers/events'

const router = Router()

router.post("/login", auth.login)

router.use(auth.validate)

router.get("/events", events.getAll)

export default router;