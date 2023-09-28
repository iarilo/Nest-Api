import { TopLevelCategory } from "src/top-page/top-page.model/top-page.model";

//map  для того что-бы подставлять в нухный URL, нужную категорию

//Функция Record принимает два джинерика, 
// ключь enum из TopLevelCategory а, значение будит роут 
type routeMapTypes = Record<TopLevelCategory,string>
export const CATEGORY_URL:routeMapTypes  = {
    0: '/Courses',
    1: '/Service',
    2: '/Boocs',
    3: '/Products',
    4: '/addition'
}
  