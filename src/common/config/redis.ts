import { env } from '@/common/config/env'
import { createClient } from 'redis'


const { REDIS_URI } = env

export const redis = createClient({
    url: REDIS_URI
})