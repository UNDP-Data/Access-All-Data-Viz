import UNDPColorModule from 'undp-viz-colors';

export const DEFAULT_IMAGE =
  'https://signals.data.undp.org/UNDP-hero-image.jpg';

export const SIGNAL_API_LINK =
  'https://signals-and-trends-api.azurewebsites.net/v1/';

export const SIGNAL_ACCESS_CODE = '1efbc9d89db9054b686589c75a571fd5';

export const SSCOLOR = [
  {
    value: 'Poverty and Inequality',
    textColor: UNDPColorModule.sdgColors.sdg1,
  },
  {
    value: 'Governance',
    textColor: UNDPColorModule.sdgColors.sdg16,
  },
  {
    value: 'Resilience',
    textColor: UNDPColorModule.sdgColors.sdg16,
  },
  {
    value: 'Environment',
    textColor: UNDPColorModule.sdgColors.sdg14,
  },
  {
    value: 'Energy',
    textColor: UNDPColorModule.sdgColors.sdg7,
  },
  {
    value: 'Gender Equality',
    textColor: UNDPColorModule.sdgColors.sdg5,
  },
  {
    value: 'Strategic Innovation',
    textColor: UNDPColorModule.categoricalColors.colors[0],
  },
  {
    value: 'Digitalisation',
    textColor: UNDPColorModule.categoricalColors.colors[1],
  },
  {
    value: 'Development Financing',
    textColor: UNDPColorModule.categoricalColors.colors[2],
  },
  {
    value: 'Others',
    textColor: '#000000',
  },
];

export const HORIZONTYPE = {
  '2021-2022': 'Short Term',
  '2022-2023': 'Short Term',
  '2023-2025': 'Medium Term',
  '2024-2025': 'Medium Term',
  '2026-2030': 'Long Term',
};
