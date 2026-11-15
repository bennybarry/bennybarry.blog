export const SITE_TITLE = "Benny Barry is blogging";
export const SITE_DESCRIPTION =
  "Screaming into the voide hoping it doesn't scream back.";

export interface ICategory {
  title: string;
  category: string;
  collection: string;
}

export const blog_categories: ICategory[] = [
  // {
  //   title: "Photography",
  //   category: "photograpy",
  //   collection: "photograpy",
  // },
  // {
  //   title: "Computers",
  //   category: "computers",
  //   collection: "computers",
  // },
  {
    title: "Random",
    category: "random",
    collection: "random",
  },
];
