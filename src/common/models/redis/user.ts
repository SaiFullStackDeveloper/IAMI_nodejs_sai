import { Schema, Repository, Entity } from 'redis-om'
import { redis } from '@/common/config/redis'
import { UserSessionTypes, UserSignupTypes, UserTypes } from '@/common/types/user'

const userSignUpSchema = new Schema(
    'Signup',
    {
        "email": {
            type: 'string',
        },
        "name": {
            type: 'string',
        },
        "phone": {
            type: 'string',
        },
        "role": {
            type: 'string',
        },
        "password": {
            type: 'string',
        },
        "address": {
            type: 'string',
        },
        "ABN": {
            type: 'string',
        },
        "token": {
            type: 'string',
        }
    },
    {
        dataStructure: 'JSON',
    }
)

const userSessionSchema = new Schema(
    'Session',
    {
        "_id": {
            type: 'string',
        },
        "userId": {
            type: 'string',
        },
        "email": {
            type: 'string',
        },
        "name": {
            type: 'string',
        },
        "phone": {
            type: 'string',
        },
        "role": {
            type: 'string',
        },
        "address": {
            type: 'string',
        },
        "ABN": {
            type: 'string',
        },
        "isEmailVerified": {
            type: 'boolean'
        },
        "isUserVerified": {
            type: 'boolean'
        },
        "createdAt": {
            type: 'date'
        },
        "accessToken": {
            type: 'string',
        },
        "expiresIn": {
            type: 'string',
        },
        "refreshToken": {
            type: 'string',
        },
    },
    {
        dataStructure: 'JSON',
    }
)



export const userSignupRedisRepository = new Repository<UserSignupTypes & Entity>(userSignUpSchema, redis)
export const userSessionRedisRepository = new Repository<UserSessionTypes & Entity>(userSessionSchema, redis)