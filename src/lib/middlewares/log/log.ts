export const CURRENT_STATE_TEXT = 'Current state:';
export const NEXT_STATE_TEXT = 'Next state:';
export const ACTION_TEXT = 'Action:';
export const PAYLOAD_TEXT = 'Payload:';

export function logMiddleware<T>(currentState: T, nextState: T, action: string, payload?: any): void {
    console.log(CURRENT_STATE_TEXT, currentState);
    console.log(NEXT_STATE_TEXT, nextState);
    console.log(ACTION_TEXT, action);
    if(payload) console.log(PAYLOAD_TEXT, payload);
}