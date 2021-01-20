export interface IReducer {
    initialState: IInitialState
    action: any
}

export interface IInitialState {
    cats: Array<any[]>
    singleBreed: any
    singleCat: any
}


export interface IAction {
    type: string,
    payload: any
}