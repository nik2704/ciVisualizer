import React from 'react';

/**
* Компонент загружает SVG асинхронно и один из способов обеспечить корректность снимка - mock.
* описание подхода - https://github.com/gilbarbara/react-inlinesvg/issues/145#issuecomment-623453339
* @returns {svg}
*/
export default function ReactInlineSVG({ src }) {
  return <svg id={src} />;
}
