import { IconNode } from 'lucide';
import { Image } from '@tarojs/components';
import React from 'react';
import { Base64 } from 'js-base64';
import Taro from '@tarojs/taro';

console.log(
  '>>>Taro.getSystemInfoSync().windowWidth',
  Taro.getSystemInfoSync().windowWidth,
);
// TODO memo
const rpx2px = (rpx: number) =>
  (Taro.getSystemInfoSync().windowWidth / 750) * rpx;

function svgPropToBase64(
  iconNode: IconNode,
  options: {
    width?: number;
    height?: number;
    color?: string;
    strokeWidth?: number;
  },
) {
  const {
    width = 24,
    height = 24,
    color = 'currentColor',
    strokeWidth = 2,
  } = options;

  // Convert SVG icon node to SVG string
  const svgString = iconNode
    .map(([tag, attrs]) => {
      const attrsString = Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${tag} ${attrsString}/>`;
    })
    .join('');

  // Wrap in SVG root element with proper attributes
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${svgString}</svg>`;

  // Convert to base64
  const base64 = Base64.encode(fullSvg);

  return `data:image/svg+xml;base64,${base64}`;
}

export const Icon = React.memo(
  (props: {
    className?: string;
    icon: IconNode;
    size?: number;
    color?: string;
    strokeWidth?: number;
  }) => {
    const { size = 24, color = 'currentColor', strokeWidth = 1 } = props;
    return (
      <Image
        style={{
          width: rpx2px(size),
          height: rpx2px(size),
        }}
        src={svgPropToBase64(props.icon, {
          width: rpx2px(size),
          height: rpx2px(size),
          color: color,
          strokeWidth: strokeWidth,
        })}
        className={props.className}
      />
    );
  },
);
