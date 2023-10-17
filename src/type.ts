// export type InputData = {
//   [key: string]: string;
// };


interface Item {
  [key: string]: string;
}
// interface Category {
//   [key: string]: string | Item[];
// }
export type InputData = Item[];
