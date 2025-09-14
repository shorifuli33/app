import { store } from '../redux/store';
import { 
  setConnectionStatus, 
  updateActiveCalls, 
  addPendingMessage, 
  clearPendingMessages 
} from '../redux/slices/webSocketSlice';
import { CallNotification, WebSocketConfig } from '../types/meeting.types';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { sanitizeUserId } from '../common/utility/sanitizeUserId';

export class WebSocketService {
    private static instance: WebSocketService;
    private readonly client: Client;
    private readonly subscriptions: Map<string, StompSubscription>;
    private readonly prefix = "DEBUG:=> ";
    private pendingSubscriptions: Set<string>;
    private userId: string;

    private constructor(config: WebSocketConfig) {
        this.userId = sanitizeUserId(config.userId);
        this.subscriptions = new Map();
        this.pendingSubscriptions = new Set();
        
        this.client = new Client({
            webSocketFactory: (): WebSocket => new SockJS(`${config.url}/?userId=${this.userId}`),
            reconnectDelay: config.reconnectDelay ?? 5000,
            heartbeatIncoming: config.heartbeatIncoming ?? 4000,
            heartbeatOutgoing: config.heartbeatOutgoing ?? 4000,
            debug: (str: string): void => {
                if (config.debug) {
                    console.log(`${this.prefix} ${str}`);
                }
            },
        });

        this.setupEventHandlers();
    }

    public static getInstance(config: WebSocketConfig): WebSocketService {
        if (!WebSocketService.instance) {
            console.log(`DEBUG:=>  Creating new WebSocketService instance`);
            WebSocketService.instance = new WebSocketService(config);
        }
        return WebSocketService.instance;
    }

    private setupEventHandlers(): void {
        this.client.onConnect = (): void => {
            console.log(`${this.prefix} Connected to server`);
            store.dispatch(setConnectionStatus(true));
    
            // 1. Subscribe to everything needed
            this.subscribeToErrors();
            this.subscribeToMeetingCheck(); // This now sets up the listener
    
            // 2. Process any pending subscriptions (if you add this back)
            this.pendingSubscriptions.forEach((roomId) => {
                // this.doSubscribeToRoom(roomId); // You'd need to add this back if needed
            });
            this.pendingSubscriptions.clear();
    
            // 3. Send any initial messages (like meeting_check)
            console.log(`${this.prefix} Publishing meeting check`);
            this.publish("/app/meeting.check", []); // Send the request *after* subscribing
    
            // 4. Process pending messages (if you add this back)
            store.dispatch(clearPendingMessages()); // Assuming this sends queued messages if any
        };
    
        this.client.onDisconnect = (): void => {
            console.log(`${this.prefix} Disconnected from server`);
            store.dispatch(setConnectionStatus(false));
        };
    
        this.client.onStompError = (frame: any): void => { // Add frame for logging
            console.error(`${this.prefix} STOMP Error:`, frame);
            store.dispatch(setConnectionStatus(false));
            setTimeout(() => {
                console.log(`${this.prefix} Attempting to reconnect...`);
                this.connect();
            }, 5000);
        };
    }
    private subscribeToErrors(): void {
        this.subscribe(`/user/${this.userId}/queue/errors`, (message: Message): void => {
            try {
                const error = JSON.parse(message.body);
                store.dispatch(addPendingMessage(error));
            } catch (error) {
                store.dispatch(addPendingMessage({ error: 'Failed to parse error message' }));
            }
        });
    }

    private subscribeToMeetingCheck(): void {
        this.subscribe(`/user/${this.userId}/queue/meeting_check`, (message) => {
            try {
                console.log(`${this.prefix} Meeting check message:`, message);
                const chatMeetings = JSON.parse(message.body);
                console.log(`${this.prefix} Chat meetings:`, chatMeetings);
                const activeCalls = chatMeetings.map((call: CallNotification) => ({
                    roomId: call.roomId,
                    meetingStartTime: call.meetingStartTime,
                    meetingEndTime: call.meetingEndTime,
                    isActive: !call.meetingEndTime,
                    matrixServerName: call.matrixServerName,
                }));
                console.log(`${this.prefix} Active calls:`, activeCalls);
                store.dispatch(updateActiveCalls(activeCalls));
            } catch (error) {
                store.dispatch(addPendingMessage({ error: 'Failed to parse meeting check message' }));
                console.log(`${this.prefix} Error:`, error);
            }
        });
    }

    public connect(): void {
        // Only activate if not already active or connected
        if (!this.client.active) {
            console.log(`${this.prefix} Activating STOMP client...`);
            this.client.activate();
        } else {
            console.log(`${this.prefix} STOMP client already active.`);
        }
    }
    

    public disconnect(): void {
        if (this.client.connected) {
            store.dispatch(clearPendingMessages());
            this.client.deactivate();
        }
    }

    public subscribe(destination: string, callback: (message: Message) => void): void {
        const subscription = this.client.subscribe(destination, callback);
        this.subscriptions.set(destination, subscription);
    }

    private publish(destination: string, body: any): void {
        if (this.client.connected) {
            try {
                this.client.publish({
                    destination,
                    body: JSON.stringify(body)
                });
            } catch (error) {
                store.dispatch(addPendingMessage({ error: 'Failed to publish message' }));
            }
        }
    }
    public unsubscribeFromRoom(roomId: string): void {
        const destination = `/topic/room.${roomId}`;
        const subscription = this.subscriptions.get(destination);
        if (subscription) {
            subscription.unsubscribe();
            this.subscriptions.delete(destination);
        }
    }
}
