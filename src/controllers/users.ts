import { NextFunction, Request, Response } from 'express'
import userQueries from 'services/users.js'

const getSingleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = parseInt(req.params.id)
        const [results] = await userQueries.getSingle(userId)
        res.status(200).json(results)
        next()
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getMultipleUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const filters = req.query
        const results = await userQueries.getMultiple(filters)
        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const postUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body
        const results = await userQueries.post(payload)

        results[0].affectedRows &&
            results[0].insertId &&
            res.status(200).json({ message: 'users successfully created' })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const putUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body
        const userId = parseInt(req.params.id)
        await userQueries.put(payload, userId)
        res.status(200).json({ message: 'user successfully updated' })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const deleteSingleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = parseInt(req.params.id)
        await userQueries.deleteSingle(userId)
        res.status(200).json({ message: 'user successfully deleted' })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const deleteMultipleUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const filters = req.query
        await userQueries.deleteMultiple(filters)
        res.status(200).json({ message: 'users successfully deleted' })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export default {
    getSingleUser,
    getMultipleUsers,
    postUsers,
    putUsers,
    deleteSingleUser,
    deleteMultipleUsers,
}
