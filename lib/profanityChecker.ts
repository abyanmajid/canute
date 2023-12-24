"use server"

import words from 'profane-words'

export async function isProfane(str: string) {
    const isProfane = words.includes(str.toLowerCase())
    return isProfane
}