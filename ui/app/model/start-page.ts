export enum StartType {
  NEW = 'NEW',
  JOIN = 'JOIN'
}

export const startButtonContent = new Map([
  [StartType.NEW, {
    text: 'START NEW GAME',
    class: 'bg-green-500 hover:bg-green-700',
    borderClass: 'border-green-700'
  }],
  [StartType.JOIN, {
    text: 'JOIN GAME',
    class: 'bg-gray-500 hover:bg-gray-700',
    borderClass: 'border-gray-700'
  }]
]);
