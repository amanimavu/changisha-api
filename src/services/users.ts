import { and, eq, sql } from 'drizzle-orm'
import { users } from 'models/drizzle/schema.js'
type NewUser = typeof users.$inferInsert
import { db } from 'services/db-connection.js'

const isUserValid = ({
    user,
    verb = 'post',
}: {
    user: any
    verb?: 'post' | 'put'
}) => {
    if (
        !user ||
        typeof user === 'number' ||
        typeof user === 'string' ||
        typeof user === 'boolean'
    ) {
        return false
    }
    const keys = Object.keys(user)
    if (keys.length < 5 || keys.length > 6) {
        return false
    }
    const refArray = [
        'firstName',
        'lastName',
        'userName',
        'password',
        'address',
        'email',
        ...(verb === 'put' ? ['address'] : []),
    ]
    for (const x of keys) {
        if (!refArray.includes(x)) {
            return false
        }
    }
    return true
}

const hasValidUserAttributes = (user: any) => {
    if (
        !user ||
        typeof user === 'number' ||
        typeof user === 'string' ||
        typeof user === 'boolean'
    ) {
        return false
    }
    const keys = Object.keys(user)
    const refArray = [
        'firstName',
        'lastName',
        'userName',
        'password',
        'address',
        'email',
    ]
    for (const x of keys) {
        if (!refArray.includes(x)) {
            return false
        }
    }
    return true
}

const getSingle = async (userId: number) => {
    return db.select().from(users).where(eq(users.id, userId))
}

const getMultiple = async (filters: {
    search?: undefined | string
    address?: undefined | string
}) => {
    const search = filters?.search && `${filters.search}%`
    const address = filters?.address

    const filterWithSearchterm = (search: string | undefined) =>
        search ? sql`${users.firstName} LIKE ${search}` : undefined
    const filterWithAddress = (address: string | undefined) =>
        address ? eq(users.address, address) : undefined

    return db
        .select()
        .from(users)
        .where(
            search && address
                ? and(filterWithAddress(address), filterWithSearchterm(search))
                : filterWithAddress(address) || filterWithSearchterm(search)
        )
}

const post = async (payload: any) => {
    if (Array.isArray(payload)) {
        for (const x of payload) {
            if (!isUserValid({ user: x })) {
                throw new Error('Provide valid users')
            }
        }
        const newUsers: NewUser[] = payload
        return db.insert(users).values(newUsers)
    } else {
        throw new Error('Provide a valid body')
    }
}

const put = async (payload: any, userId: number) => {
    if (Array.isArray(payload)) {
        if (payload.length === 1) {
            if (isUserValid({ user: payload[0], verb: 'put' })) {
                const [updatedUser]: NewUser[] = payload
                return db
                    .update(users)
                    .set(updatedUser)
                    .where(eq(users.id, userId))
            } else {
                throw new Error('Provide a valid user')
            }
        } else {
            throw new Error("'Provide a valid body")
        }
    } else {
        throw new Error('Provide a valid body')
    }
}

const deleteSingle = async (userId: number) => {
    return db.delete(users).where(eq(users.id, userId))
}

const deleteMultiple = async (filters: { address?: undefined | string }) => {
    const address = filters?.address
    return db
        .delete(users)
        .where(address ? eq(users.address, address) : undefined)
}

export default {
    getSingle,
    getMultiple,
    post,
    put,
    deleteSingle,
    deleteMultiple,
}
