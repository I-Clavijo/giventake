import { FaCarOn } from "react-icons/fa6";
import { MdOutlinePets, MdSportsSoccer } from "react-icons/md";
import { BiSolidPackage } from "react-icons/bi";
import { MdHomeRepairService } from "react-icons/md";
import { FaCameraRetro } from "react-icons/fa";
import { LuPlane } from "react-icons/lu";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { TbBrandStackoverflow } from "react-icons/tb";



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
    // 'ROAD_ASSISTANCE': { name: 'Road Assistance', obj: Car, to: '/feed/road-assistance', icon: FaCarOn },
    'ALL_CATEGORIES': { name: 'All Categories', icon: TbBrandStackoverflow },
    'HOME_REPAIR': { name: 'Home Repair', obj: Home, icon: MdHomeRepairService },
    'MOVING': { name: 'Moving', obj: Moving, icon: BiSolidPackage },
    'PETS': { name: 'Pets', obj: Pets, icon: MdOutlinePets },
    'PHOTOGRAPHY': { name: 'Photography', obj: Photography, icon: FaCameraRetro },
    'SPORTS': { name: 'Sports', obj: Sports, icon: FaCarOn },
    'TRAVEL': { name: 'Travel', obj: Travel, icon: LuPlane },
    'ELDERLY_CARE': { name: 'Elderly Care', obj: Elderly, icon: MdOutlineFamilyRestroom }
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

export const RADIUS_LIST = [3, 10, 30, 60, 100];
