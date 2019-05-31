import Game from '@/game';

describe('Game', () => {
  it('should not be running when started', () => {
    const game = new Game();

    expect(game.isRunning).toBe(false);
  });
});
