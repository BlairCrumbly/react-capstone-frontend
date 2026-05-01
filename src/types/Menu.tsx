
 export interface MenuItem{
    id: number
    name: string
    description: string
    price: number
    category?: 'ENTREE' | 'SIDE' | 'DESSERT'
    imageUrl?: string
}