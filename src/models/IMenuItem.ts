export interface IMenuItem {
    id: number;
    name: string;
    description: string;
    category: number;
    itemPrice: number;
    prepTimeInSec: number;
    cookTimeInSec: number;
    chefRecommendation: boolean;
}