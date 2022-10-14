import style from "./DynamicList.module.css";

const DynamicList = (props) => {
  const [count, setCount] = 1;

  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  let content = [];

  for (let i = 0; i < count; i++) {
    const current = { ...children[0] };

    current.index = i;
    content.push(current);
  }

  return <div>{content}</div>;
};

export default DynamicList;
