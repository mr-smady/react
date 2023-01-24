import { Cubit } from "blac";

class User {
    id: number
    username: string
    name: string
    email: string
}

export default class UsersCubit extends Cubit<any>{

    constructor() {
        super([])
        fetch('http://localhost:8080/users')
            .then(res => res.json())
            .then(json => this.emit(json))
    }

    public readonly createUser = (user: User,
        success: Function = () => { },
        fail: Function = () => { }): void => {
        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(json => {
            if (json.message) {
                fail(json.message)
            } else {
                success()
                this.emit([...this.state, json])
            }
        })
    }

    public readonly editUser = (user: User,
        success: Function = () => { },
        fail: Function = () => { }): void => {
        fetch('http://localhost:8080/users', {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(json => {
                if (json.message) {
                    fail(json.message)
                } else {
                    success()
                    const users = [...this.state]
                    const userIndex = users.findIndex(u => u.id === user.id)
                    users[userIndex] = json//or user
                    this.emit(users)
                }
            })
    }


    public readonly deleteUser = (userId: number, success: Function = () => { },
        fail: Function = () => { }): void => {
        fetch(`http://localhost:8080/users/${userId}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(json => {
                if (json.message) {
                    fail(json.message)
                } else {
                    success()
                    this.emit([...this.state.filter(u => u.id !== userId)])
                }
            })
    }

}
