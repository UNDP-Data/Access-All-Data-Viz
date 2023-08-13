import {
  SDG1IconOnlySVG,
  SDG2IconOnlySVG,
  SDG3IconOnlySVG,
  SDG4IconOnlySVG,
  SDG5IconOnlySVG,
  SDG6IconOnlySVG,
  SDG7IconOnlySVG,
  SDG8IconOnlySVG,
  SDG9IconOnlySVG,
  SDG10IconOnlySVG,
  SDG11IconOnlySVG,
  SDG12IconOnlySVG,
  SDG13IconOnlySVG,
  SDG14IconOnlySVG,
  SDG15IconOnlySVG,
  SDG16IconOnlySVG,
  SDG17IconOnlySVG,
} from '../Icons';

export const getSDGIconSVG = (
  SDGGoal: string,
  size: number,
  bg?: boolean,
  fill?: string,
) => {
  switch (SDGGoal) {
    case 'SDG 1':
      return <SDG1IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 2':
      return <SDG2IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 3':
      return <SDG3IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 4':
      return <SDG4IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 5':
      return <SDG5IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 6':
      return <SDG6IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 7':
      return <SDG7IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 8':
      return <SDG8IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 9':
      return <SDG9IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 10':
      return <SDG10IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 11':
      return <SDG11IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 12':
      return <SDG12IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 13':
      return <SDG13IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 14':
      return <SDG14IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 15':
      return <SDG15IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 16':
      return <SDG16IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    case 'SDG 17':
      return <SDG17IconOnlySVG size={size} bg={bg || false} fill={fill} />;
    default:
      return null;
  }
};
