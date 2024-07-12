import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import EngineeringIcon from '@mui/icons-material/Engineering';
const routes = [
  {
    path: "/",
    content: "Category",
    icon: <CategoryIcon />,
  },
  {
    path: "/products",
    content: "Products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    path: "/workers",
    content: "Workers",
    icon: <EngineeringIcon />,
  },
];

export default routes;
