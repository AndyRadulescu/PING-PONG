export enum StartType {
  NEW = 'NEW',
  JOIN = 'JOIN'
}

export const startButtonContent = new Map([
  [StartType.NEW, { text: 'START NEW GAME', class: 'border-green-700  bg-green-500 hover:bg-green-700'}],
  [StartType.JOIN, { text: 'JOIN GAME', class: 'border-gray-700  bg-gray-500 hover:bg-gray-700' }]
]);
