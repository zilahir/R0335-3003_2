import { User } from "../../store/actions/createNewUser";

const findUserByUserName = (users: User[], userName: string) => {
    return users.find(user => user.userName === userName);
}

const findUserById = (users: User[], userId: string) => {
    return users.find(user => user.userId === userId)
}

export {
    findUserByUserName,
    findUserById
}