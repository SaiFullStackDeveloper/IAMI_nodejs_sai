import { Stripe } from 'stripe'
import { env } from '@/common/config/env'

const { STRIPE_SECRET_KEY } = env

export const stripe = new Stripe(STRIPE_SECRET_KEY)