export const styleGroup = (initial, body, end, styler) => {
  let finalClass = `${initial} `;

  const classNames = body.split(" ");

  for (let i = 0; i < classNames.length; i++) {
    finalClass += `${styler[classNames[i]]} `;
  }

  finalClass += ` ${end}`.trim();
  return finalClass;
};
