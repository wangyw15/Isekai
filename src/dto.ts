export interface Item {
  name: string,
  point: number,
  description: string,
  imgdata: string
}

export interface Catalog {
  title: string,
  description: string,
  choices: Item[]
}