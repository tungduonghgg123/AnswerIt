Answer = {
    owner: Address.required(),
    id: Number.required(),
    value: String.required(),
    images: [],
    comments: [],
    version: [],
    timestamp: Date.required(),
    isBestAnswer: Boolean,
}
Question = {
    owner: Address.required(),
    id: Number.required(),
    value: String.required(),
    images: [],
    comments: [],
    version: [],
    timestamp: Date.required(),
    reward: Number.min(0),
    sponsor: Address,
    expireTime: Date,
    gaveReward: Boolean,
    resolved: Boolean,
}
User = {
    address: Address.required(),
    isAdmin: Boolean,
    reputation: Number.min(1).required(),
    avatar: Image,
    userName: String.required(),
    firstName: String.required(),
    lastName: String.required(),
    notifications: [],
}