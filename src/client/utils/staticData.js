
import Car from '../assets/images/categories_grid/car.jpg';
import Elderly from '../assets/images/categories_grid/elderly.jpg';
import Home from '../assets/images/categories_grid/home_fix.jpg';
import Moving from '../assets/images/categories_grid/moving.jpg';
import Pets from '../assets/images/categories_grid/pets.jpg';
import Photography from '../assets/images/categories_grid/photography.jpg';
import Sports from '../assets/images/categories_grid/sports.jpg';
import Travel from '../assets/images/categories_grid/travel.jpg';

// I am just a lazy person and need to get this data from server.
export const CATEGORIES = {
    'ROAD_ASSISTANCE': { name: 'Road Assistance', obj: Car, to: '/feed/road-assistance' },
    'HOME_REPAIR': { name: 'Home Repair', obj: Home, to: '/feed/home-repair' },
    'MOVING': { name: 'Moving', obj: Moving, to: '/feed/moving' },
    'PETS': { name: 'Pets', obj: Pets, to: '/feed/pets' },
    'PHOTOGRAPHY': { name: 'Photography', obj: Photography, to: '/feed/photography' },
    'SPORTS': { name: 'Sports', obj: Sports, to: '/feed/sports' },
    'TRAVEL': { name: 'Travel', obj: Travel, to: '/feed/travel' },
    'ELDERLY_CARE': { name: 'Elderly Care', obj: Elderly, to: '/feed/elderly-care' }
}

// I am just a lazy person and need to get this data from server.
export const REPORTS_REASONS = {
    SPAM: 'Spam',
    INAPPROPRIATE_CONTENT: 'Inappropriate content',
    OFFENSIVE_LANGUAGE: 'Offensive language',
    COPYRIGHT_VIOLATION: 'Copyright violation',
    FALSE_INFORMATION: 'False information',
    PERSONAL_ATTACK: 'Personal attack',
    OTHER: 'Other reason (please specify)'
};