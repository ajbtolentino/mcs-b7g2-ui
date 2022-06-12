export interface IMenuItem {
    id: number;
    name: string;
    description: string;
    category: string;
    itemPrice: number;
    prepTimeInSec: number;
    cookTimeInSec: number;
    chefRecommendation: boolean;
}