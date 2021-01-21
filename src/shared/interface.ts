export interface IStateHomePage {
    cat: any;
    allCats?: Array<any[]>,
    loader: Boolean,
    error: boolean
}

export interface ICat {
    id: string
    name: string
    description: string
    origin: string
    temperament: string
    image: IImage
}

export interface IImage {
    id: string
    width: number
    height: number
    url: string
}