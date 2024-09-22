import { guestInstance, authInstance } from './index'

export const getAllFeedback = async () => {
    const { data } = await guestInstance.get('feedback/getall')
    return data
}

export const getOneFeedback = async (id) => {
    const { data } = await authInstance.get(`feedback/getone/${id}`)
    return data
}

export const createFeedback = async (feedback) => {
    const { data } = await authInstance.post('feedback/createFeedback', feedback)
    return data
}

export const createNoteAdmin = async (id, feedback) => {
    const { data } = await authInstance.put(`feedback/createNoteAdmin/${id}`, feedback)
    return data
}

