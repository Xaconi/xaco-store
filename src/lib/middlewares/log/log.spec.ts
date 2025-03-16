import { ACTION_TEXT, CURRENT_STATE_TEXT, NEXT_STATE_TEXT, PAYLOAD_TEXT, logMiddleware } from './log';

const CURRENT_STATE_VALUE = { count: 0 };
const NEXT_STATE_VALUE = { count: 1 };
const ACTION_VALUE = 'increment';
const PAYLOAD_VALUE = {
    message: 'Hello, world!',
    test: 'Test value'
};

describe('loggingMiddleware', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log the action and state', () => {
    logMiddleware(CURRENT_STATE_VALUE, NEXT_STATE_VALUE, ACTION_VALUE);

    const consoleCalls = consoleSpy.mock.calls as Array<Array<string>>;

    const currentStateLogText = consoleCalls[0][0];
    const currentStateLogValue = consoleCalls[0][1];
    
    const newStateLogText = consoleCalls[1][0];
    const newStateLogValue = consoleCalls[1][1];

    const actionLogText = consoleCalls[2][0];
    const actionLogValue = consoleCalls[2][1];

    expect(currentStateLogText).toBe(CURRENT_STATE_TEXT);
    expect(currentStateLogValue).toBe(CURRENT_STATE_VALUE);

    expect(newStateLogText).toBe(NEXT_STATE_TEXT);
    expect(newStateLogValue).toBe(NEXT_STATE_VALUE);

    expect(actionLogText).toBe(ACTION_TEXT);
    expect(actionLogValue).toBe(ACTION_VALUE);
  });

  it('should log the payload', () => {
    logMiddleware(CURRENT_STATE_VALUE, NEXT_STATE_VALUE, ACTION_VALUE, PAYLOAD_VALUE);

    const consoleCalls = consoleSpy.mock.calls as Array<Array<string>>;

    const payloadStateLogText = consoleCalls[3][0];
    const payloadStateLogValue = consoleCalls[3][1];

    expect(payloadStateLogText).toBe(PAYLOAD_TEXT);
    expect(payloadStateLogValue).toBe(PAYLOAD_VALUE);
  });
});