export const suggestionCategories = [
  { name: "컴퓨터", href: "#" },
  { name: "모니터", href: "#" },
  { name: "키보드", href: "#" },
  { name: "마우스", href: "#" },
  { name: "스피커", href: "#" },
];
export const filters = [
  {
    id: "color",
    name: "색상",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "brands",
    name: "브랜드",
    options: [
      { value: "apple", label: "Apple", checked: false },
      { value: "samsung", label: "Samsung", checked: false },
      { value: "lg", label: "LG", checked: true },
      { value: "dell", label: "DELL", checked: false },
    ],
  },
  {
    id: "size",
    name: "사이즈",
    options: [
      { value: "xs", label: "XS", checked: false },
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: true },
    ],
  },
];
