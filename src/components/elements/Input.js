import style from "./Input.module.css";

const Input = (props) => {
  const { classType = "", className = "" } = props;

  const names = classType.split(" ");

  let finalClass = `${style.input} `;

  for (let i = 0; i < names.length; i++) {
    finalClass += `${style[names[i]]} `;
  }

  finalClass = (finalClass + className).trim();

  return (
    <input {...props} className={finalClass}>
      {props.children}
    </input>
  );
};

export default Input;
