import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Infrastructure } from "./base";
import { Server, ServerOptions } from "socket.io"

export class WebsocketService extends Infrastructure {
    private connection: Record<string, Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>>
    private instance: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    
    getInstance(name?: string) {
        if(name) {
            if(!this.connection[name]) {
                throw new Error('INSTANCE_NOT_FOUND')
            }
        }
    }

    /** Create new instance / server */
    createInstance(opts: ServerOptions) {
        const connection = new Server()        
    }

    /** Connect to existing */
    addInstance() {

    }

    send(message: string) {

    }
}