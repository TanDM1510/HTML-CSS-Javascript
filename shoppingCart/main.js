import { About } from "./src/pages/AboutPage";
import BillsPage from "./src/pages/BillsPage";
import CartPage from "./src/pages/CartPage";
import { HomePage } from "./src/pages/HomePage";
import "./style.css";

import Navigo from "navigo";

const router = new Navigo("/", { linkSelector: "a" });
const app = document.getElementById("app");

const notFoundPage = () => {
  return `<h1>Không tìm thấy đường dẫn</h1>`;
};
const render = (position, content) => {
  position.innerHTML = content();
};

router.on("/", () => render(app, HomePage));
router.on("/about", () => render(app, About));
router.on("/bills", () => render(app, BillsPage));
router.on("/cart", () => render(app, CartPage));
router.notFound(() => render(app, notFoundPage));
router.resolve();
