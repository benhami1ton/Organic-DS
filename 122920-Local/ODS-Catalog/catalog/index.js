import React from "react";
import ReactDOM from "react-dom";
import { Catalog, pageLoader } from "catalog";

const pages = [
  {
    path: "/",
    title: "Welcome",
    content: pageLoader(() => import("./WELCOME.md"))
  },
  {
    title: "Design",
    path: "/design",
    pages: [
  {
    path: "/colors",
    title: "Colors",
    content: pageLoader(() => import("./colors.md"))
  },
  {
    path: "/typography",
    title: "Typography",
    content: pageLoader(() => import("./typography.md"))
  }]
},
{
  title: "Components",
  path: "/components",
  pages: [
{
  path: "/components/card",
  title: "Card",
  content: pageLoader(() => import("./card.md"))
},
{
  path: "/components/accordion",
  title: "Accordion",
  content: pageLoader(() => import("./accordion.md"))
}]
}
];

ReactDOM.render(
  <Catalog title="Catalog" pages={pages} />,
  document.getElementById("catalog")
);
